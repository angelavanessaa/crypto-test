import { View, StyleSheet } from "react-native"
import CrypColors from "../../../components/common/CrypColors"
import CrypSpacing from "../../../components/common/CrypSpacing"
import LiveCoinSummaryRow from "../../../components/LandingScreen/LiveCoinSummaryRow"

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
  const renderSearchBar = () => {
    return <></>
  }

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {coins.map(coin => (
        <LiveCoinSummaryRow coin={coin} />
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