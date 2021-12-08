import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
} from "react-native";
import { selectSaleProductData, selectNewProductData } from "../Store/products";
import { connect } from "react-redux";
import { SaleProduct } from "../components/SaleProduct";

const mapStateToProps = (state) => ({
  saleProducts: selectSaleProductData(state),
  newProducts: selectNewProductData(state),
});

const SaleScreen = connect(
  mapStateToProps,
  {}
)(({ newProducts, saleProducts, route }) => {
  const product = route.params.products;
  const type = route.params.type;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.titleImage}
        source={require("../../assets/x.jpg")}
      >
        {type == "saleItem" ? (
          <Text style={styles.text}>Sale Products</Text>
        ) : (
          <Text style={styles.text}>New Products</Text>
        )}
      </ImageBackground>
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          paddingTop: 25,
        }}
        numColumns={1}
        data={product}
        renderItem={({ item }) => (
          <SaleProduct
            product={item}
            onPress={() =>
              navigation.navigate("Details", {
                product: item,
                products: saleProducts.filter(
                  (product) => product.categoryName === item.categoryName
                ),
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default SaleScreen;
