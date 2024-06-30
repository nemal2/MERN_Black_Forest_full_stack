import React, { useState } from 'react';

const Pay = () => {
  const itemName = "Team Japan";
  const itemPrice = 500;
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(itemPrice);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setFinalAmount(finalAmount - itemPrice);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
    setFinalAmount(finalAmount + itemPrice);
  };

  const checkout = async () => {
    try {
      const res = await fetch("http://localhost:8800/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          items: [
            {
              id: 1,
              quantity: quantity,
              price: itemPrice,
              name: itemName
            },
          ]
        })
      });
      const data = await res.json();
      window.location = data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Pay</h1>
      <div>
        <button onClick={decrement}>-</button>
        <span>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>
      <div>
        <p>Final Amount: {finalAmount}</p>
      </div>
      <div className="but">
        {/* <button onClick={checkout}>Click</button> */}
      </div>
    </div>
  );
};

export default Pay;
