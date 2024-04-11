import { View, StyleSheet } from "react-native"
import CrypColors from "../../components/common/CrypColors"
import CrypSpacing from "../../components/common/CrypSpacing"
import CrypText from "../../components/common/CrypText"
import { useEffect, useState } from "react";
import CandleStickChart from "../../components/LandingScreen/CandleStickChart";
import useWebSocket from "../../hooks/useWebSocket";

const DELAY = 1000;

function ChartScreen() {
  const [price, setPrice] = useState<string>();
  const { livePrice } = useWebSocket('btcusdt');

  useEffect(() => {
    if (!price) setPrice(livePrice);

    const interval = setInterval(() => {
      if (livePrice) setPrice(livePrice)
    }, DELAY);

    return () => {
      clearInterval(interval);
    };
  }, [livePrice]);

  return (
    <View style={styles.container}>
      <CrypText color="brandWhite" type="h1">
        {price}
      </CrypText>
      {/* <GestureDetector gesture={pinch}> */}
        <CandleStickChart />
      {/* </GestureDetector> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CrypColors.brandDark,
    padding: CrypSpacing.spacing16,
  },
})


export default ChartScreen