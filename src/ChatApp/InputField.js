function InputField({ dispatch }) {
    

    return (
      <div>
          <div>InputField</div>
          <button className='make-call' onClick={() => dispatch({ type: "CALL", payload: "John" })}>Make Call As John</button>
          <button className='make-call' onClick={() => dispatch({ type: "CALL", payload: "Emma" })}>Make Call As Emma</button>
      </div>
    )
  }
  
  export default InputField