/**
 *
 * @param {sting} buycoin Coin being bought
 * @param {integer} value How Many Coins Bought
 * @param {integer} dec Number of Decimals Coin Uses
 */
export const getQuote = async (buycoin, value, dec) => {
  try {
    const response = await fetch(
      `https://api.0x.org/swap/v1/quote?buyToken=${buycoin}&sellToken=ETH&buyAmount=${
        value * Math.pow(10, dec)
      }`
    );
    let quote = await response.json();
    // console.log(quote)
    return quote;
  } catch (error) {
    // console.log(error);
  }
};

export async function submitTransaction(trns) {
  await web3.eth.sendTransaction(trns);
}
