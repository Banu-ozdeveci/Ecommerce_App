import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  LogBox,
  ScrollView,
} from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import { Btn } from "../components/Btn";
import { ShoppingProduct } from "../components/ShoppingProduct";
import { GLOBAL_STYLES } from "../style/globalStyles";

export const OrderDetails = ({ navigation, route }) => {
  const {
    quantity,
    trackingNo,
    orderNo,
    date,
    total,
    orderedProducts,
    deliveryMethod,

    shippingAddress,
  } = route.params;

  const orderInfo = [
    {
      infoTitle: "Shipping Address:",
      infoText: `${shippingAddress.address}, ${shippingAddress.city},
        ${shippingAddress.country}`,
    },

    {
      infoTitle: "Delivery method:",
      infoText: `${deliveryMethod.deliveryMethodName}, 3 days,${deliveryMethod.deliveryMethodCost}$`,
    },
    {
      infoTitle: "Discount:",
      infoText: `10%,Personal promo
         code`,
    },
    {
      infoTitle: "Total Amount:",
      infoText: `${Math.floor(total)}$`,
    },
  ];
  LogBox.ignoreAllLogs();
  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView>
        <View style={styles.header}>
          <CustomText weight={"medium"} style={styles.orderNo}>
            Order №{orderNo}
          </CustomText>
          <CustomText style={styles.date}>{date}</CustomText>
        </View>
        <View style={[styles.header, { justifyContent: "flex-start" }]}>
          <CustomText style={styles.date}>Tracking number:</CustomText>
          <CustomText weight={"medium"} style={styles.orderNo}>
            {trackingNo}
          </CustomText>
        </View>

        <View style={styles.header}>
          <CustomText weight={"medium"} style={styles.orderNo}>
            {quantity} items
          </CustomText>
          <CustomText style={styles.status}>Delivered</CustomText>
        </View>

        <CustomText weight={"medium"} style={styles.orderInfoTitle}>
          Order Information
        </CustomText>
        {orderInfo.map((item) => (
          <View
            style={[styles.header, { justifyContent: "flex-start" }]}
            key={item.infoText}
          >
            <View style={{ width: 152 }}>
              <CustomText style={styles.date}>{item.infoTitle}</CustomText>
            </View>
            <CustomText weight={"medium"} style={styles.orderNo}>
              {item.infoText}
            </CustomText>
          </View>
        ))}
        <View style={styles.cards}>
          <FlatList
            data={orderedProducts}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <ShoppingProduct orders={true} product={item} />
              </View>
            )}
            keyExtractor={(item) => {
              item.orderNo;
            }}
          />
        </View>

        <View style={styles.btn}>
          <Btn
            width={160}
            height={40}
            borderColor={COLORS.TEXT}
            borderWidth={1}
            btnName={"Reorder"}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    top: 12,
    marginBottom: 20,
  },
  date: {
    paddingRight: 10,
    color: COLORS.GRAY,
    marginLeft: 18,
  },
  orderNo: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 18,

    top: 5,
  },
  status: {
    color: COLORS.SUCCESS,
    lineHeight: 25,
    marginRight: 15,
  },

  cards: {
    width: "100%",
    display: "flex",
  },
  orderInfoTitle: {
    fontSize: 19,
    lineHeight: 20,
    marginLeft: 18,
    marginTop: 18,
    marginBottom: 20,
  },
  btn: {
    width: 360,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
});
