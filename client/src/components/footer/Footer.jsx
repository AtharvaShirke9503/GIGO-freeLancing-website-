import React from 'react'
import "./Footer.scss"
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
         <div className="footer-container">
           <div className="footer-brand">
             
             <span className="footer-title">GIGO</span>
           </div>
           <div className="footer-links">
             <div className="footer-column">
               <h4>ABOUT</h4>
               <a href="#">one</a>
               <a href="#">two </a>
             </div>
             <div className="footer-column">
               <h4>FOLLOW US</h4>
               <a href="#">Github</a>
               <a href="#">Discord</a>
             </div>
             <div className="footer-column">
               <h4>LEGAL</h4>
               <a href="#">Privacy Policy</a>
               <a href="#">Terms & Conditions</a>
             </div>
           </div>
         </div>
         <div className="footer-bottom">
           <p>&copy; 2025 GIGO™</p>
           <div className="footer-social">
             <FaFacebook />
             <FaInstagram />
             <FaTwitter />
             <FaGithub />
             
           </div>
         </div>
       </footer>
  )
}

export default Footer
