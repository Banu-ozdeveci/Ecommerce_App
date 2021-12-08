import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { PaymentView } from "../components/PaymentView";
import axios from "axios";
import { getCurrentUserData, selectUserData } from "../Store/users";
import { connect } from "react-redux";
import SuccessScreen from "../Screens/SuccessScreen";

const mapStateToProps = (state) => ({
  userData: selectUserData(state),
});

const PaymentScreen = connect(mapStateToProps, { getCurrentUserData })(
  ({ userData, getCurrentUserData, navigation, route }) => {
    const handleGetCurrentUserData = async () => {
      try {
        await getCurrentUserData();
      } catch (error) {
        console.log("getCurrentUser,favorites", error);
      }
    };
    const { count } = route.params;
    const { total } = route.params;
    const { dM } = route.params;

    useEffect(() => {
      handleGetCurrentUserData();
    }, []);

    const bag = userData.userProductsInBag;
    const [response, setResponse] = useState();

    const [makePayment, setMakePayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");

    const cartInfo = {
      Amount: count,
      Summary: total,
      Name: bag.name,
      DeliveryCost: dM.deliveryMethodCost,
      DeliveryName: dM.deliveryMethodName,
    };

    const onCheckStatus = async (paymentResponse) => {
      setPaymentStatus("Please wait while confirming your payment!");
      setResponse(paymentResponse);

      let jsonResponse = JSON.parse(paymentResponse);
      // perform operation to check payment status

      try {
        const stripeResponse = await axios.post(
          "http://192.168.1.31:8000/payment/",
          {
            email: "ozdevecibanu@gmail.com",
            product: cartInfo,
            authToken: jsonResponse,
          }
        );

        if (stripeResponse) {
          const { paid } = stripeResponse.data;
          if (paid === true) {
            setPaymentStatus("Payment Success");
          } else {
            setPaymentStatus("Payment failed due to some issue1");
          }
        } else {
          setPaymentStatus(" Payment failed due to some issue2");
        }
      } catch (error) {
        console.log(error);
        setPaymentStatus(" Payment failed due to some issue3");
      }
    };

    const paymentUI = () => {
      if (!makePayment) {
        return (
          <View
            style={{
              //display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              backgroundColor: "#dcdcdc",
              flex: 1,
            }}
          >
            <Text
              style={{
                bottom: 190,
                fontStyle: "italic",
                fontWeight: "bold",
                fontSize: 28,
                margin: 10,
              }}
            >
              {" "}
              ---Make Payment---{" "}
            </Text>
            <Text style={[styles.title, { bottom: 95 }]}>
              {" "}
              Payable Amount : {cartInfo.Summary}{" "}
            </Text>
            <Text style={[styles.title, { bottom: 85 }]}>
              {" "}
              Number of Items: {cartInfo.Amount}{" "}
            </Text>
            <Text style={[styles.title, { bottom: 75 }]}>
              {" "}
              Delivery Method Cost: {cartInfo.DeliveryCost}{" "}
            </Text>
            <Text style={[styles.title, { bottom: 65 }]}>
              {" "}
              Delivery Method Name: {cartInfo.DeliveryName}{" "}
            </Text>

            <TouchableOpacity
              style={{
                height: 60,
                width: 250,
                backgroundColor: "#800000",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setMakePayment(true);
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 20 }}>
                Proceed To Pay
              </Text>
            </TouchableOpacity>
          </View>
        );

        // show to make payment
      } else {
        if (response !== undefined) {
          return <SuccessScreen></SuccessScreen>;
        } else {
          return (
            <PaymentView
              onCheckStatus={onCheckStatus}
              product={cartInfo.Summary}
              amount={cartInfo.Amount}
            />
          );
        }
      }
    };

    return <View style={styles.container}>{paymentUI()}</View>;
  }
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  navigation: { flex: 2, backgroundColor: "red" },
  body: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  footer: { flex: 1, backgroundColor: "cyan" },
});

export { PaymentScreen };
