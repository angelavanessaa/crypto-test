import { View, StyleSheet, Dimensions } from "react-native"
import CrypColors from "../../components/common/CrypColors"
import CrypSpacing from "../../components/common/CrypSpacing"
import CrypText from "../../components/common/CrypText"
import { useEffect, useState } from "react";
import CandleStickChart from "../../components/LandingScreen/CandleStickChart";
import useWebSocket from "../../hooks/useLivePrice";
import { formatUSD } from "../../utils/CurrencyUtil";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const DELAY = 1000;
export const { width } = Dimensions.get("window");

function ChartScreen({ route }) {
  const { coin } = route.params;
  const navigation = useNavigation();

  const [price, setPrice] = useState<string>();
  const { livePrice } = useWebSocket(coin.pair.split('/').join(''));

  useEffect(() => {
    if (!price) setPrice(livePrice);

    const interval = setInterval(() => {
      if (livePrice) setPrice(livePrice)
    }, DELAY);

    return () => {
      clearInterval(interval);
    };
  }, [livePrice]);

  const navigateToOrder = (type: 'BUY' | 'SELL') => () => {
    navigation.navigate('Order', { coin, type });
  }

  return (
    <View style={styles.container}>
      <CrypText color="brandWhite" type="labelM">
        {coin.name}
      </CrypText>
      <CrypText color="brandWhite" type="h1">
        {formatUSD(price)}
      </CrypText>
      <CandleStickChart />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={navigateToOrder('BUY')}>
          <View style={[styles.button, styles.primaryButton]}>
            <CrypText color="brandWhite" type="bodyL">
              Buy
            </CrypText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToOrder('SELL')}>
          <View style={[styles.button, styles.sellButton]}>
            <CrypText color="brandWhite" type="bodyL">
              Sell
            </CrypText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CrypColors.brandDark,
    padding: CrypSpacing.spacing16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: CrypSpacing.spacing16,
    paddingHorizontal: CrypSpacing.spacing16,
    backgroundColor: CrypColors.brandDark,
  },
  button: {
    paddingVertical: CrypSpacing.spacing14,
    paddingHorizontal: CrypSpacing.spacing20,
    borderRadius: CrypSpacing.spacing8,
    width: width / 2 - 20,
    alignItems: 'center',
    marginTop: CrypSpacing.spacing16,
  },
  primaryButton: {
    backgroundColor: CrypColors.brandTeal,
  },
  sellButton: {
    backgroundColor: CrypColors.brandRed,
  }
})


export default ChartScreen