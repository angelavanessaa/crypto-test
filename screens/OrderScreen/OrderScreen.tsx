import { View, StyleSheet, ActivityIndicator } from "react-native"
import CrypColors from "../../components/common/CrypColors"
import CrypSpacing from "../../components/common/CrypSpacing"
import useBookTicker from "../../hooks/useBookTicker"
import { useEffect, useState } from "react";
import CrypText from "../../components/common/CrypText";
import useLivePrice from "../../hooks/useLivePrice";
import OrderInput from "../../components/OrderScreen/OrderInput";

const DELAY = 1000;

function OrderScreen({ route }) {
  const { coin } = route.params;
  const coinPair = coin.pair.split('/');

  const { livePrice } = useLivePrice(coinPair.join(''));
  const { bids, asks } = useBookTicker(coinPair.join(''));

  const [price, setPrice] = useState<string>();
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);

  useEffect(() => {
    if (!price) setPrice(livePrice);

    const interval = setInterval(() => {
      setBuyOrders(bids.slice(-5))
      setSellOrders(asks.slice(0, 5))
      if (livePrice) setPrice(livePrice)
    }, DELAY);

    return () => {
      clearInterval(interval);
    };
  }, [bids, asks, livePrice]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <CrypText color="brandWhite" type="bodyL">
          Price
        </CrypText>
        <CrypText color="brandWhite" type="bodyL">
          Quantity
        </CrypText>
      </View>
      {buyOrders.length <= 0 && <ActivityIndicator />}
      {buyOrders.sort((a, b) => b - a).map((order, index) => (
        <View key={`buy_${index}`} style={styles.rowContainer}>
          <CrypText color="brandGreen" type="bodyM">
            {order[0]}
          </CrypText>
          <CrypText color="brandWhite" type="bodyM">
            {Number(order[1]).toFixed(2)}
          </CrypText>
        </View>
      ))}
      <CrypText color="brandWhite" type="bodyL">
        {price}
      </CrypText>
      {sellOrders.length <= 0 && <ActivityIndicator />}
      {sellOrders.map((order, index) => (
        <View key={`sell_${index}`} style={styles.rowContainer}>
          <CrypText color="brandRed" type="bodyM">
            {order[0]}
          </CrypText>
          <CrypText color="brandWhite" type="bodyM">
            {Number(order[1]).toFixed(2)}
          </CrypText>
        </View>
      ))}

      <OrderInput coin={coin} />
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
  },
})

export default OrderScreen