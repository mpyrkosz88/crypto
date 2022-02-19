import { useDispatch } from "react-redux";
import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Typography,
  Grid,
  Link,
  IconButton,
} from "@mui/material";

import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { walletActions } from "./store/wallet-slice";
import { useSelector } from "react-redux";

import VestingPage from "./VestingPage";
const CryptoCard = (props) => {
  const {
    id,
    title,
    tokenName,
    chain,
    imageUrl,
    price,
    round,
    listingDate,
    webPage,
    twitterPage,
    telegram,
    chart,
    tokenId,
    vesting,
  } = props.data;

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const [currentPrice, setCurrentPrice] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addToWallet = () => {
    dispatch(walletActions.addItemToWallet(props.data));
  };

  const removeFromWallet = () => {
    dispatch(walletActions.removeItemFromWallet({ id }));
  };

  const checkPrice = () => {
    let url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}%2C&vs_currencies=usd%2C`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            if (tokenId) {
              setCurrentPrice(data[tokenId].usd);
            }
          });
        } else {
          return response.json().then((data) => {
            console.log(data.error.message);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkPrice();
  }, []);

  let walletButton;

  if (props.inWallet) {
    walletButton = (
      <Button
        variant="contained"
        color="secondary"
        onClick={removeFromWallet}
        style={{ marginBottom: "12px" }}
      >
        Remove from wallet
      </Button>
    );
  } else {
    walletButton = (
      <Button
        variant="contained"
        color="primary"
        onClick={addToWallet}
        style={{ marginBottom: "12px" }}
      >
        Add to wallet
      </Button>
    );
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          avatar={<Avatar src={imageUrl} />}
          action={
            <IconButton aria-label="settings">
              <StarBorderOutlinedIcon />
            </IconButton>
          }
          title={title}
          subheader={tokenName}
        />
        <CardContent>
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Round:
            </Typography>
            <Typography variant="body1" component="p" sx={{ margin: "0 10px" }}>
              {round}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Round price:
            </Typography>
            <Typography variant="body1" component="p" sx={{ margin: "0 10px" }}>
              {price}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Chain:
            </Typography>
            <Typography variant="body1" component="p" sx={{ margin: "0 10px" }}>
              {chain}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Listing date:
            </Typography>
            <Typography variant="body1" component="p" sx={{ margin: "0 10px" }}>
              {listingDate}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Current price:
            </Typography>
            <Typography variant="body1" component="p" sx={{ margin: "0 10px" }}>
              {currentPrice} $
            </Typography>
          </Grid>
          <Box m={2}>
            <Typography variant="h5" align="center">
              Links
            </Typography>
          </Box>
          <Grid container justifyContent="space-between">
            <Link href={webPage} target="_blank">
              <LanguageIcon />
            </Link>
            <Link href={twitterPage} target="_blank">
              <TwitterIcon />
            </Link>
            <Link href={telegram} target="_blank">
              <TelegramIcon />
            </Link>
            <Link href={chart} target="_blank">
              <AssessmentIcon />
            </Link>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-evenly">
            {vesting ? (
              <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: "12px" }}
                onClick={handleClickOpen}
              >
                Vesting
              </Button>
            ) : null}
            {isAuth ? walletButton : null}
          </Grid>
          {vesting ? (
            <VestingPage open={open} onClose={handleClose} vesting={vesting} />
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CryptoCard;
