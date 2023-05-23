import React from "react";

export default function Test() {
  function handleClick() {
    setisGoingOut((preVal) => (preVal ? false : true));
  }
  var [isGoingOut, setisGoingOut] = React.useState(true);
  return (
    <div className="state">
      <h1 className="state--title">Do I feel like going out tonight?</h1>
      <div className="state--value" onClick={handleClick}>
        <h1>{isGoingOut ? "Yes" : "No"}</h1>
      </div>
    </div>
  );
}

/*var [counter, setCounter] = React.useState(0);

  function plus() {
    setCounter((preVal) => preVal + 1);
  }
  function minus() {
    setCounter((preVal) => preVal - 1);
  }

  return (
    <div className="counter">
      <button onClick={plus}>+</button> &nbsp;&nbsp;&nbsp;&nbsp;
      {counter} &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={minus}>-</button>
    </div>
  ); */
