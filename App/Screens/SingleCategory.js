import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { selectAllProductData } from "../Store/products";
import { connect } from "react-redux";
import { CategoryProduct } from "../components/CategoryProduct";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const mapStateToProps = (state) => ({
  allProducts: selectAllProductData(state),
});

const { height, width } = Dimensions.get("screen");

export const SingleCategory = connect(
  mapStateToProps,
  {}
)(({ route, navigation, allProducts }) => {
  const name = route.params.name;

  const products = allProducts.allProducts;
  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.titleImage}
          source={require("../../assets/x.jpg")}
        >
          {name === "new" || name === "sale" ? null : (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Category")}
            >
              <View style={styles.arrow}>
                <MaterialCommunityIcons
                  name="arrow-left-thick"
                  size={35}
                  color={"white"}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          <View style={styles.Section}>
            <Text style={styles.text}>{name} Products</Text>
          </View>
        </ImageBackground>
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <CategoryProduct
              product={item}
              onPress={() =>
                navigation.navigate("Details", {
                  product: item,
                  products: products.filter(
                    (product) => product.tags[0] === item.tags[0]
                  ),
                })
              }
            />
          )}
        />
        <View style={{ marginBottom: 130 }} />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { height },
  titleImage: {
    width: "100%",
    height: 73,
    borderBottomEndRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  text: {
    fontStyle: "italic",

    fontWeight: "bold",

    color: "white",
    fontSize: 30,
    top: 5,
  },
  section: { justifyContent: "center", alignItems: "center" },
  arrow: {
    alignSelf: "center",
    left: -45,
    top: 5,
  },
});
