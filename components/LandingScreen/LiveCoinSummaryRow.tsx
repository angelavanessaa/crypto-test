import { View, StyleSheet } from "react-native"
import CrypText from "../common/CrypText"
import CrypSpacing from "../common/CrypSpacing"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react";
import useLivePrice from "../../hooks/useLivePrice"
import { formatUSD } from "../../utils/CurrencyUtil"

type Props = {
  coin: {
    pair: string;
    name: string;
  };
  percentage: string;
}

const DELAY = 1000;

function LiveCoinSummaryRow(props: Props) {
  const { coin, percentage } = props;
  const navigation = useNavigation();
  const { livePrice } = useLivePrice(coin.pair.split('/').join(''));

  const [price, setPrice] = useState<string>();

  useEffect(() => {
    if (!price) setPrice(livePrice);

    const interval = setInterval(() => {
      if (livePrice) setPrice(livePrice)
    }, DELAY);

    return () => {
      clearInterval(interval);
    };
  }, [livePrice]);

  const navigateToChartScreen = () => {
    navigation.navigate('Chart', { coin });
  }

  return (
    <TouchableWithoutFeedback onPress={navigateToChartScreen}>
      <View style={styles.rowContainer}>
        {/* image here */}
        <View>
          <CrypText color="brandWhite" type="bodyXL">
            {coin.name}
          </CrypText>
          <CrypText color="brandGrey" type="bodyM">
            {coin.pair.toLocaleUpperCase()}
          </CrypText>
        </View>
        <View style={styles.price}>
          <CrypText color="brandRed" type="bodyXL">
            {Number(percentage).toFixed(2)}%
          </CrypText>
          <CrypText color="brandWhite" type="bodyM">
            {Number(price).toFixed(2)}
          </CrypText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: CrypSpacing.spacing4,
    paddingHorizontal: CrypSpacing.spacing12,
  },
  price: {
    alignItems: 'flex-end'
  }
})

export default LiveCoinSummaryRow