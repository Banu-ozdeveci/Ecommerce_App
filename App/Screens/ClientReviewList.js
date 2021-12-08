import React, { useEffect } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { ReviewItem } from "./ReviewItem";
import { CustomText } from "../components/CustomText";
import { GLOBAL_STYLES } from "../style/globalStyles";
import { connect } from "react-redux";
import { selectCurrentProduct, getCurrentProduct } from "../Store/products";
import { ScrollView } from "react-native-gesture-handler";

const mapStateToProps = (state) => ({
  currentProduct: selectCurrentProduct(state),
});

export const ClientReviewsList = connect(mapStateToProps, {
  getCurrentProduct,
})(({ currentProduct, getCurrentProduct, productID }) => {
  const handleGetCurrentProduct = async () => {
    try {
      await getCurrentProduct(productID);
    } catch (error) {
      console.log("handleGetCurrentProduct", error);
    }
  };
  useEffect(() => {
    handleGetCurrentProduct();
  }, []);

  let reviews;
  if (currentProduct.reviews) {
    reviews = currentProduct.reviews;
  } else {
    reviews = [];
  }

  return (
    <View>
      <CustomText style={styles.text} weight="medium">
        {reviews.length} reviews
      </CustomText>

      {reviews ? (
        <ScrollView>
          <FlatList
            data={reviews.reverse() || []}
            contentContainerStyle={styles.container}
            renderItem={({ item, index }) => (
              <ReviewItem
                username={item.username}
                key={index}
                userImg={item.userPhoto}
                rating={item.givenRating}
                comment={item.review_text}
                date={item.date}
              />
            )}
            keyExtractor={(item) => item.date}
          />
        </ScrollView>
      ) : (
        <Text>There is no reviews for this product</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GLOBAL_STYLES.PADDING,
    paddingVertical: GLOBAL_STYLES.PADDING,
    marginBottom: 10,
    //paddingBottom: 200,
  },

  text: {
    fontSize: 24,
    marginLeft: 16,
  },
});
