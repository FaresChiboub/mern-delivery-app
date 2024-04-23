import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/storeContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateInputs = () => {
    const phoneRegex = /^[0-9]+$/;
    const zipCodeRegex = /^[0-9]{4,}$/
    const nameRegex = /^[A-Za-z]+$/;

    if (data.firstName.length < 3 || !nameRegex.test(data.firstName)) {
      alert(
        "Please enter a valid first name (minimum 3 letters, alphabetic characters only)"
      );
      return false;
    }

    if (data.lastName.length < 2 || !nameRegex.test(data.lastName)) {
      alert(
        "Please enter a valid last name (minimum 2 letters, alphabetic characters only)"
      );
      return false;
    }

    if (!phoneRegex.test(data.phone)) {
      alert("Please enter a valid phone number (numeric characters only)");
      return false;
    }

    if (!zipCodeRegex.test(data.zipcode)) {
      alert("Please enter a valid zip code (minimum 4 numeric characters)");
      return false;
    }

    return true;
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 3,
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={onChangeHandler}
              value={data.firstName}
            />
            <input
              required
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={onChangeHandler}
              value={data.lastName}
            />
          </div>
          <input
            required
            name="email"
            type="email"
            placeholder="Email address"
            onChange={onChangeHandler}
            value={data.email}
          />
          <input
            required
            name="street"
            type="text"
            placeholder="Street"
            onChange={onChangeHandler}
            value={data.street}
          />
          <div className="multi-fields">
            <input
              required
              name="city"
              type="text"
              placeholder="City"
              onChange={onChangeHandler}
              value={data.city}
            />
            <input
              required
              name="state"
              type="text"
              placeholder="State"
              onChange={onChangeHandler}
              value={data.state}
            />
          </div>
          <div className="multi-fields">
            <input
              required
              name="zipcode"
              type="text"
              placeholder="Zip code"
              onChange={onChangeHandler}
              value={data.zipcode}
            />
            <input
              required
              name="country"
              type="text"
              placeholder="Country"
              onChange={onChangeHandler}
              value={data.country}
            />
          </div>
          <input
            required
            name="phone"
            type="tel"
            placeholder="Phone"
            onChange={onChangeHandler}
            value={data.phone}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <br />
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 3}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 3}
              </b>
            </div>
            <br />
            <button type="submit">Proceed To Payment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
