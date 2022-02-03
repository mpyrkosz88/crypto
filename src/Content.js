import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import React from "react";
import { Grid } from "@mui/material";
import CryptoCard from "./CryptoCard";

import { fetchProductData } from "./store/products-actions";

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

  useEffect(() => {
    // checkPrice();
    if (isInitial) {
      dispatch(fetchProductData());
    }
  }, [dispatch, isInitial]);

  // const checkPrice = () => {
  //   const tokenId = "onering";
  //   let url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}%2C&vs_currencies=usd%2C`;
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   fetch(url, requestOptions)
  //     .then((response) => {
  //       if (response.ok) {
  //         const tokenId = "onering";
  //         return response.json().then((data) => console.log(data[tokenId].usd));
  //       } else {
  //         return response.json().then((data) => {
  //           console.log(data.error.message);
  //         });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

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
          return <CryptoCard key={data.id} data={data} />;
        })}
      </Grid>
      <Grid item xs={false} sm={1} md={2}></Grid>
    </Grid>
  );
};

export default Content;
