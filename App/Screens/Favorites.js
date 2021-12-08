import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import { FavoriteProduct } from "../components/FavoriteProduct";
import { deleteAllFavorites } from "../API/index";

import { getCurrentUserData, selectUserData } from "../Store/users";

const mapStateToProps = (state) => ({
  userData: selectUserData(state),
});

const Favorites = connect(mapStateToProps, { getCurrentUserData })(
  ({ userData, getCurrentUserData, navigation }) => {
    const handleGetCurrentUserData = async () => {
      try {
        await getCurrentUserData();
      } catch (error) {
        console.log("getCurrentUser,favorites", error);
      }
    };

    useEffect(() => {
      handleGetCurrentUserData();
    }, []);

    const fav = userData.userFavorites;

    return (
      <SafeAreaView style={styles.contain}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.titleImage}
            source={require("../../assets/x.jpg")}
          >
            <Text style={styles.text}>Favorites</Text>
          </ImageBackground>
          {fav.length === 0 ? (
            <View style={styles.empty}>
              <ImageBackground
                imageStyle={{ resizeMode: "repeat" }}
                style={{ width: "100%", height: "100%" }}
                source={require("../../assets/z2.jpg")}
              >
                <Text style={styles.emptytext}>
                  You don't have any products in Favorites!
                </Text>
              </ImageBackground>
            </View>
          ) : (
            <View style={{ width: "30%" }}>
              <Button
                title="Delete all"
                color="#778899"
                onPress={() => deleteAllFavorites()}
              />
            </View>
          )}

          <FlatList
            style={{ marginBottom: 150 }}
            data={fav}
            renderItem={({ item }) => (
              <FavoriteProduct
                product={item}
                onPress={() =>
                  navigation.navigate("Details", {
                    product: item,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
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
    // flex: 1,
    backgroundColor: "#fff5ee",
    alignItems: "center",
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  emptytext: {
    top: 156,

    fontWeight: "bold",
    fontSize: 20,
    color: `#a0522d`,
  },
});

export default Favorites;
