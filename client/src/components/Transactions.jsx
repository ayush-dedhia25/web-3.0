import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionsContext';
import dummyData from '../utils/dummyData';
import shortenAddress from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch';

function Transactions() {
   const { currentAccount } = useContext(TransactionContext);
   
   return (
      <section className="w-full flex justify-center items-center 2xl:px-20 gradient-bg-transactions">
         <div className="flex flex-col md:p-12 py-12 px-4">
            {currentAccount ? (
               <h3 className="text-white text-3xl text-center my-2">Lastest Transactions</h3>
            ) : (
               <h3 className="text-white text-3xl text-center my-2">
                  Connect your account to see the latest transactions
               </h3>
            )}
            <div className="flex flex-wrap justify-center items-center mt-10">
               {dummyData.reverse().map((transaction, index) => (
                  <TransactionCard key={index} {...transaction} currentAccount={currentAccount} />
               ))}
            </div>
         </div>
      </section>
   )
}

function TransactionCard({ id, addressFrom, addressTo, amount, currentAccount, keyword, message, timestamp, url }) {
   const gifUrl = useFetch({ keyword });
   
   return (
      <div className="flex flex-1 flex-col p-3 m-4 rounded-md hover:shadow-2xl bg-[#181918] 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px]">
         <div className="flex flex-col items-center w-full mt-3">
            <div className="w-full mb-6 p-2">
               <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener norefferrer">
                  <p className="text-white text-base">From: { currentAccount ? shortenAddress(currentAccount) : '0x38fe39f2...k30rk10fkc' }</p>
               </a>
               <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener norefferrer">
                  <p className="text-white text-base">To: { currentAccount ? shortenAddress(currentAccount) : '0x38fe39f2...k30rk10fkc' }</p>
               </a>
               <p className="text-white text-base">Amount: { amount } ETH</p>
               {message && (
                  <>
                     <br />
                     <p className="text-white text-base">Message: { message }</p>
                  </>
               )}
            </div>
            <img src={gifUrl || url} alt="gif" className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover" />
            <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
               <p className="text-bold text-[#37c7da]">{ timestamp }</p>
            </div>
         </div>
      </div>
   );
}

export default Transactions;