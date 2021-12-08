import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Heart } from "../Icons/Heart";
import { CustomText } from "../components/CustomText";
import { NewProduct } from "../components/NewProduct";

import {
  addProductToFavorites,
  removeProductFromFavorites,
  addProductToUserBag,
} from "../API/index";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

import { COLORS } from "../style/colors";
import { averageRatingCalc, totalRatingCalc } from "../Utils/Calculations";
import Line from "../components/line";

import { getCurrentProduct } from "../Store/products";
export const Details = connect(null, { getCurrentProduct })(
  ({ route, navigation, getCurrentProduct }) => {
    const {
      id,
      name,
      about,
      brandName,
      price,
      url,
      rating,
    } = route.params.product;
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [defaultCount, setDefaultCount] = useState(1);
    const { product, products } = route.params;

    const handleGetCurrentProduct = async () => {
      try {
        await getCurrentProduct(id);
      } catch (error) {
        console.log("handleGetCurrentProduct", error);
      }
    };

    useEffect(() => {
      handleGetCurrentProduct();
    }, []);

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

    return (
      <>
        <View style={styles.container}>
          <View style={styles.imagesection}>
            {url && (
              <Image
                source={{
                  uri: url,
                }}
                style={styles.image}
              />
            )}
          </View>
          <ScrollView>
            <View style={{ alignItems: "center", marginBottom: 8, padding: 2 }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.brand}>{brandName}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{`${price}$`}</Text>

              <View style={{ left: 85, top: 4 }}>
                <Heart
                  width={30}
                  height={30}
                  hasContainer={false}
                  isHeartClicked={isHeartClicked}
                  onPress={() => handleFavoriteProduct()}
                />
                <View style={{ left: 130, top: -39 }}>
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
                          size={23}
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
                          size={23}
                          color={`#808080`}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => addProduct()}>
                    <View style={styles.Bag}>
                      <MaterialCommunityIcons name="shopping" size={26} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Line />
            <View style={styles.ratingRow}>
              <TouchableOpacity
                style={styles.ratingRow}
                onPress={() =>
                  navigation.navigate("Rating", {
                    productID: id,
                  })
                }
              >
                <View style={styles.arrow}>
                  <SimpleLineIcons
                    name={"arrow-right"}
                    color={"#daa520"}
                    size={18}
                  />
                </View>
                <StarRating
                  disabled={true}
                  fullStarColor={COLORS.STAR}
                  starSize={20}
                  starStyle={{ margin: 4 }}
                  containerStyle={{ marginTop: 8, width: 100 }}
                  maxStars={5}
                  rating={averageRatingCalc(rating)}
                />
                <View style={styles.ratingCount}>
                  <Text style={styles.ratingCount}>
                    ({totalRatingCalc(rating)})
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Line />
            <Text style={styles.description}>Description</Text>
            <View>
              <Text style={styles.about}>{about}</Text>
            </View>

            {products !== undefined ? (
              <Text style={styles.suggestionText}>
                --You might like these too--
              </Text>
            ) : null}
            {products !== undefined ? (
              <FlatList
                data={products}
                horizontal={true}
                renderItem={({ item }) => (
                  <View>
                    {id !== item.id ? (
                      <NewProduct
                        product={item}
                        onPress={() =>
                          navigation.navigate("Details", {
                            product: item,
                            products: products,
                          })
                        }
                      />
                    ) : null}
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <CustomText>
                Similar products to this item will be available soon!
              </CustomText>
            )}
            <View style={{ height: 30 }} />
          </ScrollView>
        </View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesection: {
    width: "100%",
    height: "40%",
    marginBottom: 10,
  },

  ratingRow: {
    flexDirection: "row",
    margin: 4,
  },
  counterText: {
    marginHorizontal: 8,
    fontSize: 24,
    top: -3,
    fontWeight: "bold",
  },
  details: {
    textDecorationLine: "underline",
    left: 14,
    top: 5,
    color: "#daa520",
    fontSize: 20,
  },

  Bag: {
    width: 60,
    height: 40,
    right: 4,
    top: 8,
    borderColor: `#8b0000`,
    backgroundColor: "white", // "#696969",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  name: {
    fontSize: 26,
    color: `#8b0000`,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  ratingCount: { left: 20, top: 5 },
  brand: {
    fontSize: 16,
    color: "#808080",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  priceRow: {
    flexDirection: "row",
    marginTop: 18,
  },
  price: {
    fontSize: 26,
    color: `#2f4f4f`, //COLORS.BACKGROUND,
    fontWeight: "bold",

    left: 27,
    textDecorationLine: "underline",
  },
  description: {
    margin: 6,
    fontSize: 18,
    color: `#8b0000`,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  about: {
    fontSize: 17,
    color: "#2f4f4f",
  },
  suggestionText: {
    fontSize: 18,
    marginVertical: 20,
    color: `#8b0000`,
    alignSelf: "center",
    fontWeight: "bold",
  },
  counterText: {
    marginHorizontal: 8,
    fontSize: 18,
    top: -3,
    fontWeight: "bold",
  },
  arrow: {
    left: 0,
    top: 13,
  },
  counter: {
    flexDirection: "row",
    margin: 5,

    right: 11,
  },
});
