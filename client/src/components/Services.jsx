import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

function Services() {
   return (
      <section className="w-full flex flex-col md:flex-row justify-center items-center gradient-bg-services">
         <div className="flex mf:flex-row flex-col justify-between items-center md:p-20 py-12 px-4">
            <div className="flex flex-1 flex-col justify-start items-start">
               <h1 className="text-white text-3xl md:text-5xl py-2 text-gradient">
                  Services that we <br />
                  continue to improve.
               </h1>
            </div>
         </div>
         <div className="flex flex-1 flex-col justify-start items-center">
            <ServiceCard
               color="bg-[#2952e3]"
               title="Security Guaranteed"
               subtitle="Security is guaranteed. We always maintain privacy and maintaining the quality of our product."
               icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            />
            <ServiceCard
               color="bg-[#8945f8]"
               title="Best exchange rates."
               subtitle="Security is guaranteed. We always maintain privacy and maintaining the quality of our product."
               icon={<BiSearchAlt fontSize={21} className="text-white" />}
            />
            <ServiceCard
               color="bg-[#f84550]"
               title="Fastest Transactions"
               subtitle="Security is guaranteed. We always maintain privacy and maintaining the quality of our product."
               icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            />
         </div>
      </section>
   )
}

function ServiceCard({ title, subtitle, icon, color }) {
   return (
      <div className="flex flex-row justify-start items-center white-glassmorphism m-2 p-3 cursor-pointer hover:shadow-xl">
         <div className={`w-10 h-10 ${color} rounded-full flex justify-center items-center`}>
            { icon }
         </div>
         <div className="flex flex-1 flex-col ml-5">
            <h3 className="text-white mt-2 text-lg">{ title }</h3>
            <p className="text-white mt-2 text-sm md:w-9/12">{ subtitle }</p>
         </div>
      </div>
   );
}

export default Services;