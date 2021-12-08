import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
  ImageBackground,
} from "react-native";
import { Heart } from "../Icons/Heart";
import { COLORS } from "../style/colors";
import { connect } from "react-redux";
import { selectAllProductData } from "../Store/products";
import { addProductToUserBag } from "../API";
import StarRating from "react-native-star-rating";
import { averageRatingCalc, totalRatingCalc } from "../Utils/Calculations";
const { height, width } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProductTag } from "./ProductTag";
import {
  addProductToFavorites,
  removeProductFromFavorites,
} from "../API/index";

const mapStateToProps = (state) => ({
  allProducts: selectAllProductData(state),
});

export const CategoryProduct = connect(
  mapStateToProps,
  {}
)(({ product, onPress }) => {
  const { id, brandName, name, price, url, IsNew, rating, hprice } = product;

  const [defaultCount, setDefaultCount] = useState(1);
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const addProduct = async () => {
    try {
      addProductToUserBag({
        productId: id,
        name: name,
        price: price,
        url: url,
        brandName: brandName,
        selectedCount: defaultCount,
      });
      Alert.alert("Success", "The product added to your cart!");
    } catch (error) {
      console.log("addProduct", error);
    }
  };

  const handleFavoriteProduct = async () => {
    try {
      if (isHeartClicked == false) {
        addProductToFavorites(product);

        setIsHeartClicked(!isHeartClicked);
      } else {
        setIsHeartClicked(!isHeartClicked);
        removeProductFromFavorites(product);
      }
    } catch (error) {
      console.log("handleFavoriteProduct :", error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.imageContainer}>
          <ImageBackground
            imageStyle={{
              borderRadius: 30,
            }}
            source={{
              uri: url,
            }}
            style={styles.image}
          >
            {hprice ? (
              <ProductTag
                title="Sale"
                style={{
                  backgroundColor: "#6b8e23",
                  top: 2,
                }}
              />
            ) : null}
            {IsNew ? (
              <ProductTag
                title="New"
                style={{
                  backgroundColor: "#ffa500",
                }}
              />
            ) : null}
          </ImageBackground>
        </View>

        <View style={{ alignItems: "center", margin: 6, padding: 4 }}>
          <Text style={styles.title}>{name}</Text>
          <Text style={{ color: COLORS.GRAY }}>{brandName}</Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            top: 5,
            width: 160,
            height: 1,
            borderWidth: 1,
            borderColor: "#c0c0c0",
          }}
        />
        <View style={styles.ratingColumn}>
          {rating ? (
            <StarRating
              disabled={true}
              fullStarColor={COLORS.STAR}
              starSize={14}
              starStyle={{ margin: 3 }}
              containerStyle={{ marginTop: 10, width: 80 }}
              maxStars={5}
              rating={averageRatingCalc(rating)}
            />
          ) : null}
          <Text style={styles.ratingCount}>({totalRatingCalc(rating)})</Text>
        </View>
        <View
          style={{
            alignSelf: "center",
            top: 5,
            width: 160,
            height: 1,
            borderWidth: 1,
            borderColor: "#c0c0c0",
          }}
        />
        <View style={{ bottom: 16 }}>
          <View style={styles.heart}>
            <Heart
              width={30}
              height={30}
              hasContainer={false}
              isHeartClicked={isHeartClicked}
              onPress={() => handleFavoriteProduct()}
            />
          </View>
          <View style={styles.bagColumn}>
            <View style={styles.counter}>
              <View style={styles.minus}>
                <TouchableOpacity
                  onPress={() => {
                    setDefaultCount(
                      defaultCount === 1 ? defaultCount : defaultCount - 1
                    );
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-circle-outline"
                    size={20}
                    color={`#808080`}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.counterText}>{defaultCount}</Text>
              <View style={styles.plus}>
                <TouchableOpacity
                  onPress={() => {
                    setDefaultCount(defaultCount + 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={20}
                    color={`#808080`}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => addProduct()}>
              <View style={styles.Bag}>
                <MaterialCommunityIcons name="shopping" size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceRow}>
          {hprice ? <Text style={styles.hprice}>{hprice} </Text> : null}
          <Text style={styles.price}>{`${price} $`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "47%",
    // height: "80%",
    alignItems: "center",
    borderWidth: 2,

    marginHorizontal: 5,
    borderColor: "#bc8f8f",

    borderRadius: 30,

    marginVertical: 18,
  },
  bagColumn: {
    alignItems: "flex-end",
    right: 8,
  },
  title: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  ratingColumn: {
    flexDirection: "row",
    paddingHorizontal: 2,
  },
  ratingCount: {
    left: 20,
    top: 8,
    color: "#8b4513",
  },
  heart: {
    top: 68,
    left: 15,
  },
  Bag: {
    width: 60,
    height: 40,
    right: 15,
    borderColor: `#8b0000`,
    backgroundColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  BagText: {
    color: "white",
  },

  counterText: {
    marginHorizontal: 8,
    fontSize: 18,
    top: -3,
    fontWeight: "bold",
  },
  counter: {
    flexDirection: "row",
    margin: 5,

    right: 11,
  },
  imageContainer: {
    width: "100%",

    borderRadius: 8,
  },

  priceRow: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 3,
    justifyContent: "center",
  },

  image: {
    top: -2,
    width: (width * 46) / 100,
    height: (height * 25) / 100,
  },

  hprice: {
    color: `#800000`,
    textDecorationLine: "line-through",
    fontSize: 16,
    fontStyle: "italic",
  },

  price: {
    fontSize: 18,

    color: "green",
    fontWeight: "bold",
    alignSelf: "center",
    left: 15,
  },
});
