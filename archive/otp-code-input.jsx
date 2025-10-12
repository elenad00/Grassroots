import styles from "../css/login.module.css";
import { useRef, useState } from 'react';

export default function OTPInput ({setCompleteCode}){
  // init the reference for the error message
  const [errorRaised, setErrorRaised] = useState(false)
  // Refs to control each cell - begins as an array of null values
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Set the code string that will be populated
  let code = [false, false, false, false, false, false];

  function checkCode(){
    // iterate through the array looking for false values
    if (code.filter((value) => !value).length){
      // if the filter has a length, then there are still false values
      return false
    } else{
      // otherwise, parse the code and send to the api
      const arrToStr = code.join('');
      setCompleteCode(arrToStr)
    }
  }

  // When cell has an action, handle it and move cell accordingly
  function handleInput(e, i){
    if (e.keyCode){
      // if the backspace has been called delete the value from the code list
      if (e.keyCode == 8){
        code[i] = false;
        if (!e.target.value && i>0) {
          // if there is no target value and the user isn't on the first cell, go back a cell
          inputRefs[i-1].current.focus()
        }
      }
    } else if (e.target.value){
      // handle a new value against the number regex
      if (/[0-9]/.test(e.target.value)){
        inputRefs[i].current.className = styles.input;
        setErrorRaised(false)
        // if the value passes, add it to the code array
        code[i] = e.target.value;
        // check to see if the code is complete
        let complete = checkCode();
        // otherwise go forward a cell
        if(!complete && i<5){
          inputRefs[i+1].current.select();
        }
      } else{
        // if the input is not a number, change its background
        inputRefs[i].current.className = styles.badInput
        setErrorRaised(true)
      }
    } else {
      // handle residual null values
      return
    }
  }
  // Set the behaviour for if the cell is focused on
  function handleFocus(e) {e.target.select()}

  return (
    // create a container that holds 6 cells for the code digits
    <>
      <div className={`${styles.codeInput}`}>
        {[0,1,2,3,4,5].map((i) => (
          <input
            className={styles.input}
            key={i}
            type="string"
            maxLength={1}
            ref={inputRefs[i]}
            autoFocus={i === 0}
            onFocus={handleFocus}
            onKeyDown={(e) => handleInput(e, i)}
            onChange={(e) => handleInput(e, i)}
          />
        ))}
      </div>
      <p 
        className={`${styles.error} ${errorRaised ? styles.erroractive : ''}`}
      >
        please ensure you enter only numbers
      </p>
    </>
  );
}