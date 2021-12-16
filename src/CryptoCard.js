import { useDispatch } from "react-redux";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";

import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import LanguageIcon from "@material-ui/icons/Language";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
import AssessmentIcon from "@material-ui/icons/Assessment";

import { walletActions } from "./store/wallet-slice";
import { productsActions } from "./store/products-slice";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  spacing: {
    margin: "0 10px",
  },
});

const CryptoCard = (props) => {
  const classes = useStyles();
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
    vesting,
    inWallet,
  } = props.item;

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const addToWallet = () => {
    dispatch(productsActions.addItemToWallet({ id }));
    dispatch(
      walletActions.addItemToWallet({
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
        vesting,
        inWallet: true,
      })
    );
  };

  const removeFromWallet = () => {
    dispatch(productsActions.removeItemFromWallet({ id }));
    dispatch(walletActions.removeItemFromWallet({ id }));
  };

  let walletButton;

  if (!inWallet) {
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
  } else {
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
            <Typography
              variant="body1"
              component="p"
              className={classes.spacing}
            >
              {round}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Round price:
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.spacing}
            >
              {price}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Chain:
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.spacing}
            >
              {chain}
            </Typography>
          </Grid>
          <Grid container alignItems="center">
            <Typography variant="h6" component="h6">
              Listing date:
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={classes.spacing}
            >
              {listingDate}
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
            {isAuth ? walletButton : null}
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CryptoCard;
