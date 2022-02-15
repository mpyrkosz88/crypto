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
  Input,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
// import LanguageIcon from "@mui/icons-material/Language";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import TelegramIcon from "@mui/icons-material/Telegram";
// import AssessmentIcon from "@mui/icons-material/Assessment";

import { walletActions } from "./store/wallet-slice";

const WalletCard = (props) => {
  console.log(props);
  const {
    id,
    title,
    tokenName,
    chain,
    imageUrl,
    price,
    round,
    listingDate,
    vesting,
    tokenId,
    tokenHoldings,
  } = props.data;

  const dispatch = useDispatch();

  const [currentPrice, setCurrentPrice] = useState("");
  const [editTokens, setEditable] = useState(true);
  const [enteredTokens, setEnteredTokens] = useState(tokenHoldings || "0");

  const tokensHandler = (event) => {
    setEnteredTokens(event.target.value);
  };

  const removeFromWallet = () => {
    dispatch(walletActions.removeItemFromWallet({ id }));
  };

  const editHandler = () => {
    setEditable(!editTokens);
  };

  const addTokensToWallet = () => {
    dispatch(walletActions.addTokensToWallet({ id, enteredTokens }));
    editHandler();
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
            setCurrentPrice(data[tokenId].usd);
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
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Holdings:
            </Typography>
            {editTokens ? (
              <Typography
                variant="body1"
                component="p"
                sx={{
                  margin: "0 10px",
                  flexGrow: 1,
                }}
              >
                {enteredTokens}
              </Typography>
            ) : (
              <Input
                placeholder={enteredTokens}
                type="number"
                sx={{
                  flexGrow: 1,
                }}
                onChange={tokensHandler}
                value={enteredTokens}
              />
            )}
            {editTokens ? (
              <EditIcon onClick={editHandler} />
            ) : (
              <DoneIcon onClick={addTokensToWallet} />
            )}
          </Grid>
          <Box m={2}>
            <Typography variant="h5" align="center">
              Your current value
            </Typography>
            <Typography variant="h6" align="center">
              {currentPrice * enteredTokens} $
            </Typography>
          </Box>
          {/* <Grid container justifyContent="space-between">
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
          </Grid> */}
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-evenly">
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: "12px" }}
            >
              <Link
                href={vesting}
                target="_blank"
                color="inherit"
                underline="none"
              >
                Vesting
              </Link>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={removeFromWallet}
              style={{ marginBottom: "12px" }}
            >
              Remove from wallet
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default WalletCard;
