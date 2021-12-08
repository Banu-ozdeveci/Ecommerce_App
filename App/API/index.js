import * as firebase from "firebase";
import "./firebase";
import { randomString, totalAmount } from "../Utils/Calculations";

//************************* */
export const getData = async (category) => {
  const products = [];
  let ref = {};
  try {
    if (category === undefined) {
      ref = firebase.firestore().collection("products");
    } else {
      ref = firebase
        .firestore()
        .collection("products")
        .where("tags", "array-contains", category);
    }

    const productsSnap = await ref.get();
    productsSnap.forEach((product) => {
      const data = product.data();
      products.push({
        id: product.id,
        ...data,
      });
    });
  } catch (e) {
    console.log("error", e);
  }
  return products;
};

// ***********************
export const getTagsData = async (tag) => {
  const tagProducts = [];
  try {
    const ref = firebase
      .firestore()
      .collection("products")
      .where("tags", "array-contains", tag);

    const productsSnap = await ref.get();
    productsSnap.forEach((product) => {
      const data = product.data();
      tagProducts.push({
        id: product.id,
        ...data,
      });
    });
  } catch (e) {
    console.log("error", e);
  }
  return tagProducts;
};

//*************** */
export const getBrandsData = async (brand) => {
  const brandProducts = [];
  try {
    const ref = firebase
      .firestore()
      .collection("products")
      .where("brandName", "==", brand);

    const productsSnap = await ref.get();
    productsSnap.forEach((product) => {
      const data = product.data();
      brandProducts.push({
        id: product.id,
        ...data,
      });
    });
  } catch (e) {
    console.log("error", e);
  }
  return brandProducts;
};

//************************************* */

export const addProductToFavorites = async (product) => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const userProductsSnap = await userProductsRef.get();
    const userData = userProductsSnap.data();

    let shouldBeAdded = true;
    shouldBeAdded = userData.userFavorites.find(
      (item) => item.id === product.id
    );
    shouldBeAdded ? null : userData.userFavorites.push(product);

    userProductsRef.set(
      {
        userFavorites: userData.userFavorites,
      },
      { merge: true }
    );
  } catch (error) {
    console.log("addProductFavorites", error);
  }
};
//************************************* */

export const removeProductFromFavorites = async (product) => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const userProductsSnap = await userProductsRef.get();
    const userData = userProductsSnap.data();

    const favs = userData.userFavorites;
    const filteredFavs = favs.filter((item) => {
      return item.id !== product.id;
    });

    userProductsRef.set(
      {
        userFavorites: filteredFavs,
      },
      { merge: true }
    );
  } catch (error) {
    console.log("RemoveProductFromFavorites", error);
  }
};

//******************** */
export const deleteAllFavorites = async () => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userProductsSnap = await userProductsRef.get();
    const userData = userProductsSnap.data();

    const favs = userData.userFavorites;
    const filteredFavs = favs.filter(() => {
      return false;
    });

    userProductsRef.set(
      {
        userFavorites: filteredFavs,
      },
      { merge: true }
    );
  } catch (error) {
    console.log("DeleteAllFavorites", error);
  }
};

//******************************** */

export const removeProductFromUsersBag = (product) => async () => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
    const userProductsSnap = await userProductsRef.get();
    const userData = userProductsSnap.data();

    const bagProducts = userData.userProductsInBag;

    const filteredBagProducts = bagProducts.filter((item) => {
      if (item.id === product.id) {
        return false;
      } else {
        return true;
      }
    });

    userProductsRef.set(
      {
        userProductsInBag: filteredBagProducts,
      },
      { merge: true }
    );
  } catch (e) {
    console.log("remove from userBag error:", e);
  }
};

//*********************** */

export const deleteAllShoppingBag = async () => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userProductsSnap = await userProductsRef.get();
    const userData = userProductsSnap.data();

    const shoppingBag = userData.userProductsInBag;
    const filteredshoppingBag = shoppingBag.filter(() => {
      return false;
    });

    userProductsRef.set(
      {
        userProductsInBag: filteredshoppingBag,
      },
      { merge: true }
    );
  } catch (error) {
    console.log("DeleteAllShoppingBag", error);
  }
};

