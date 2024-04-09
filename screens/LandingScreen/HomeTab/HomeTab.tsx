import { View, Text, StyleSheet } from "react-native"
import CrypColors from "../../../components/common/CrypColors"
import CrypText from "../../../components/common/CrypText"
import CrypSpacing from "../../../components/common/CrypSpacing"

function HomeTab() {
  return (
    <View style={styles.container}>
      {/* <CrypText color="brandWhite">Home Tab</CrypText> */}
      <View style={styles.summary}>
        <CrypText color="brandGrey">Total Balance</CrypText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CrypColors.brandDark
  },
  summary: {
    margin: CrypSpacing.spacing10
  }
})

export default HomeTab