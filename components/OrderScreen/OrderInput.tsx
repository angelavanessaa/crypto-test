import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native"
import CrypText from "../common/CrypText"
import CrypColors from "../common/CrypColors"
import CrypSpacing from "../common/CrypSpacing"
import { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import Toast from 'react-native-toast-message';

export const { width } = Dimensions.get("window");

// https://testnet.binance.vision/
const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;

function OrderInput(props) {
  const { coin } = props;
  const coinSymbol = coin.pair.split('/').join('').toLocaleUpperCase();

  const [number, onChangeNumber] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, [])

  const fetchOrderHistory = async () => {
    const queryString = parseToQueryString({
      symbol: coinSymbol,
      timestamp: Date.now(),
    })

    const signature = CryptoJS.HmacSHA256(queryString, SECRET_KEY).toString(CryptoJS.enc.Hex);


    fetch(`https://testnet.binance.vision/api/v3/allOrders?${queryString}&signature=${signature}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': API_KEY,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(res => {
        setHistory(res);
      })
  }

  const parseToQueryString = (payload) => {
    return Object.keys(payload)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]))
      .join('&');
  }

  const onSubmit = async (side: 'BUY' | 'SELL') => {
    const payload = {
      symbol: coinSymbol,
      side,
      type: 'MARKET',
      quantity: number,
      timestamp: Date.now(),
      recvWindow: 60000,
    }

    const queryString = parseToQueryString(payload)
    const signature = CryptoJS.HmacSHA256(queryString, SECRET_KEY).toString(CryptoJS.enc.Hex);

    fetch(`https://testnet.binance.vision/api/v3/order?${queryString}&signature=${signature}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': API_KEY,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Order placed!',
        position: 'bottom'
      })
      fetchOrderHistory();
    })
    .catch(e => {
      Toast.show({
        type: 'error',
        text1: 'Order failed!',
        position: 'bottom'
      })
    })
  }

  const isButtonDisabled = () => {
    if (Number(number) <= 0) return true;
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <CrypText color="brandWhite" type="bodyL">
          Quantity
        </CrypText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => onSubmit('BUY')} disabled={isButtonDisabled()}>
            <View style={[styles.button, styles.primaryButton, isButtonDisabled() && styles.buttonDisabled]}>
              <CrypText color="brandWhite" type="bodyL">
                Buy
              </CrypText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSubmit('SELL')} disabled={isButtonDisabled()}>
            <View style={[styles.button, styles.sellButton, isButtonDisabled() && styles.buttonDisabled]}>
              <CrypText color="brandWhite" type="bodyL">
                Sell
              </CrypText>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {history.length > 0 && (<CrypText color="brandWhite" type="bodyL">
        Order History
      </CrypText>)}
      {history.map((order, index) => (
        <View key={`order_${index}`} style={styles.rowContainer}>
          <View>
            <CrypText color="brandWhite" type="bodyM">
              Order Id: {order.orderId}
            </CrypText>
            <CrypText color="brandWhite" type="bodyM">
              {order.side} {order.origQty}
            </CrypText>
          </View>
          <CrypText color="brandTeal" type="bodyM">
            {order.status}
          </CrypText>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: CrypSpacing.spacing16,
  },
  input: {
    color: CrypColors.brandWhite,
    marginTop: CrypSpacing.spacing4,
    paddingVertical: CrypSpacing.spacing12,
    backgroundColor: CrypColors.brandGrey,
    paddingHorizontal: CrypSpacing.spacing8,
    borderRadius: CrypSpacing.spacing6,
  },
  btnContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: CrypSpacing.spacing4,
    paddingHorizontal: CrypSpacing.spacing12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: CrypColors.brandGrey,
  }
})

export default OrderInput