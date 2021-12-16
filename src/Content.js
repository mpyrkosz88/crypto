import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import React from "react";
import { Grid } from "@material-ui/core";
import CryptoCard from "./CryptoCard";

import { fetchProductData } from "./store/products-actions";

const Content = () => {
  const dispatch = useDispatch();
  const productItems = useSelector((state) => {
    return state.products.items;
  });
  const isInitial = useSelector((state) => {
    return state.products.isInitial;
  });

  useEffect(() => {
    if (isInitial) {
      dispatch(fetchProductData());
    }
  }, [dispatch, isInitial]);

  return (
    <Grid item container>
      <Grid item xs={false} sm={1} md={2}></Grid>
      <Grid item xs={12} sm={10} md={8} container spacing={4}>
        {productItems.map((item) => {
          return <CryptoCard key={item.id} item={item} />;
        })}
      </Grid>
      <Grid item xs={false} sm={1} md={2}></Grid>
    </Grid>
  );
};

export default Content;
