import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollars, setDollars] = useState(0);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChange = (event) => setDollars(event.target.value);
  const onChangeSelect = (event) => setIndex(event.target.value);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? null : (
        <form>
          <input
            value={dollars}
            onChange={onChange}
            type="number"
            placeholder="Dollars"
          ></input>
        </form>
      )}
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={onChangeSelect}>
            <option value={-1}>Please select coin</option>
            {coins.map((coin, index) => (
              <option value={index}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          {index === -1 ? null : (
            <h2>
              You can buy {dollars / coins[index].quotes.USD.price}{" "}
              {coins[index].name} for ${dollars} USD
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
