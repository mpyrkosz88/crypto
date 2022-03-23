import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import React from "react";
import { Grid } from "@mui/material";
import CryptoCard from "../CryptoCard";

import { fetchProductData } from "../store/products-actions";
import { sendWalletData } from "../store/wallet-actions";
import { fetchWalletData } from "../store/wallet-actions";

const Content = () => {
  const dispatch = useDispatch();
  const isInitial = useSelector((state) => {
    return state.products.isInitial;
  });
  const productItems = useSelector((state) => {
    return state.products.items;
  });
  const enteredFilter = useSelector((state) => {
    return state.products.enteredFilter;
  });
  const products = productItems.filter((item) =>
    item.title.toLowerCase().includes(enteredFilter)
  );
  const wallet = useSelector((state) => {
    return state.wallet;
  });
  const isAuth = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (wallet.changed) {
      dispatch(sendWalletData(wallet.items));
    }
  }, [wallet, dispatch]);

  useEffect(() => {
    if (isInitial) {
      if (isAuth) {
        fetchWalletData();
      }
      fetchProductData();
    }
  }, [isInitial, isAuth]);

  return (
    <Grid item container>
      <Grid item xs={false} sm={1} md={2}></Grid>
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        container
        rowSpacing={2}
        columnSpacing={2}
      >
        {products.map((data) => {
          const inWallet = wallet.items.find((item) => item.id === data.id);
          return (
            <CryptoCard
              key={data.id}
              data={data}
              inWallet={inWallet ? true : false}
            />
          );
        })}
      </Grid>
      <Grid item xs={false} sm={1} md={2}></Grid>
    </Grid>
  );
};

export default Content;
