import * as firebase from "firebase";
import "firebase/firestore";

import { getTagsData, getData, getBrandsData } from "../API/index";

const SET_APP_SALE_PRODUCTS = "SET_APP_SALE_PRODUCTS";
const SET_APP_NEW_PRODUCTS = "SET_APP_NEW_PRODUCTS";
const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT";

const SET_APP_PRODUCTS = "SET_APP_PRODUCTS";
const SET_BRAND_DATA = "SET_BRAND_DATA";
const TOGGLE_MODAL = "TOGGLE_MODAL";

//*********** */
export const MODULE_NAME = "products";
export const selectSaleProductData = (state) => state[MODULE_NAME].saleProducts;
export const selectNewProductData = (state) => state[MODULE_NAME].newProducts;

export const selectShoppingBagProducts = (state) =>
  state[MODULE_NAME].shoppingBag;
export const selectAllProductData = (state) => state[MODULE_NAME];
export const selectCategory = (state, category) =>
  state[MODULE_NAME].allProducts[category];
export const selectCurrentProduct = (state) =>
  state[MODULE_NAME].currentProduct;
export const selectBrandData = (state) => state[MODULE_NAME].brandData;
export const selectCurrentProductRating = (state) =>
  state[MODULE_NAME].currentProduct.rating;
export const selectIsModalOpen = (state) => state[MODULE_NAME].isModalOpen;

const initialState = {
  saleProducts: [],
  newProducts: [],

  allProducts: [],
  currentProduct: [],
  brandData: [],
  isModalOpen: true,
};

//REDUCER */

export function productsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_APP_NEW_PRODUCTS:
      return {
        ...state,
        newProducts: payload,
      };
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: payload,
      };
    case SET_BRAND_DATA:
      return {
        ...state,
        brandData: payload,
      };

    case SET_APP_SALE_PRODUCTS:
      return {
        ...state,
        saleProducts: payload,
      };

    case SET_APP_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: payload,
      };

    default:
      return state;
  }
}
//ACTIONS
//*************************** */
export const setAppSaleProducts = (payload) => ({
  type: SET_APP_SALE_PRODUCTS,
  payload,
});

export const setAppNewProducts = (payload) => ({
  type: SET_APP_NEW_PRODUCTS,
  payload,
});

export const setBrandData = (payload) => ({
  type: SET_BRAND_DATA,
  payload,
});

export const setAppProducts = (payload) => ({
  type: SET_APP_PRODUCTS,
  payload,
});
export const setCurrentProduct = (payload) => ({
  type: SET_CURRENT_PRODUCT,
  payload,
});
export const toggleModal = (payload) => ({
  type: TOGGLE_MODAL,
  payload,
});

//FONCTIONS

export const getNewData = (isNew) => async (dispatch) => {
  try {
    const newProducts = await getTagsData(isNew);

    dispatch(setAppNewProducts(newProducts));
  } catch (error) {
    console.log("getNewData", error);
  }
};

export const getOnSaleProducts = (sale) => async (dispatch) => {
  try {
    const saleData = await getTagsData(sale);

    dispatch(setAppSaleProducts(saleData));
  } catch (error) {
    console.log("getOnSaleProducts", error);
  }
};

export const getAllData = (category) => async (dispatch) => {
  try {
    const allProducts = await getData(category);
    dispatch(setAppProducts(allProducts));
  } catch (error) {
    console.log("getAllData2", error);
  }
};

export const getCurrentProduct = (productID) => async (dispatch) => {
  try {
    firebase
      .firestore()
      .collection("products")
      .doc(productID)
      .onSnapshot(function (doc) {
        dispatch(setCurrentProduct(doc.data()));
      });
  } catch (e) {
    console.log("getCurrentProduct error", e);
  }
};
