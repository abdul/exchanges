const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

module.exports = async () => {
  const tickers = await request('https://www.coinall.com/api/spot/v3/instruments/ticker');

  return tickers.map((ticker) => {
    const [base, quote] = ticker.product_id.split('-');

    return new Ticker({
      base,
      quote,
      quoteVolume: parseToFloat(ticker.quote_volume_24h),
      baseVolume: parseToFloat(ticker.base_volume_24h),
      close: parseToFloat(ticker.last),
      open: parseToFloat(ticker.open_24h),
      high: parseToFloat(ticker.high_24h),
      low: parseToFloat(ticker.low_24h),
    });
  });
};
