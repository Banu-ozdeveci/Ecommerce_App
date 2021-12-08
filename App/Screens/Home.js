import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  LogBox,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import CategoryTitle from "../components/CategoryTitle";
import SafeArea from "../components/SafeArea";

import { COLORS } from "../style/colors";

import banner from "../../assets/z.jpg";
const { height } = Dimensions.get("window");

import { getCurrentUserData, selectUserData } from "../Store/users";

import { SaleProduct } from "../components/SaleProduct";
import { NewProduct } from "../components/NewProduct";

import {
  selectSaleProductData,
  selectNewProductData,
  getOnSaleProducts,
  getNewData,
  getAllData,

  //getFilteredProducts,
} from "../Store/products";

const mapStateToProps = (state) => ({
  saleProducts: selectSaleProductData(state),
  newProducts: selectNewProductData(state),
  userData: selectUserData(state),
});

const Home = connect(mapStateToProps, {
  getOnSaleProducts,
  getNewData,
  getCurrentUserData,
  getAllData,
  // getFilteredProducts,
})(
  ({
    getNewData,
    userData,
    newProducts,
    saleProducts,
    getAllData,
    getOnSaleProducts,
    navigation,
    getCurrentUserData,
    //getFilteredProducts,
  }) => {
    LogBox.ignoreLogs(["Setting a timer"]);

    const handleNewProducts = async () => {
      try {
        await getNewData("new");
      } catch (error) {
        console.log("getNewData", error);
      }
    };

    const handleOnSaleProducts = async () => {
      try {
        await getOnSaleProducts("sale");
      } catch (error) {
        console.log("getOnSaleProducts", error);
      }
    };

    const handleGetCurrentUserData = async () => {
      try {
        await getCurrentUserData();
      } catch (error) {
        console.log("getCurrentUserData", error);
      }
    };

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

    useEffect(() => {
      handleOnSaleProducts();
      handleNewProducts();
      handleGetCurrentUserData();
    }, []);

    return (
      <SafeAreaView style={styles.contain}>
        <View style={styles.all}>
          <ScrollView
            bounces={false}
            decelerationRate="fast"
            snapToInterval={23}
            style={styles.container}
            showsHorizontalScrollIndicator={false}
          >
            <>
              <View style={styles.allcontainer}>
                <Image source={banner} style={styles.hola} />

                <CategoryTitle
                  title="Sale"
                  subtitle="Super Summer Sale"
                  onPress={() => handleCategory("sale")}
                />

                <FlatList
                  contentContainerStyle={{
                    paddingTop: 15,
                  }}
                  horizontal
                  data={saleProducts}
                  renderItem={({ item }) => (
                    <SaleProduct
                      product={item}
                      onPress={() =>
                        navigation.navigate("Details", {
                          product: item,
                          products: saleProducts.filter(
                            (product) => product.tags[0] === item.tags[0]
                          ),
                        })
                      }
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />

                <View style={{ marginVertical: 30 }}></View>

                <CategoryTitle
                  title="New Arrivals"
                  subtitle="Just For You"
                  onPress={() => handleCategory("new")}
                />

                <FlatList
                  contentContainerStyle={{
                    paddingTop: 15,
                  }}
                  horizontal
                  data={newProducts}
                  renderItem={({ item }) => (
                    <NewProduct
                      product={item}
                      onPress={() =>
                        navigation.navigate("Details", {
                          product: item,
                          products: saleProducts.filter(
                            (product) => product.tags[0] === item.tags[0]
                          ),
                        })
                      }
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
);

export default Home;

const styles = StyleSheet.create({
  allcontainer: {
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  bg: {
    backgroundColor: "black",
  },
  hola: {
    width: "100%",
    height: 160,
    marginBottom: 30,
    opacity: 1,
  },
  imageWrapper: {
    width: "100%",
  },
  all: {
    flex: 1,
    backgroundColor: "#dcdcdc",
    height,
  },
  title: {
    fontSize: 48,
    position: "absolute",
    bottom: 88,
    left: 15,
    width: 190,
    color: COLORS.TEXT,
  },
  btn: {
    position: "absolute",
    left: 15,
    bottom: 34,
  },
  newItemsWrap: {
    backgroundColor: "black",
    paddingLeft: 15,
    paddingTop: 20,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 34,
    color: COLORS.TEXT,
  },
  description: {
    color: COLORS.GRAY,
    fontSize: 11,
    marginBottom: 10,
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  background: {
    resizeMode: "cover",
    flex: 1,
  },
});
