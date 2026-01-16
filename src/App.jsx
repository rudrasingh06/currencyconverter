import { useState } from 'react'
import  InputBox  from './components/InputBox'
import useCurrencyinfo from './customhooks/useCurrencyinfo'
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyinfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    let temp = from;
    setFrom(to);
    setTo(temp);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div className="main-class-container">
      <div className="form-class">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* From Section */}
          <div className="from-container">
            <InputBox
              label="From"
              amount={amount}
              currencyOption={options}
              onAmountChange={(val) => setAmount(val)}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
            />
          </div>

          {/* Swap Button */}
          <div className="button-container">
            <button
              type="button"
              className="swap-button"
              onClick={swap}
            >
              swap
            </button>
          </div>

          {/* To Section */}
          <div className="to-container">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOption={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          {/* Convert Button */}
          <button type="submit" className="convert-button">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
