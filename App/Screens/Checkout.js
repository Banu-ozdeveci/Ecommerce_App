import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
  Dimensions,
} from "react-native";
import { CustomText } from "../components/CustomText";
import { COLORS } from "../style/colors";
import { AddressCard } from "./AddressCard";
import { getCurrentUserData, selectUserData } from "../Store/users";
import { connect } from "react-redux";
import { Btn } from "../components/Btn";
import { totalAmount, randomString } from "../Utils/Calculations";
import { addOrderedProducts, deleteAllShoppingBag } from "../API/index";

import { GLOBAL_STYLES } from "../style/globalStyles";
import Line from "../components/line";

const mapStateToProps = (state) => ({
  user: selectUserData(state),
});

export const Checkout = connect(mapStateToProps, {
  getCurrentUserData,
  addOrderedProducts,
  deleteAllShoppingBag,
})(({ navigation, route, user, getCurrentUserData }) => {
  const { Bag } = route.params;

  const handleGetCurrentUserData = async () => {
    try {
      getCurrentUserData();
    } catch (error) {
      console.log("getCurrentUser", error);
    }
  };

  useEffect(() => {
    handleGetCurrentUserData();
  }, []);

  const shippingAddresses = (user.shippingAddresses || []).filter(
    (address) => address.isSelected === true
  );

  const [deliveryMethod, setDeliveryMethod] = useState({
    deliveryMethodName: "fedex",
    deliveryMethodCost: 15,
  });

  const handleDeliveryMethod = (name, value) => {
    setDeliveryMethod({
      deliveryMethodName: name,
      deliveryMethodCost: value,
    });
  };

  const handleDeleteBagProducts = async () => {
    try {
      await deleteAllShoppingBag();
    } catch (error) {
      console.log("handleDeleteBagProducts", error);
    }
  };

  const handleSubmit = () => {
    addOrderedProducts({
      orderNo: randomString(7, "n"),
      trackingNo: randomString(12),
      quantity: Bag.length,
      totalAmount: totalAmount(Bag),
      date: new Date(Date.now()).toLocaleString().split(",")[0],
      orderedProducts: Bag,
      paymentMethod: "a",
      shippingAddress: shippingAddresses[0],
      deliveryMethod: deliveryMethod,
    });

    navigation.navigate("PaymentScreen", {
      count: Bag.length,
      total: Math.floor(totalAmount(Bag) + deliveryMethod.deliveryMethodCost),
      dM: deliveryMethod,
    });
    handleDeleteBagProducts();
  };
  return (
    <SafeAreaView style={styles.contain}>
      <ScrollView style={styles.container}>
        <StatusBar />
        <View style={styles.bodyPart}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Shipping Address</Text>
          </View>
          <View style={styles.section}>
            {shippingAddresses.length === 0 ? (
              <AddressCard
                isInCheckout={true}
                changePressHandler={() =>
                  navigation.navigate("ShippingAddressesScreen")
                }
              />
            ) : (
              <AddressCard
                fullName={shippingAddresses[0].fullName}
                address={shippingAddresses[0].address}
                city={shippingAddresses[0].city}
                state={shippingAddresses[0].state}
                zipCode={shippingAddresses[0].zipCode}
                country={shippingAddresses[0].country}
                isInCheckout={true}
                changePressHandler={() =>
                  navigation.navigate("ShippingAddressesScreen")
                }
              />
            )}
          </View>
        </View>

        <View style={styles.bodyPart}>
          <View style={styles.titleContainer}></View>
        </View>
        <Line bottom={30} />
        <View style={styles.titleContainer}>
          <CustomText weight={"medium"} style={styles.title}>
            Please Choose a Delivery Method
          </CustomText>
        </View>
        <View style={[styles.section, { height: 100 }]}>
          <TouchableOpacity
            onPress={() => {
              handleDeliveryMethod("fedEx", 15);
            }}
          >
            <Image
              style={styles.deliveryImgWrapper}
              source={{
                uri:
                  "https://cdnuploads.aa.com.tr/uploads/Contents/2020/05/21/thumbs_b_c_734048bfd3b897e3a838fe7dbe4d2bcb.jpg?v=144915",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleDeliveryMethod("usps.com", 17);
            }}
          >
            <Image
              style={styles.deliveryImgWrapper}
              source={{
                uri:
                  "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042018/untitled-1_102.png?5lnaGj371nVr0mbE.uvCG3dfRcjQIgZL&itok=f3Iwenu5",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleDeliveryMethod("DHL", 25);
            }}
          >
            <Image
              style={styles.deliveryImgWrapper}
              source={{
                uri:
                  "https://www.albawaba.com/sites/default/files/styles/d08_standard/public/im/pr_new/DHL-large.png?itok=i3KT2eS2",
              }}
            />
          </TouchableOpacity>
        </View>
        <Line bottom={7} />
        <View style={styles.titleContainer}>
          <CustomText weight={"medium"} style={styles.text}>
            Order:{" "}
          </CustomText>
          <CustomText weight={"medium"} style={styles.price}>
            ${Math.floor(totalAmount(Bag))}
          </CustomText>
        </View>

        <View style={styles.titleContainer}>
          <CustomText weight={"medium"} style={styles.text}>
            Delivery:
          </CustomText>
          <CustomText weight={"medium"} style={styles.price}>
            ${deliveryMethod.deliveryMethodCost}
          </CustomText>
        </View>

        <View style={styles.titleContainer}>
          <CustomText weight={"medium"} style={styles.text}>
            Summary:
          </CustomText>
          <CustomText weight={"medium"} style={styles.price}>
            ${Math.floor(totalAmount(Bag) + deliveryMethod.deliveryMethodCost)}
          </CustomText>
        </View>
        <View style={{ height: 7 }} />

        <Btn
          height={40}
          width={Dimensions.get("window").width - 32}
          bgColor={"#800000"}
          btnName={"Submit Order"}
          titleStyle={{ fontSize: 18 }}
          containerStyle={{ marginTop: 25 }}
          onPress={() => handleSubmit()}
        />
        <View style={{ marginBottom: 34 }} />
      </ScrollView>
    </SafeAreaView>
  );
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  titleContainer: {
    width: "100%",
    height: 40,
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  title: {
    color: "#800000",
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    top: 15,
  },
  section: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  imgWrapper: {
    width: 65,
    height: 40,
    borderRadius: 8,
    position: "absolute",
    bottom: 20,
    left: 10,
  },
  deliveryImgWrapper: {
    width: 100,
    height: 70,
    borderRadius: 8,
  },
  change: {
    position: "absolute",
    top: 0,
    right: 20,
  },
  text: {
    color: COLORS.GRAY,
    fontSize: 16,
    lineHeight: 20,
  },
  price: {
    color: COLORS.TEXT,
    fontSize: 16,
    lineHeight: 20,
    position: "absolute",
    top: 10,
    right: 20,
  },
});
