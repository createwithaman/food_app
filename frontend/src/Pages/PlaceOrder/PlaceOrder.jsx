import React, {useContext, useState ,useEffect } from 'react';
import './PlaceOrder.css';
import {StoreContext} from '../../Context/StoreContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext (
    StoreContext
  );
  const [data, setData] = useState ({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    setData (data => ({...data, [name]: value}));
  };

  const placeOrder =async( evt) => {
    evt.preventDefault ();
    let orderItems = [];
    food_list.map (item => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push (itemInfo);
      }
    });
    let orderData = {
      address:data,
      items : orderItems,
      amount : getTotalCartAmount()+5
    }

    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const { session_url } = response.data
      window.location.replace(session_url)
    }else{
      alert("error")
    }
  };
  
  const navigate = useNavigate()
  

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    } else if(getTotalCartAmount()===0){
      navigate('/cart')
    }

  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">

      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
          />
        </div>
        <input
          required
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email Address"
        />
        <input
          type="text"
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="street"
        />
        <div className="multi-fields">
          <input
            type="text"
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="city"
          />
          <input
            type="text"
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="state"
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            placeholder="Zip code"
          />
          <input
            type="text"
            required
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>
        <input
          type="text"
          required
          placeholder="phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount ()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount () === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount () === 0 ? 0 : getTotalCartAmount () + 5}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
