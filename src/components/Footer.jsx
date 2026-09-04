import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiYoutube, FiMail } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-[#1b1a1a] text-[#D9D8D7] border-t border-[#333] py-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between gap-12">

        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-sm mb-5 tracking-wide">Company Overview</h2>
          <nav className="flex flex-col gap-2.5">
            <Link to="/info/about-us" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">About Us</Link>
            <Link to="/info/our-values" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Our Values</Link>
            <Link to="/info/privacy-notice" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Privacy Notice</Link>
            <Link to="/info/cookie-policy" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Cookie Policy</Link>
            <Link to="/info/terms-and-conditions" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Terms & conditions</Link>
            <Link to="/info/corporate-information" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Corporate Information</Link>
            <Link to="/info/distributor-queries" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Distributor Queries</Link>
            <Link to="/info/grievance-redressal" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Grievance Redressal</Link>
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-sm mb-5 tracking-wide">Quick Links</h2>
          <nav className="flex flex-col gap-2.5">
            <Link to="/info/knowledge" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Knowledge</Link>
            <Link to="/info/faqs" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">FAQs</Link>
            <Link to="/info/shipping-policy" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Shipping Policy</Link>
            <Link to="/info/return-refund-policy" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Return & refund policy</Link>
            <Link to="/info/payment-policy" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Payment Policy</Link>
            <Link to="/info/track-order" className="text-[#D9D8D7] text-sm hover:text-white transition-colors duration-200 leading-relaxed">Track order</Link>
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-sm mb-5 tracking-wide">Contact Us</h2>
          <div className="text-[#D9D8D7] text-sm leading-relaxed">
            <p className="my-1">Need help fast?</p>
            
            <a href="tel:+917412092487" className="text-white font-semibold text-sm block my-1 hover:underline">
              +91 7412-092487
            </a>
            
            <p className="text-[#999] text-xs my-1">This is AI WhatsApp number. Kindly DM.</p>
            <p className="text-white font-semibold my-1.5">OR</p>
            
            <p className="my-1">
              Fill out <Link to="/contact-form" className="text-white font-medium underline underline-offset-2 hover:text-[#D9D8D7]">our form</Link>
            </p>
            
            <p className="my-1">or email <a href="mailto:help@beminimalist.co" className="text-white font-medium underline underline-offset-2 hover:text-[#D9D8D7]">help@beminimalist.co</a></p>
            <p className="mt-2 my-1">For gifting inquiries, write to us at <a href="mailto:gifting@beminimalist.co" className="text-white font-medium underline underline-offset-2 hover:text-[#D9D8D7]">gifting@beminimalist.co</a></p>

            <div className="flex gap-6 mt-4">
              <a href="mailto:help@beminimalist.co" className="text-[#D9D8D7] text-xl hover:text-white transition-colors duration-200 flex items-center justify-center">
                <FiMail />
              </a>
              <a href="https://www.facebook.com/minimalistinc" target="_blank" rel="noopener noreferrer" className="text-[#D9D8D7] text-xl hover:text-white transition-colors duration-200 flex items-center justify-center">
                <FiFacebook />
              </a>
              <a href="https://www.instagram.com/beminimalist__/" target="_blank" rel="noopener noreferrer" className="text-[#D9D8D7] text-xl hover:text-white transition-colors duration-200 flex items-center justify-center">
                <FiInstagram />
              </a>
              <a href="https://www.youtube.com/@beminimalist" target="_blank" rel="noopener noreferrer" className="text-[#D9D8D7] text-xl hover:text-white transition-colors duration-200 flex items-center justify-center">
                <FiYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 px-8 border-t border-[#333] flex flex-col items-center gap-4">
        <p className="text-[#999] text-xs">Copyright © 2026 Minimalist.</p>
      </div>
    </footer>
  );
}

export default Footer;