import { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      if (response.data.success) {
        navigate("/https://frontenddeliveryapp.netlify.app/myOrders");
      } else {
        navigate("https://frontenddeliveryapp.netlify.app/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      
      navigate("https://frontenddeliveryapp.netlify.app/"); // Navigate to home page in case of error
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
