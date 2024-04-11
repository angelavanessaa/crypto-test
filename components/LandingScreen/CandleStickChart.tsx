import { Dimensions } from "react-native"
import React, { useEffect, useState, useMemo } from "react";
import { scaleLinear } from "d3-scale";
import { Svg } from "react-native-svg";
import Candle from "./Candle";
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

export const { width: size } = Dimensions.get("window");

const initialNumberOfDataPoints = 20; // Initial number of data points to display

function CandleStickChart() {
  const [data, setData] = useState([]);
  const [numberOfDataPoints, setNumberOfDataPoints] = useState(initialNumberOfDataPoints);

  // Calculate initial startIndex and endIndex to display the rightmost candlestick
  const initialStartIndex = Math.max(0, data.length - initialNumberOfDataPoints);
  const initialEndIndex = Math.max(0, data.length - 1);

  const [startIndex, setStartIndex] = useState(initialStartIndex);
  const [endIndex, setEndIndex] = useState(initialEndIndex);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update startIndex and endIndex when data changes to keep the rightmost candlestick visible
    const newStartIndex = Math.max(0, data.length - initialNumberOfDataPoints);
    setStartIndex(newStartIndex);
    setEndIndex(data.length - 1);
  }, [data, initialNumberOfDataPoints]);

  const fetchData = async () => {
    fetch('https://api.binance.com/api/v3/klines?symbol=BNBBTC&interval=5m')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(res => {
        setData(res);
      })
      .catch(error => {
        console.tron('Fetch error:', error);
      });
  };

  const getDomain = (rows) => {
    const values = rows.map(row => [parseFloat(row[2]), parseFloat(row[3])]).flat();
    return [Math.min(...values), Math.max(...values)];
  };

  const handlePanGesture = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const dx = event.nativeEvent.translationX;
      const newStartIndex = Math.max(0, startIndex - Math.floor(dx / width));
      const newEndIndex = Math.min(data.length, endIndex - Math.floor(dx / width));

      if (newEndIndex >= data.length) return;
      console.tron(newStartIndex, newEndIndex)
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  const handlePinchGesture = event => {
    if (event.nativeEvent.scale !== 1) {
      const newScale = event.nativeEvent.scale;
      setNumberOfDataPoints(initialNumberOfDataPoints * newScale);
    }
  };

  const slicedData = useMemo(() => data.slice(startIndex, endIndex + 1), [data, startIndex, endIndex]);

  const domain = useMemo(() => getDomain(slicedData), [slicedData]);
  const width = size / slicedData.length;

  const scaleY = useMemo(() => scaleLinear().domain(domain).range([size, 0]), [domain]);
  const scaleBody = useMemo(() => scaleLinear().domain([0, Math.max(...domain) - Math.min(...domain)]).range([0, size]), [domain]);

  return (
    <PanGestureHandler onGestureEvent={handlePanGesture}>
      <PinchGestureHandler onGestureEvent={handlePinchGesture}>
        <Svg width={size} height={size}>
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
        </Svg>
      </PinchGestureHandler>
    </PanGestureHandler>
  );
}

export default CandleStickChart;
