import { useSelector } from "react-redux";

import React from "react";
import { Grid } from "@mui/material";
import WalletCard from "./WalletCard";
// import data from "./data";

const Wallet = () => {
  let walletItems = [];
  walletItems = useSelector((state) => {
    return state.wallet.items;
  });

  return (
    <Grid item container>
      <Grid item xs={false} sm={1} md={2}></Grid>
      <Grid item xs={12} sm={10} md={8} container spacing={4}>
        {walletItems.map((data) => {
          console.log(data);
          return <WalletCard key={data.id} data={data} />;
        })}
      </Grid>
      <Grid item xs={false} sm={1} md={2}></Grid>
    </Grid>
  );
};

export default Wallet;
