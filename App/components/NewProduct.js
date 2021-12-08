import React from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";

import { connect } from "react-redux";
import { selectNewProductData } from "../Store/products";
import { ProductTag } from "../components/ProductTag";

const mapStateToProps = (state) => ({
  newProducts: selectNewProductData(state),
});

export const NewProduct = connect(mapStateToProps)(({ product, onPress }) => {
  const { brandName, name, price, url } = product;

  return (
    <View style={styles.description}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageContainer}>
          <ImageBackground
            imageStyle={{ borderRadius: 100 }}
            source={{
              uri: url,
            }}
            style={styles.image}
          >
            <ProductTag
              title="New"
              style={{
                backgroundColor: "#ffa500",
              }}
            />
          </ImageBackground>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.brandName}>{brandName}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{`${price} $`}</Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            top: 15,
            width: 160,
            height: 1,
            borderWidth: 1,
            borderColor: "#c0c0c0",
          }}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  description: {
    resizeMode: "contain",
    alignItems: "center",
    width: 250,
    height: 350,
    alignItems: "center",

    marginHorizontal: 5,

    padding: 8,
    margin: 2,
  },

  priceRow: {
    flexDirection: "row",
    marginTop: 1,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#8b0000",
    fontWeight: "bold",

    fontStyle: "italic",
  },
  brandName: {
    fontSize: 18,
    color: "#808080",
    fontStyle: "italic",
  },

  image: {
    width: 200,
    height: 220,
    borderRadius: 40,
  },
  hprice: {
    fontSize: 16,
    position: "relative",
    top: 13,
    left: 32,
    color: "#8b0000",
    textDecorationLine: "line-through",

    textDecorationColor: "red",
  },

  price: {
    fontSize: 20,
    left: 35,
    color: "#008000",
    fontWeight: "bold",
    position: "relative",
    top: 11,
    left: 59,
  },
});
