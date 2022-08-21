import logo from '../images/logo.png';

function Footer() {
   return (
      <footer className="w-full flex md:justify-center items-center flex-col p-4 gradient-bg-footer">
         <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
            <div className="flex flex-[0.5] justify-center items-center">
               <img src={logo} alt="Logo" className="w-32" />
            </div>
            <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5">
               <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
               <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
               <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p>
               <p className="text-white text-base text-center mx-2 cursor-pointer">Wallets</p>
            </div>
         </div>
         <div className="flex justify-center items-center flex-col mt-5">
            <p className="text-white text-sm text-center">Come Join Us</p>
            <p className="text-white text-sm text-center">info@kryptomastery.in</p>
         </div>
         <div className="w-full sm:w-[90%] h-[0.25px] bg-gray-400 mt-5" />
         <div className="w-full sm:w-[90%] flex justify-between items-center">
            <p className="text-white text-sm text-center">@kryptomastery 2022</p>
            <p className="text-white text-sm text-center">All Rights Reserved.</p>
         </div>
      </footer>
   )
}

export default Footer;