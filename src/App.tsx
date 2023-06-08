import { useEffect, useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [currencyType, setCurrencyType] = useState<string>("USD");
  // const [customCurrencyType, setCustomCurrencyType] = useState<string>("");
  const [currencyAmount, setCurrencyAmount] = useState<number>(0);
  interface ExchangeRate {
    [key: string]: number;
  };
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate>({});
  interface Currency {
    value: string;
    text: string;
  };
  const [currencies, setCurrencies] = useState<Currency[]>([{ value: "USD", text: "US Dollar" }]);
  function fetchCurrencies() {
    fetch(`http://api.exchangeratesapi.io/v1/symbols?access_key=${import.meta.env.VITE_API_KEY}`)
      .then(res => { if (res.status === 200) { return res.json() } })
      .then(data => {
        setCurrencies(Object.keys(data.symbols).map((key) => ({value: key, text: data.symbols[`${key}`]})))
      });
  };
  function fetchRates() {
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${import.meta.env.VITE_API_KEY}`)
      .then(res => { if (res.status === 200) { return res.json() } })
      .then(data => setExchangeRates(data.rates));
  };
  useEffect(() => {
    fetchCurrencies();
    fetchRates();
  }, []);

  return (
    <>
      <h1>Currency Converter</h1>
      <p>by <a href="">Michael Cohen</a></p>
      <div className='baseCurrencyForm'>
        <div className='formWrapper inputForm'>
          <label>Currency: { currencyType }</label>
          <select className='currencyInput' value={currencyType} onChange={(e) => {
            setCurrencyType(e.target.value);
            // setCustomCurrencyType("");
          }}>
            {currencies.map((item, index) => <option
              value={item.value}
              key={index}
              // onClick={() => setCustomCurrencyType("")}
            >{item.text}</option>)}
            {/* <option value="OTHER" onClick={() => setCustomCurrencyType("")}>Other</option> */}
            {/* {customCurrencyType !== "" ? <option value={customCurrencyType}>{customCurrencyType}</option>: <></>} */}
          </select>
          {/* {currencyType === "OTHER" ? <form onSubmit={(e) => {
            e.preventDefault();
            setCurrencyType(customCurrencyType);
          }}>
            <input autoFocus placeholder='Currency Code' onChange={(e) => setCustomCurrencyType(e.target.value)} onBlur={(e) => setCurrencyType(e.target.value.toUpperCase())} />
            <button onClick={(e) => console.log(e)}>Submit</button>
          </form> : <></>} */}
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
          {Object.entries(exchangeRates).map(([key, value]) => (
            <div className='currencyConversion' key={key}>
              <p><span>{key}</span> - {Math.round(((value / exchangeRates[`${currencyType}`]) * currencyAmount + Number.EPSILON) * 100) / 100}</p>
            </div>))}
          </div>
        </div>
    </>
  )
}

export default App
