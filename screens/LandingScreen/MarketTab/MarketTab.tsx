import { View, StyleSheet, ActivityIndicator } from "react-native"
import CrypColors from "../../../components/common/CrypColors"
import CrypSpacing from "../../../components/common/CrypSpacing"
import LiveCoinSummaryRow from "../../../components/LandingScreen/LiveCoinSummaryRow"
import { useEffect, useState } from "react";

const coins = [
  {
    pair: 'btc/usdt',
    name: 'Bitcoin'
  },
  {
    pair: 'eth/usdt',
    name: 'Ethereum'
  },
  {
    pair: 'bnb/usdt',
    name: 'BNB'
  },
  {
    pair: 'ada/usdt',
    name: 'Cardano'
  },
  {
    pair: 'doge/usdt',
    name: 'Dogecoin'
  }
];

function MarketTab() {
  const [priceChanges, setPriceChanges] = useState([]);

  useEffect(() => {
    fetchPriceChange();
  }, [])

  const fetchPriceChange = () => {
    const symbols = coins.map(coin => coin.pair.split('/').join('').toLocaleUpperCase());
    const symbolsParam = encodeURIComponent(JSON.stringify(symbols));
    
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${symbolsParam}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(res => {
        setPriceChanges(res);
      })
  }

  return (
    <View style={styles.container}>
      {coins.length <= 0 && <ActivityIndicator size={'large'} />}
      {coins.map((coin, index) => (
        <LiveCoinSummaryRow
          coin={coin}
          percentage={priceChanges?.[index]?.priceChangePercent ?? '-'}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CrypColors.brandDark,
    padding: CrypSpacing.spacing16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: CrypSpacing.spacing4,
    paddingHorizontal: CrypSpacing.spacing12,
  }
})

export default MarketTab