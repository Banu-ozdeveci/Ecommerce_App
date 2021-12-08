export const totalAmount = (products) => {
  let total = 0;
  products.forEach((product) => {
    const add = +product.price * +product.selectedCount;

    total = total + add;
  });

  return total;
};

export function randomString(len, an) {
  an = an && an.toLowerCase();
  let str = "",
    i = 0,
    min = an == "a" ? 10 : 0,
    max = an == "n" ? 10 : 62;
  for (; i++ < len; ) {
    let r = (Math.random() * (max - min) + min) << 0;
    str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  }
  return str;
}

export function totalRatingCalc(rating) {
  if (rating) {
    let totalRatingCount = 0;

    for (let y = 0; y <= 4; y++) {
      totalRatingCount += rating[y];
    }

    return totalRatingCount;
  }
}
export function averageRatingCalc(rating) {
  if (rating) {
    let totalRatingCount = 0;
    for (let y = 0; y <= 4; y++) {
      totalRatingCount += rating[y];
    }
    let totalStarCount = 0;
    for (let i = 0; i <= 4; i++) {
      totalStarCount += rating[i] * (i + 1);
    }
    const averageRating =
      Math.round((totalStarCount / totalRatingCount) * 10) / 10;
    return averageRating;
  }
}
