import { walletActions } from "./wallet-slice";
import store from "./index";
const dispatch = store.dispatch;

export const sendWalletData = (itemData) => {
  return async () => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("localId");
      let url =
        `https://crypto-vesting-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=` +
        token;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      };
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Could not fetch products data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const itemData = await fetchData();
      dispatch(walletActions.changeWalletStatus());
      return itemData;
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

export const fetchWalletData = async () => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("localId");
    let url =
      `https://crypto-vesting-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=` +
      token;
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
    const walletData = await fetchData();
    dispatch(walletActions.loadWallet(walletData || []));
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
