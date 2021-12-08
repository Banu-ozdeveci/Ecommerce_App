import React from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

const onBoardings = [
  {
    title: "Welcome!",
    description:
      "Buy our products easily and get access to app only exclusives. ",
    img: require("../../assets/4.png"),
  },
  {
    title: "Stripe Payments",
    description: "We support all payment options,thanks to stripe.",
    img: require("../../assets/p.jpg"),
  },
  {
    title: "Ratings & Reviews",
    description: "We value your opinion.",
    img: require("../../assets/p4.jpg"),
  },
  {
    title: "Order Tracking",
    description: "Monitor your orders.",
    img: require("../../assets/p5.jpg"),
  },
];

const OnBoarding = ({ navigation }) => {
  const [completed, setCompleted] = React.useState(false);

  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  // Render

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {onBoardings.map((item, index) => (
          <View
            //center
            //bottom
            key={`img-${index}`}
            style={styles.imageAndTextContainer}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "60%",
                }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                bottom: "26%",
                left: 40,
                right: 40,
              }}
            >
              <Text
                style={{
                  color: "#8b0000",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  marginTop: 8,
                  color: "#696969",
                  fontWeight: "bold",

                  top: 12,
                }}
              >
                {item.description}
              </Text>
            </View>
            {/* Button */}
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 140,
                height: 60,
                paddingLeft: 39,
                justifyContent: "center",
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: "#8b0000",
              }}
              onPress={() => {
                navigation.navigate("AuthForm");
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {index === 3 ? "Let's Start" : "Skip"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width);

    return (
      <View style={styles.dotsContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 17, 8],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight,
  },
  imageAndTextContainer: {
    width: width,
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: height > 700 ? "6%" : "4%",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24 / 2,
    marginBottom: 24 * 3,
    height: 24,
  },
  dot: {
    borderRadius: 12,
    backgroundColor: "#8b0000",
    marginHorizontal: 12 / 2,
  },
});

export default OnBoarding;
