import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { ShoppingProduct } from "../components/ShoppingProduct";
import { deleteAllShoppingBag } from "../API/index";

import { getCurrentUserData, selectUserData } from "../Store/users";
const { width, height } = Dimensions.get("screen");

const mapStateToProps = (state) => ({
  userData: selectUserData(state),
});

const ShoppingBag = connect(mapStateToProps, { getCurrentUserData })(
  ({ userData, getCurrentUserData, navigation }) => {
    const handleGetCurrentUserData = async () => {
      try {
        await getCurrentUserData();
      } catch (error) {
        console.log("getCurrentUser,favorites", error);
      }
    };
    const handleCheckOut = () => {
      if (bag.length) {
        navigation.navigate("Checkout", {
          Bag: bag,
        });
      } else {
        Alert.alert("Error", "Please add product before ordering!");
      }
    };

    useEffect(() => {
      handleGetCurrentUserData();
    }, []);

    const bag = userData.userProductsInBag;

    return (
      <SafeAreaView style={styles.contain}>
        <ImageBackground
          style={styles.titleImage}
          source={require("../../assets/x.jpg")}
        >
          <Text style={styles.text}>Shopping Bag</Text>
        </ImageBackground>
        {bag.length === 0 ? (
          <View style={styles.empty}>
            <ImageBackground
              imageStyle={{ resizeMode: "repeat" }}
              style={{ width: width, height: height + 100 }}
              source={require("../../assets/z2.jpg")}
            >
              <Text style={styles.emptytext}>
                You don't have any products in Bag!
              </Text>
            </ImageBackground>
          </View>
        ) : (
          <>
            <View style={{ width: "30%", flexDirection: "row" }}>
              <Button
                title="Delete all"
                color="#778899"
                onPress={() => deleteAllShoppingBag()}
              />
              <View style={{ left: width - 190 }}>
                <Button
                  title="Checkout"
                  color="#556b2f"
                  onPress={() => handleCheckOut()}
                />
              </View>
            </View>

            <FlatList
              style={{ marginBottom: 0 }}
              data={bag}
              renderItem={({ item }) => (
                <ShoppingProduct
                  count={item.selectedCount}
                  product={item}
                  onPress={() =>
                    navigation.navigate("Details", {
                      product: item,
                    })
                  }
                />
              )}
              keyExtractor={(item) => item.name}
            />
          </>
        )}
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  titleImage: {
    width: "100%",
    height: 73,
    borderBottomEndRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    top: 7,
  },
  empty: {
    //flex: 0,
    backgroundColor: "#fff5ee",
    alignItems: "center",
  },
  emptytext: {
    top: 156,

    fontWeight: "bold",
    fontSize: 20,
    color: `#a0522d`,
  },
});

export default ShoppingBag;
