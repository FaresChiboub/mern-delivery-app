import "./Footer.css";
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo-img" src={assets.logo} alt="" />
          <p className="lorem">
          At FastFare, we specialize in providing fast, reliable, and efficient delivery solutions tailored to meet the diverse needs of our customers. Whether you're a small business looking to streamline your logistics or an individual seeking convenient parcel delivery, we've got you covered.

Our extensive network of couriers and advanced tracking systems ensures that your packages are handled with the utmost care and delivered promptly to their destination. 
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@FastFare.com</li>
          </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright 2024 &copy; FastFare.com - All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
