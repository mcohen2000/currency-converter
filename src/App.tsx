import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [currencyType, setCurrencyType] = useState("USD");
  const [customCurrencyType, setCustomCurrencyType] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const currencies = [{ value: "USD", text: "US Dollar"}, { value: "EUR", text: "Euro"}, { value: "JPY", text: "Japanese Yen"}, { value: "GBP", text: "Great British Pound"},]

  return (
    <>
      <h1>Currency Converter</h1>
      <p>by <a href="">Michael Cohen</a></p>
      <div className='baseCurrencyForm'>
        <div className='formWrapper inputForm'>
          <label>Currency: { currencyType }</label>
          <select className='currencyInput' value={currencyType} onChange={(e) => {
            setCurrencyType(e.target.value);
            setCustomCurrencyType("");
          }}>
            {currencies.map((item, index) => <option value={item.value} key={index} onClick={() => setCustomCurrencyType("")}>{item.text}</option>)}
            <option value="OTHER" onClick={() => setCustomCurrencyType("")}>Other</option>
            {customCurrencyType !== "" ? <option value={customCurrencyType}>{customCurrencyType}</option>: <></>}
          </select>
          {currencyType === "OTHER" ? <form onSubmit={(e) => {
            e.preventDefault();
            setCurrencyType(customCurrencyType);
          }}>
            <input autoFocus placeholder='Currency Code' onChange={(e) => setCustomCurrencyType(e.target.value)} onBlur={(e) => setCurrencyType(e.target.value.toUpperCase())} />
            <button onClick={(e) => console.log(e)}>Submit</button>
          </form> : <></>}
          <label>Amount:</label>
          <input className='amountInput' onChange={(e) => setCurrencyAmount(Number(e.target.value))}></input>
          <p>{currencyAmount}</p>
        </div>
        <div className='formWrapper outputForm'>
          <label>Amount:</label>
          <p className='amountInput'></p>
        </div>
      </div>
    </>
  )
}

export default App
