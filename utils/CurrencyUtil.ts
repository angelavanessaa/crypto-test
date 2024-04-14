export const formatUSD = (priceInUSD: string) => {
  const formattedPrice = Number(priceInUSD).toFixed(2);

  return `$${formattedPrice}`;
};
