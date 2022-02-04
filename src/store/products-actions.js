import { productsActions } from "./products-slice";

export const fetchProductData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://crypto-vesting-default-rtdb.europe-west1.firebasedatabase.app/products.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch products data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const productsData = await fetchData();
      dispatch(
        productsActions.loadProducts({
          items: productsData || [],
        })
      );
    } catch (error) {
      console.log(error);
      // dispatch(
      //   productsActions.showNotification({
      //     status: "error",
      //     title: "Error...",
      //     message: "fetching cart data failed!",
      //   })
      // );
      return error;
    }
  };
};
