import React from 'react';
import {  Segment } from 'semantic-ui-react';
import './Render.css';

const Coin = ({
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  return (
      <div className='coin-container'>
        <div className='coin-row'>
          <div className='coin'>
            <img src={image} alt='crypto' />
            <p className='coin-symbol'>{symbol}</p>
          </div>
          <div className='coin-data'>
            <p className='coin-price'>${price}</p>
            <p className='coin-volume'>${volume.toLocaleString()}</p>

            {priceChange < 0 ? (
              <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
            ) : (
              <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>
            )}

            <div className='coin-marketcap'>
              Market Cap: ${marketcap.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Coin;
