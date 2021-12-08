import React from "react";
import { StyleSheet, View, Text } from "react-native";

import StarRating from "react-native-star-rating";
import { COLORS } from "../style/colors";

export const RatingRow = ({ starCount, ratingCount, totalRatingCount }) => {
  const ratingInPercentage = (ratingCount / totalRatingCount) * 100;
  return (
    <View style={styles.row}>
      <StarRating
        disabled={true}
        fullStarColor={COLORS.STAR}
        starSize={14}
        starStyle={{ margin: 3 }}
        maxStars={starCount}
        rating={starCount}
      />

      <View style={styles.progressWrapper}>
        <View
          style={[styles.progressBar, { width: `${ratingInPercentage}%` }]}
        />
      </View>

      <Text style={styles.ratingCount}>{ratingCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressWrapper: {
    width: 90,
    height: 8,
    backgroundColor: COLORS.DARK,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#8b0000",
    borderRadius: 4,
  },

  ratingCount: {
    fontSize: 14,
    color: COLORS.GRAY,
    width: 33,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
