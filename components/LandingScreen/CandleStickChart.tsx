import React, { useEffect, useState, useMemo } from "react";
import { ActivityIndicator, Dimensions, View, StyleSheet } from "react-native";
import { scaleLinear } from "d3-scale";
import { Svg, Line, G, Text } from "react-native-svg";
import Candle from "./Candle";
import { PanGestureHandler, State } from 'react-native-gesture-handler';

export const { width: size } = Dimensions.get("window");
const height = size * 1.3;

const initialNumberOfDataPoints = 30; // Initial number of data points to display

function CandleStickChart() {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(initialNumberOfDataPoints - 1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(res => {
        setData(res);

        const dataLength = res.length;
        const newStartIndex = Math.max(0, dataLength - initialNumberOfDataPoints);
        setStartIndex(newStartIndex);
        setEndIndex(dataLength - 1);
      })
      .catch(error => {
        console.tron('Fetch error:', error);
      });
  }

  const getDomain = (rows) => {
    const values = rows.map(row => [parseFloat(row[2]), parseFloat(row[3])]).flat();
    return [Math.min(...values), Math.max(...values)];
  };

  const handlePanGesture = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const dx = event.nativeEvent.translationX;
      const newEndIndex = Math.min(data.length - 1, Math.max(endIndex - Math.floor(dx / width), initialNumberOfDataPoints - 1));
      const newStartIndex = Math.max(0, newEndIndex - initialNumberOfDataPoints + 1);
      setEndIndex(newEndIndex);
      setStartIndex(newStartIndex);
    }
  };

  const slicedData = useMemo(() => data.slice(startIndex, endIndex + 1), [data, startIndex, endIndex]);
  const domain = useMemo(() => getDomain(slicedData), [slicedData]);
  const width = size / slicedData.length;

  const scaleY = useMemo(() => scaleLinear().domain(domain).range([height, 0]), [domain]);
  const scaleBody = useMemo(() => scaleLinear().domain([0, Math.max(...domain) - Math.min(...domain)]).range([0, height]), [domain]);

  const priceLevels = useMemo(() => {
    const numLevels = 3; // Number of price indicator lines
    const priceRange = Math.max(...domain) - Math.min(...domain); // Total price range
    const levelSpacing = priceRange / (numLevels + 1); // Spacing between each level

    // Calculate the price for each level
    return Array.from({ length: numLevels }, (_, index) => {
      return Math.min(...domain) + levelSpacing * (index + 1);
    });
  }, [slicedData]);

  if (slicedData.length <= 0) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <PanGestureHandler onGestureEvent={handlePanGesture}>
      <Svg width={size} height={height}>
        {slicedData.map((candle, index) => {
          const candleObj = {
            open: parseFloat(candle[1]),
            high: parseFloat(candle[2]),
            low: parseFloat(candle[3]),
            close: parseFloat(candle[4])
          }
          return (
            <Candle
              key={index}
              candle={{ ...candleObj }}
              index={index}
              width={width}
              scaleY={scaleY}
              scaleBody={scaleBody}
            />
          );
        })}

        {priceLevels.map((price, index) => (
          <G key={`price_${index}`}>
            <Line
              x1={0}
              y1={scaleY(price)}
              x2={size}
              y2={scaleY(price)}
              stroke="gray"
              strokeWidth={1}
              strokeDasharray="4"
            />
            <Text x={0} y={scaleY(price) + 15} fontSize={12} fill="white">
              {price}
            </Text>
          </G>
        ))}
      </Svg>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height,
  }
})

export default CandleStickChart;
