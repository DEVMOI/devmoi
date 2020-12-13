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
    return quote;
  } catch (error) {
    console.log('getQuote()', error);
  }
};
/**
 *
 * @param {object} trns
 */
export async function submitTransaction(trns) {
  try {
    await web3.eth.sendTransaction(trns);
  } catch (error) {
    console.log('submitTransaction()', error);
  }
}

export function truncateAddress(address) {
  try {
    return `${address.substring(0, 6).toLowerCase()}...${address
      .substring(38, 42)
      .toLowerCase()}`;
  } catch (error) {
    console.log(`truncateAddress(): ${error}`);
  }
}
