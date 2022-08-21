import { useContext, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { TransactionContext } from '../context/TransactionsContext';
import Loader from './Loader';
import shortenAddress from '../utils/shortenAddress';

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

function Welcome() {
   const [isLoading, setIsLoading] = useState(false);
   const {
      connectWallet,
      currentAccount,
      formData,
      setFormData,
      handleChange,
      sendTransaction,
   } = useContext(TransactionContext);
   
   const handleSubmit = (e, name) => {
      e.preventDefault();
      const { addressTo, amount, keyword, message } = formData;
      if (!addressTo || !amount || !keyword || !message) return;
      sendTransaction();
   };
   
   return (
      <div className="w-full flex justify-center items-center">
         <div className="flex mf:flex-row flex-col justify-between items-start md:p-20 px-4 py-12">
            <div className="flex flex-1 flex-col justify-start mf:mr-10">
               <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                  Send Crypto <br /> Accross The World
               </h1>
               <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                  Explore the crypto world. Buy and sell crypto currencies with ease on Krypto.
               </p>
               {!currentAccount && (
                  <button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                     <p className="text-white text-base font-semibold">Connect Wallet</p>
                  </button>
               )}
               <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                  <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
                  <div className={`${commonStyles}`}>Security</div>
                  <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
                  <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
                  <div className={`${commonStyles}`}>Low Fees</div>
                  <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
               </div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
               <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                  <div className="flex flex-col justify-between w-full h-full">
                     <div className="flex justify-between items-start">
                        <div className="w-10 h-10 flex justify-center items-center rounded-full border-2 border-white">
                           <SiEthereum fontSize={21} color="#fff" />
                        </div>
                        <BsInfoCircle fontSize={17} color="#fff" />
                     </div>
                     <div>
                        <p className="text-white font-light text-sm">{ currentAccount ? shortenAddress(currentAccount) : '0x38fe39f2...k30rk10fkc' }</p>
                        <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
                     </div>
                  </div>
               </div>
               <div className="p-5 sm:w-96 w-full flex justify-start items-center flex-col blue-glassmorphism">
                  <Input type="text" name="addressTo" placeholder="Address To" handleChange={handleChange} />
                  <Input type="number" name="amount" placeholder="Amount (ETH)" handleChange={handleChange} />
                  <Input type="text" name="keyword" placeholder="Keyword (Gif)" handleChange={handleChange} />
                  <Input type="text" name="message" placeholder="Enter Message" handleChange={handleChange} />
                  <div className="h-[1px] w-full bg-gray-400 my-2" />
                  {isLoading ? <Loader /> : (
                     <button type="button" className="text-white w-full mt-2 p-2 border-[1px] border-[#3d4f7c] rounded-full cursor-pointer" onClick={handleSubmit}>
                        Send Now
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

function Input({ name, type, placeholder, value, handleChange }) {
   return (
      <input
         type={type}
         name={name}
         placeholder={placeholder}
         value={value}
         onChange={(e) => handleChange(e, name)}
         className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
         step="0.0001"
      />
   );
}

export default Welcome;