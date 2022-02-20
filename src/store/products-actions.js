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

export const checkCurrentPrice = (tokenId) => {
  return async () => {
    const fetchData = async () => {
      let url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}%2C&vs_currencies=usd%2C`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Could not fetch products data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const priceData = await fetchData();
      if (tokenId) {
        const price = priceData[tokenId].usd;
        return { ok: true, price: price };
      }
      return { ok: false };
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
