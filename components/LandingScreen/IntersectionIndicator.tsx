import { View, Text, Dimensions } from "react-native"
import { Line } from "react-native-svg"

export const { width, height: chartHeight } = Dimensions.get("window");

function IntersectionIndicator(props) {
  const { longPressX, longPressY } = props

  return (
    <View>
      {longPressX !== null && longPressY !== null && (
        <>
          <Line
            x1={0}
            y1={longPressY}
            x2={width}
            y2={longPressY}
            stroke="red"
            strokeWidth={1}
          />
          
          <Line
            x1={longPressX}
            y1={0}
            x2={longPressX}
            y2={width}
            stroke="red"
            strokeWidth={1}
          />
        </>
      )}
    </View>
  )
}

export default IntersectionIndicator