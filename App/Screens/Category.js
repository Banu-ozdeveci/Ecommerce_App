import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Transition, Transitioning } from "react-native-reanimated";
import { getAllData, selectAllProductData } from "../Store/products";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  allProducts: selectAllProductData(state),
});

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);
const { height, width } = Dimensions.get("window");

const Category = connect(mapStateToProps, {
  getAllData,
})(
  ({
    navigation,

    getAllData,
  }) => {
    const [currentIndex, setCurrentIndex] = React.useState(null);
    const ref = React.useRef();

    const handleCategory = async (category) => {
      try {
        await getAllData(category);
      } catch (error) {
        console.log("getAllData", error);
      }
      navigation.navigate("SingleCategory", {
        name: category,
      });
    };

    return (
      <SafeAreaView style={styles.contain}>
        <View style={styles.all}>
          <ImageBackground
            style={styles.titleImage}
            source={require("../../assets/x.jpg")}
          >
            <Text style={styles.text}>CATEGORIES</Text>
          </ImageBackground>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.container}
          >
            <StatusBar hidden />

            {data.map(({ color, image, category, subCategories }, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    ref.current.animateNextTransition();
                    setCurrentIndex(index === currentIndex ? null : index);
                  }}
                  style={styles.cardContainer}
                  activeOpacity={0.9}
                >
                  <View style={[styles.card]}>
                    <ImageBackground
                      style={{ flexGrow: 1, width: "100%" }}
                      source={image}
                    >
                      <Text style={[styles.heading]}>{category}</Text>
                      <TouchableWithoutFeedback
                        onPress={() => handleCategory(category)}
                      >
                        <View style={styles.arrow}>
                          <MaterialCommunityIcons
                            name="arrow-right-thick"
                            size={25}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                      <View style={{ alignItems: "flex-start" }}>
                        {index === currentIndex && (
                          <View style={styles.subCategoriesList}>
                            {subCategories.map((subCategory) => (
                              <Text
                                key={subCategory}
                                style={[styles.body, { color: color }]}
                              >
                                {subCategory}
                              </Text>
                            ))}
                          </View>
                        )}
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Transitioning.View>
        </View>
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    left: width - 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: "900",
    color: "#8b0000",
    textTransform: "uppercase",
    letterSpacing: 0,

    top: 30,
  },
  all: {
    flex: 1,
    height,
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  body: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  subCategoriesList: {
    marginTop: 6,
    top: 10,
  },
  titleImage: {
    width: "100%",
    height: 73,
    borderBottomEndRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 15,
  },
  text: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    top: 7,
  },
});

const data = [
  {
    color: "black",

    image: require("../../assets/y1.jpg"),
    category: "Dress",
    subCategories: ["H&M", "Bershka", "Zara", "Pull And Bear"],
  },
  {
    color: "white",

    image: require("../../assets/y4.jpg"),
    category: "Shoes",
    subCategories: [
      "Nike",
      "Adidas",
      "Under Armour",
      "Balenciaga",
      "Polo",
      "Bambi",
      "Zara",
    ],
  },
  {
    color: "black",
    image: require("../../assets/y5.jpg"),
    category: "Bag",
    subCategories: ["Pull and Bear", "Gucci", "Zara", "Chanel", "Nike"],
  },
  {
    color: "white",
    image: require("../../assets/c5.jpg"),
    category: "T-Shirt",
    subCategories: [
      "Polo",
      "Zara",
      "Mudo",
      "Penti",
      "Nike",
      "H&M",
      "Bershka",
      "Koton",
      "Levis",
    ],
  },
  {
    color: "black",

    image: require("../../assets/c2.jpg"),
    category: "Watch",
    subCategories: [
      "Freelook",
      "Michael kors",
      "Calvin Klein",

      "Koton",
      "Levis",
      "Puma",
    ],
  },
];
export default Category;
