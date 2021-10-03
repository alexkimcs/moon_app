import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Coins.css';
import Coins from './RenderCoins';
import {  Segment } from 'semantic-ui-react';

function GetCrypto() {
  const [coins, setCoins] = useState([]);


  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);


  const getCoins = coins.filter(coin =>
    coin.name.toLowerCase()
  );

  return (
      <div className='coin-app'>
        { getCoins.map(coin => {
          return (
            <Coins
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
  );
}

export default GetCrypto;
