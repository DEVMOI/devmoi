import { useState, useEffect } from 'react';
import { Slider, Input, Card, Link } from 'rimble-ui';

import { getQuote, submitTransaction } from '../lib';

function SwaprCard({ name, symbol, decimals, error, watcher }) {
  const [donationValue, setDonationValue] = useState(0);
  const [quote, setQuote] = useState({});
  const [quoteValue, setQuoteValue] = useState(0);
  useEffect(async () => {
    const _quote = await getQuote(symbol, 1, decimals);

    setTimeout(async () => {
      if (_quote !== undefined) await setQuoteValue(await _quote.price);
    }, 500);
  }, [watcher]);
  return (
    <Card p={5} m={2} width={'100%'} maxWidth={'420px'}>
      <div className="d-flex flex-column align-items-between">
        <span className="font-weight-bold text-uppercase text-wrap">
          {name}
        </span>
        <div className="d-flex flex-row align-items-cener text-truncate">
          <Input
            type="number"
            required={true}
            placeholder="e.g. 123"
            value={donationValue}
            onChange={async (e) => {
              if (e.target.value >= 0 && e.target.value <= 999) {
                await setDonationValue(e.target.value);
                const _quote = await getQuote(symbol, e.target.value, decimals);
                await setQuote(_quote);
              }
            }}
          />
          <p className="font-weight-bold text-uppercase align-middle mt-2 ml-2 d-flex flex-row w-100">
            ({symbol})
          </p>
        </div>
      </div>

      <button
        className="w-100 btn m-0 p-0 border border-top"
        onClick={async () => {
          submitTransaction(quote);
        }}>
        Swap
      </button>
      <span className="ml-2 text-uppercase">
        {' '}
        {1} {symbol} ~ {quoteValue || 0} ETH
      </span>
      <span>{error}</span>
    </Card>
  );
}
export default SwaprCard;
