import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const today = "2024-04-30"; // set the latest stable version

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${today}/v1/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[currency]);
        console.log(data[currency]);
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
