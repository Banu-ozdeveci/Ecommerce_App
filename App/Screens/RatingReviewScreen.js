import React, { useEffect } from "react";

import { ClientReviewsList } from "./ClientReviewList";
import {
  View,
  StyleSheet,
  LogBox,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
} from "react-native";
import { COLORS } from "../style/colors";
import { CustomText } from "../components/CustomText";
import { RatingRow } from "./RatingRow";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { averageRatingCalc, totalRatingCalc } from "../Utils/Calculations";
import { ClientReview } from "./ClientReview";
import { Btn } from "../components/Btn";
import { connect } from "react-redux";

import {
  selectCurrentProductRating,
  getCurrentProduct,
  selectIsModalOpen,
  toggleModal,
} from "../Store/products";

const mapStateToProps = (state) => ({
  rating: selectCurrentProductRating(state),
  isModalOpen: selectIsModalOpen(state),
});

export const RatingReviewScreen = connect(mapStateToProps, {
  getCurrentProduct,
  toggleModal,
})(({ route, rating, toggleModal, isModalOpen }) => {
  const productID = route.params.productID;

  LogBox.ignoreLogs(["VirtualizedLists"]);
  return (
    <TouchableWithoutFeedback onPress={() => toggleModal(false)}>
      <View style={styles.container}>
        <View style={styles.ratingWrapper}>
          <CustomText style={styles.heading} weight="bold">
            Rating & Reviews
          </CustomText>

          <View style={styles.row}>
            <View style={styles.totalRating}>
              <Text style={styles.averageRate} weight="medium">
                {averageRatingCalc(rating)}
              </Text>
              <Text style={styles.totalCount}>
                {totalRatingCalc(rating)} rating
              </Text>
            </View>
            <View style={styles.ratingColumn}>
              <RatingRow
                starCount={5}
                ratingCount={rating[4]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={4}
                ratingCount={rating[3]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={3}
                ratingCount={rating[2]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={2}
                ratingCount={rating[1]}
                totalRatingCount={totalRatingCalc(rating)}
              />
              <RatingRow
                starCount={1}
                ratingCount={rating[0]}
                totalRatingCount={totalRatingCalc(rating)}
              />
            </View>
          </View>
        </View>
        <View style={styles.ratingColumn}></View>

        <View style={{ marginBottom: 20 }}>
          <ClientReviewsList productID={productID} />
        </View>

        <Btn
          btnName="Write a review"
          onPress={() => toggleModal(true)}
          width={128}
          height={36}
          bgColor={"#8b0000"}
          containerStyle={{
            position: "absolute",

            bottom: 30,
            right: 20,
          }}
        />

        {isModalOpen ? <ClientReview productID={productID} /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  ratingWrapper: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
  },
  heading: {
    fontSize: 34,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  averageRate: {
    fontSize: 44,
    color: "#8b0000",
  },

  totalCount: {
    fontSize: 14,
    color: COLORS.GRAY,
  },

  ratingColumn: {
    justifyContent: "flex-end",
  },
});
