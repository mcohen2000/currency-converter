import { useEffect, useState } from 'react'
import CurrencyFlag from 'react-currency-flags';
import './App.css'

const App: React.FC = () => {
  const [currencyType, setCurrencyType] = useState<string>("");
  const [outputCurrencyType, setOutputCurrencyType] = useState<string>("");
  const [currencyAmount, setCurrencyAmount] = useState<number>(0);
  interface ExchangeRate {
    [key: string]: number;
  };
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate>({});
  interface Currency {
    value: string;
    text: string;
  };
  const [currencies, setCurrencies] = useState<Currency[]>([{value: "", text: ""}]);
  function fetchCurrencies() {
    // fetch(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_ER_COM_API_KEY}/codes`)
    //   .then(res => { if (res.status === 200) { return res.json() } })
    //   .then(data => {
    //     setCurrencies(data.supported_codes.map((item: String[]) => ({value: item[0], text: item[1]})))
    //   });
    fetch(`/.netlify/functions/fetchCurrencies`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCurrencies(data.response);
      });
  };
  function fetchRates() {
    // fetch(`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_ER_COM_API_KEY}/latest/USD`)
    //   .then(res => { if (res.status === 200) { return res.json() } })
    //   .then(data => setExchangeRates(data.conversion_rates));
    fetch(`/.netlify/functions/fetchRates`)
      .then(res => res.json())
      .then(data => setExchangeRates(data.response));
  };
  useEffect(() => {
    fetchCurrencies();
    fetchRates();
  }, []);

  return (
    <div className='appWrapper'>
      <h1>Currency Converter</h1>
      <p>by <a href="https://github.com/mcohen2000" target="_blank" rel="noreferrer noopener">Michael Cohen</a></p>
      {/* <CurrencyFlag currency="USD" size="lg" /> */}
      <div className='baseCurrencyForm'>
        <div className='formWrapper inputForm'>
          <label>Currency: <span className='flagWrapper'><CurrencyFlag currency={currencyType} size="lg" /></span>{ currencyType }</label>
          <select className='currencyInput' value={currencyType} onChange={(e) => setCurrencyType(e.target.value)}>
            <option disabled value="">Select a Currency</option>
            {currencies[0].value !== "" ? currencies.map((item, index) => <option
              value={item.value}
              key={index}
            >{item.text}</option>):<></>}
          </select>
          <label>Amount:</label>
          <input className='amountInput' onChange={(e) => {
            if (isNaN(Number(e.target.value))) {
              console.log("Not a number")
            } else {
              setCurrencyAmount(Number(e.target.value))
            }
          }}></input>
        </div>
      </div>
      <div className='arrowWrapper'>
        <div className='arrow-line'></div>
        <div className='arrow-down'></div>
      </div>
      <div className='targetOutputWrapper'>
        <h2>Target Currency:</h2>
        <select value={outputCurrencyType} onChange={(e) => setOutputCurrencyType(e.target.value)}>
          <option disabled value="">Select a Currency</option>
          {currencies[0].value !== "" ? currencies.map((item, index) => <option
            value={item.value}
            key={index}
          >{item.text}</option>):<></>}
        </select>
        { currencyType !== "" && currencyAmount > 0 && outputCurrencyType !== ""? <h3><span className='flagWrapper'><CurrencyFlag currency={outputCurrencyType} size="lg" /></span>{ currencies[currencies.map((item) => item.value).indexOf(outputCurrencyType)].text + " (" + outputCurrencyType + ") - " + Math.round(((exchangeRates[outputCurrencyType] / exchangeRates[`${currencyType}`]) * currencyAmount + Number.EPSILON) * 100) / 100}</h3> : <></>}
        

      </div>
      {currencies[0].value !== "" && currencyAmount > 0 && outputCurrencyType !== "" ? (
        <div className='conversionWrapper'>
        <h2>Other Currencies:</h2>
        <div className='conversionResults'>
          {Object.entries(exchangeRates).map(([key, value]) => (
            <div className='currencyConversion' key={key}>
              <p><span className='flagWrapper'><CurrencyFlag currency={key} size="lg" /></span><span>{ currencies[currencies.map((item) => item.value).indexOf(key)].text} ({key})&nbsp;</span> - {Math.round(((value / exchangeRates[`${currencyType}`]) * currencyAmount + Number.EPSILON) * 100) / 100}</p>
            </div>))}
        </div>
      </div>) : <></>}
      
    </div>
  )
}

export default App
