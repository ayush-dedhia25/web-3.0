import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../utils/constants';

export const TransactionContext = createContext();

function getEthereumContract() {
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const transactionContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
   return transactionContract;
}

function TransactionProvider({ children }) {
   const [currentAccount, setCurrentAccount] = useState();
   const [transactions, setTransactions] = useState([]);
   const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
   const [isLoading, setIsLoading] = useState(false);
   const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
   
   const getAllTransactions = async () => {
      try {
         if (!window.ethereum) {
            alert('Please install MetaMask');
            return;
         }
         const transactionContract = getEthereumContract();
         const availableTransactions = await transactionContract.getAllTransactions();
         const structuredTransactions = availableTransactions.map((transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / (10 ** 18),
         }));
         setTransactions(structuredTransactions);
      } catch (err) {
         console.log(err);
         throw new Error('No Ethereum Object');
      }
   };
   
   const handleChange = (e, name) => {
      setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
   };
   
   const checkIfWalletConnected = async () => {
      try {
         if (!window.ethereum) {
            alert('Please install MetaMask');
            return;
         }
         const accounts = await window.ethereum.request({ method: 'eth_accounts' });
         if (accounts.length) {
            setCurrentAccount(accounts[0]);
            getAllTransactions();
         } else {
            console.log('No Accounts Found!');
         }
      } catch (err) {
         console.log(err);
         throw new Error('No Ethereum Object');
      }
   };
   
   const connectWallet = async () => {
      try {
         if (!window.ethereum) {
            alert('Please install MetaMask');
            return;
         }
         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
         setCurrentAccount(accounts[0]);
      } catch (err) {
         console.log(err);
         throw new Error('No Ethereum Object');
      }
   };
   
   const sendTransaction = async () => {
      try {
         if (!window.ethereum) {
            alert('Please install MetaMask');
            return;
         }
         
         const { addressTo, amount, keyword, message } = formData;
         const transactionContract = getEthereumContract();
         const parsedAmount = ethers.utils.parseEther(amount);
         
         await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
               {
                  from: currentAccount,
                  to: addressTo,
                  gas: '0x5208', // 21000 GWEI
                  value: parsedAmount._hex,
               }
            ]
         });
         
         const txnHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
         setIsLoading(true);
         console.log(`Loading - ${txnHash.hash}`);
         await txnHash.wait();
         
         setIsLoading(false);
         console.log(`Success - ${txnHash.hash}`);
         
         const transactionsCount = await transactionContract.getTransactionCount();
         setTransactionCount(transactionsCount.toNumber());
         window.reload();
      } catch (err) {
         console.log(err);
         throw new Error('No Ethereum Object');
      }
   };
   
   const checkIfTransactionsExists = async () => {
      try {
         const transactionContract = getEthereumContract();
         const transactionsCount = await transactionContract.getTransactionCount();
         window.localStorage.setItem('transactionsCount', transactionsCount);
      } catch (err) {
         console.log(err);
         throw new Error('No Ethereum Object');
      }
   };
   
   useEffect(() => {
      checkIfWalletConnected();
      checkIfTransactionsExists();
   }, []);
   
   const state = {
      connectWallet,
      currentAccount,
      formData,
      setFormData,
      handleChange,
      sendTransaction,
      transactions,
      isLoading
   };
   
   return (
      <TransactionContext.Provider value={state}>
         { children }
      </TransactionContext.Provider>
   );
}

export default TransactionProvider;