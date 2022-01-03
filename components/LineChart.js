import React from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { Text } from "react-native-elements";
import { Dimensions, View } from "react-native";
const screenWidth = Dimensions.get("window").width;



const LineChartInfo = ({coinHistory, currentPrice, coinName}) => {

const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }



 const data = {
    labels: coinTimestamp,
    datasets: [
      {
        data: coinPrice,

      },
    ],
  };

  return (
   <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={data}
     verticalLabelRotation = {60}
    width={Dimensions.get("window").width} // from react-native
    height={320}
    yAxisLabel="$"
    yAxisSuffix=""
      withVerticalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "rgb(83, 1, 94)",
      backgroundGradientFrom: "rgb(83, 1, 94)",
      backgroundGradientTo: "rgba(0, 17, 84, 0.8)",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForLabels: {
            fontSize: "9",
            fontWeight: "bold",
            
          },
      style: {
        borderRadius: 20
      },
      propsForDots: {
        r: "2",
        strokeWidth: "1",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      paddingTop: 40,
      borderRadius: 0,
    
    }}
  />
</View>
  );
};

export default LineChartInfo;