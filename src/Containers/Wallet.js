import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import React from "react";
import { Grid } from "@mui/material";
import WalletCard from "../WalletCard";

import { fetchWalletData } from "../store/wallet-actions";
import { sendWalletData } from "../store/wallet-actions";

const Wallet = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((state) => {
    return state.wallet;
  });
  // const enteredFilter = useSelector((state) => {
  //   return state.products.enteredFilter;
  // });
  // const products = productItems.filter((item) =>
  //   item.title.toLowerCase().includes(enteredFilter)
  // );

  useEffect(() => {
    dispatch(fetchWalletData());
  }, [dispatch]);

  useEffect(() => {
    if (wallet.changed) {
      dispatch(sendWalletData(wallet.items));
    }
  }, [wallet, dispatch]);

  return (
    <Grid item container>
      <Grid item xs={false} sm={1} md={2}></Grid>
      <Grid item xs={12} sm={10} md={8} container spacing={4}>
        {wallet.items.map((data) => {
          return <WalletCard key={data.id} data={data} />;
        })}
      </Grid>
      <Grid item xs={false} sm={1} md={2}></Grid>
    </Grid>
  );
};

export default Wallet;
