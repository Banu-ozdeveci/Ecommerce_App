import React, { useState } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Text,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { addProductToUserBag, removeProductFromFavorites } from "../API/index";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Line from "../components/line";

import { connect } from "react-redux";
import { selectAllProductData } from "../Store/products";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

import { ProductTag } from "../components/ProductTag";

const mapStateToProps = (state) => ({
  allProducts: selectAllProductData(state),
});

export const FavoriteProduct = connect(mapStateToProps)(
  ({ product, onPress }) => {
    const { brandName, name, price, url, hprice, IsNew, id } = product;

    const addProduct = async () => {
      try {
        addProductToUserBag({
          productId: id,
          name: name,
          price: price,
          url: url,
          brandName: brandName,
          selectedCount: 1,
        });
        Alert.alert("Success", "The product added to your cart!");
      } catch (error) {
        console.log("addProduct", error);
      }
    };
    const [isHeartClicked, setIsHeartClicked] = useState(true);
    const removeFavoriteProduct = async () => {
      try {
        setIsHeartClicked(!isHeartClicked);
        removeProductFromFavorites(product);
      } catch (error) {
        console.log("handleFavoriteProduct :", error);
      }
    };

    return (
      <Swipeable
        renderRightActions={() => (
          <View
            style={{
              width: 60,
              height: 50,
              top: 70,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => removeFavoriteProduct()}>
              <MaterialCommunityIcons size={30} name={"trash-can-outline"} />
            </TouchableOpacity>
          </View>
        )}
      >
        <View style={styles.item}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <ImageBackground
                  source={{
                    uri: url,
                  }}
                  style={styles.image}
                  imageStyle={{
                    borderRadius: 90,
                  }}
                >
                  {hprice ? (
                    <ProductTag
                      title="Sale"
                      style={{
                        top: -9,
                        backgroundColor: "#6b8e23",
                      }}
                    />
                  ) : null}

                  {IsNew ? (
                    <ProductTag
                      title="New"
                      style={{
                        backgroundColor: "gold",
                      }}
                    />
                  ) : null}
                </ImageBackground>
              </View>
              <View style={styles.column}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{name}</Text>
                  <Text style={styles.brandName}>{brandName}</Text>
                </View>

                <View style={styles.arrow}>
                  <SimpleLineIcons name={"arrow-left"} size={18} />
                </View>

                <View style={{ flexDirection: "row", left: 25 }}>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{`${price} $`}</Text>
                    {hprice && (
                      <Text style={styles.hprice}>{`${hprice} $`}</Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => addProduct()}>
                    <View style={styles.Bag}>
                      <MaterialCommunityIcons name="shopping" size={24} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <Line />
      </Swipeable>
    );
  }
);

const styles = StyleSheet.create({
  item: {
    width: "95%",
    flex: 1,
    // borderWidth: 1,
    borderRadius: 20,

    height: 180, //"70%",
    marginTop: 30,
    marginVertical: 6,
    alignItems: "flex-start",
  },
  column: {
    position: "absolute",
    right: -195,
    bottom: 14,

    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  Bag: {
    width: 60,
    height: 40,
    right: 15,
    borderColor: `#8b0000`,
    backgroundColor: "white", // "#696969",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  arrow: {
    bottom: 15,
    left: 8,
  },
  priceRow: {
    flexDirection: "column",
    marginTop: 1,
    bottom: 2,
    left: -47,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    bottom: 25,
    paddingVertical: 7,

    // alignSelf: "center",
    // left: 36,
  },
  title: {
    fontSize: 18,
    color: "#8b0000",
    fontWeight: "bold",
    top: 5,

    fontStyle: "italic",
  },
  brandName: {
    fontSize: 14,
    color: "#808080",
    fontStyle: "italic",
    marginVertical: 6,
  },
  imageContainer: {
    width: "40%",
    height: "100%",
  },
  image: {
    width: 150, //"100%",
    height: "98%",
  },
  hprice: {
    fontSize: 16,
    position: "relative",

    color: "#8b0000",
    textDecorationLine: "line-through",

    textDecorationColor: "red",
  },

  price: {
    fontSize: 18,

    color: "#008000",
    fontWeight: "bold",
    position: "relative",
  },
});
