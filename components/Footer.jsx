import Link from "next/link";

const Footer = () => {
    const Year = new Date;
    const yearGotten = Year.getFullYear();
  return (
    <>
      <footer className="w-screen h-auto py-6 md:py-7 bg-[#1955BE] text-white flex flex-row items-center justify-between px-4 mt-5">
          <div className="text-xs">DeanPay <span className="font-light">&copy;{ yearGotten }</span></div>

          <h2 className="text-xs">Built by <a href="http://twitter.com/_realao" className="text-orange-200">Ayodeji</a></h2>
      </footer>
    </>
  );
};

export default Footer;