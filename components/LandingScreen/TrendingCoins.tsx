import { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import CrypText from "../common/CrypText";
import CrypSpacing from "../common/CrypSpacing";
import { ScrollView } from "react-native-gesture-handler";

function TrendingCoins() {
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    fetch(`https://api.coingecko.com/api/v3/search/trending`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(res => {
        setTrendingCoins(res.coins);
      })
  }

  if (trendingCoins.length <= 0) return (
    <View style={styles.loadWrapper}>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CrypText color="brandWhite" type="h2">Trending Coins</CrypText>
      {trendingCoins.map(coin => {
        const percentage = coin.item.data.price_change_percentage_24h.usd.toFixed(2)
        return (
          <View style={styles.coinRow}>
            <View style={styles.image}>
              <Image source={{ uri: coin.item.thumb }} style={styles.imageThumb} />
              <CrypText color="brandWhite" type="bodyL">{coin.item.name}</CrypText>
            </View>
            <View style={styles.price}>
              <CrypText color="brandWhite" type="bodyL">
                {parseFloat(coin.item.data.price).toFixed(2)}
              </CrypText>
              <CrypText color={percentage < 0 ? "brandRed" : "brandGreen"} type="bodyL">
                {percentage}%
              </CrypText>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: CrypSpacing.spacing10
  },
  imageThumb: {
    width: 20,
    height: 20,
    marginRight: CrypSpacing.spacing8
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: CrypSpacing.spacing8
  },
  image: {
    flexDirection: 'row',
  },
  price: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadWrapper: {
    height: 150,
    justifyContent: 'center'
  }
})

export default TrendingCoins;