//****************** */
export const addProductToUserBag = async (payload) => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userSnap = await userProductsRef.get();
    const userData = userSnap.data();

    let isInTheBag = true;
    isInTheBag = userData.userProductsInBag.find(
      (item) => item.productId === payload.productId
    );
    if (isInTheBag) {
      const updatedProducts = [];
      userData.userProductsInBag.forEach((product) => {
        if (product.productId === payload.productId) {
          updatedProducts.push({
            ...product,
            selectedCount: payload.selectedCount,
          });
        } else {
          updatedProducts.push(product);
        }
      });
      userProductsRef
        .set(
          {
            userProductsInBag: updatedProducts,
          },
          { merge: true }
        )
        .catch((error) => {
          console.log(
            "Something went wrong with added user to firestore: ",
            error
          );
        });
    } else {
      userData.userProductsInBag.push(payload);
      userProductsRef
        .set(
          {
            userProductsInBag: userData.userProductsInBag,
          },
          { merge: true }
        )
        .catch((error) => {
          console.log(
            "Something went wrong with added user to firestore: ",
            error
          );
        });
    }
  } catch (error) {
    console.log("addProductToUserBag error", error);
  }
};

//************************ */
export const addOrderedProducts = async (payload) => {
  try {
    const userProductsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userProductsSnap = await userProductsRef.get();
    const userData = userProductsSnap.data();
    console.log("orders", payload);
    userData.orders.push(payload);
    userProductsRef.set(
      {
        orders: userData.orders,
      },
      { merge: true }
    );
  } catch (e) {
    console.log("error", e);
  }
};

//************************* */
export const selectShippingAddress = async (pressedIndex) => {
  try {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userSnap = await userRef.get();
    const userData = userSnap.data();

    userData.shippingAddresses.map((address, index) => {
      if (index === pressedIndex) {
        address.isSelected = true;
      } else {
        address.isSelected = false;
      }
    });

    userRef
      .set(
        {
          shippingAddresses: userData.shippingAddresses,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with a selectShippingAddressto firestore: ",
          error
        );
      });
    // dispatch(addShippingAddress(payload));
  } catch (error) {
    console.log("selectShippingAddress error", error);
  }
};

//********************************** */
export const saveShippingAddress = async (payload, isEdit, index) => {
  try {
    const userRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const userSnap = await userRef.get();
    const userData = userSnap.data();

    if (isEdit) {
      userData.shippingAddresses[index] = payload;
      userRef
        .set(
          {
            shippingAddresses: userData.shippingAddresses,
          },
          { merge: true }
        )
        .catch((error) => {
          console.log(
            "Something went wrong with added shipping address to firestore: ",
            error
          );
        });
    } else {
      userData.shippingAddresses.push({
        ...payload,
      });
      userRef
        .set(
          {
            shippingAddresses: userData.shippingAddresses,
          },
          { merge: true }
        )
        .catch((error) => {
          console.log(
            "Something went wrong with added shipping address to firestore: ",
            error
          );
        });
    }
  } catch (error) {
    console.log("saveShippingAddress error", error);
  }
};

//******************** */
export const changeUsernameAndPhoto = async (payload) => {
  try {
    const response = await fetch(payload.userPhoto);
    const blob = await response.blob();
    const key = firebase.database().ref("key").push().key;
    const snap = await firebase.storage().ref(key).put(blob);
    const url = await snap.ref.getDownloadURL();

    const settingsRef = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    const settingsSnap = await settingsRef.get();
    const settingData = settingsSnap.data();
    settingsRef
      .set(
        {
          ...settingData,
          username: payload.username,
          userPhoto: url,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with changeUsernameAndPhoto to firestore: ",
          error
        );
      });
  } catch (error) {
    console.log("changeUsernameAndPhoto error", error);
  }
};

//************ */
export const increaseRating = async (payload) => {
  try {
    const ratingRef = firebase
      .firestore()
      .collection("products")
      .doc(payload.productID);

    const ratingSnap = await ratingRef.get();
    const ratingData = ratingSnap.data();

    const selectedRating = ratingData.rating[payload.givenRating - 1];
    const newValue = selectedRating + 1;

    (ratingData.rating[payload.givenRating - 1] = newValue),
      ratingRef
        .set(
          {
            rating: ratingData.rating,
          },

          { merge: true }
        )
        .catch((error) => {
          console.log(
            "Something went wrong with increaseRating to firestore: ",
            error
          );
        });
  } catch (error) {
    console.log("increaseRating error", error);
  }
};

//******************** */
export const sendReview = async (payload) => {
  const date = new Date(Date.now()).toLocaleString().split(",")[0];
  console.log("SENDREVİEW", payload);
  try {
    const reviewRef = firebase
      .firestore()
      .collection("products")
      .doc(payload.productID);

    const reviewSnap = await reviewRef.get();
    const reviewData = reviewSnap.data();

    reviewData.reviews.push({
      username: payload.username,
      // userPhoto: payload.userPhoto,
      review_text: payload.review_text,
      givenRating: payload.givenRating,
      date: date,
    });

    reviewRef
      .set(
        {
          reviews: reviewData.reviews,
        },

        { merge: true }
      )
      .catch((error) => {
        console.log(
          "Something went wrong with added user to firestore: ",
          error
        );
      });
  } catch (error) {
    console.log("sendReview error", error);
  }
};
