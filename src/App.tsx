import { useState } from 'react'
import './App.css'

function App() {
  const [currencyType, setCurrencyType] = useState<string>("USD");
  const [customCurrencyType, setCustomCurrencyType] = useState<string>("");
  const [currencyAmount, setCurrencyAmount] = useState<number>(0);
  type Currency = {
    value: string;
    text: string;
  }
  const currencies: Currency[] = [{ value: "USD", text: "US Dollar"}, { value: "BRL", text: "Brazilian Real"}, { value: "CNY", text: "Chinese Yuan Renminbi"}, { value: "EUR", text: "Euro"}, { value: "GBP", text: "Great British Pound"}, { value: "INR", text: "Indian Rupee"}, { value: "ILS", text: "Israeli New Shekel"}, { value: "JPY", text: "Japanese Yen"}, { value: "RUB", text: "Russian Rouble"},]

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
          <input className='amountInput' onChange={(e) => {
            if (isNaN(Number(e.target.value))) {
              console.log("Not a number")
            } else {
              setCurrencyAmount(Number(e.target.value))
            }
          }}></input>
          <p>{currencyAmount}</p>
        </div>
        <div className='arrowWrapper'>
          <div className='arrow-line'></div>
          <div className='arrow-down'></div>
        </div>
      </div>
        <div className='conversionWrapper'>
          <h2>Conversions:</h2>
          <div className='conversionResults'>
            <div className='currencyConversion'></div>
          </div>
        </div>
    </>
  )
}

export default App
