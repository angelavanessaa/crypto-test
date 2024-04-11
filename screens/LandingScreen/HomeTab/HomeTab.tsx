import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import CrypColors from "../../../components/common/CrypColors"
import CrypText from "../../../components/common/CrypText"
import CrypSpacing from "../../../components/common/CrypSpacing"
import TrendingCoins from "../../../components/LandingScreen/TrendingCoins"

function HomeTab() {

  const renderProfitSummary = () => {
    return (
      <View style={styles.profitSummary}>
        <View>
          <CrypText color="brandGrey" type="bodyS">
            All time
          </CrypText>
          <CrypText color="brandTeal" type="bodyL">
            +20%
          </CrypText>
        </View>
        <View>
          <CrypText color="brandGrey" type="bodyS">
            Current Month
          </CrypText> 
          <CrypText color="brandRed" type="bodyL">
            -1.5%
          </CrypText>
        </View>
     </View>
    )
  }

  return (
    <View style={styles.container}>
      <CrypText color="brandWhite" type="h1">
        Portfolio Value
      </CrypText>
      <View style={styles.summary}>
        <CrypText color="brandGrey" type="bodyL">Total Balance (USD)</CrypText>
        <CrypText color="brandWhite" type="display2">$ 8,612</CrypText>
        <View style={styles.summaryFooter}>
          {renderProfitSummary()}
          <TouchableOpacity>
            <View style={styles.primaryButton}>
              <CrypText color="brandWhite" type="bodyM">
                Trade
              </CrypText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TrendingCoins />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CrypColors.brandDark,
    padding: CrypSpacing.spacing16,
  },
  summary: {
    marginTop: CrypSpacing.spacing10,
    padding: CrypSpacing.spacing14,
    backgroundColor: CrypColors.brandNavy,
    borderRadius: CrypSpacing.spacing8
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: CrypSpacing.spacing4
  },
  primaryButton: {
    backgroundColor: CrypColors.brandTeal,
    paddingVertical: CrypSpacing.spacing8,
    paddingHorizontal: CrypSpacing.spacing20,
    borderRadius: CrypSpacing.spacing8,
  },
  profitSummary: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default HomeTab