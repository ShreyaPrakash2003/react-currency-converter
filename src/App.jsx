import { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/usecurrencyinfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-no-repeat animate-fade-in"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2024/04/29/11/20/moneybag-8727680_1280.jpg')`,
      }}
    >
      <div className="w-full max-w-md mx-auto rounded-xl p-6 backdrop-blur-md bg-white/30 shadow-2xl transform transition duration-700 ease-in-out hover:scale-105">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-4 animate-slide-up">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(value) => setAmount(value)}
            />
          </div>

          <div className="relative w-full flex justify-center my-4 ">
            <button
              type="button"
              className="border-2 border-white bg-blue-600 text-white px-4 py-1 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
              onClick={swap}
            >
              ⬆️ Swap ⬇️
            </button>
          </div>

          <div className="w-full mb-4 animate-slide-up">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold shadow-md transition duration-300"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
