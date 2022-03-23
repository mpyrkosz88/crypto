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
  IconButton,
  Input,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

import VestingPage from "./VestingPage";
import { walletActions } from "./store/wallet-slice";
import { checkCurrentPrice } from "./store/products-actions";

const WalletCard = (props) => {
  const {
    id,
    title,
    tokenName,
    chain,
    imageUrl,
    price,
    round,
    listingDate,
    tokenId,
    tokenHoldings,
    vesting,
  } = props.data;

  const dispatch = useDispatch();

  const [currentPrice, setCurrentPrice] = useState("");
  const [editTokens, setEditable] = useState(true);
  const [enteredTokens, setEnteredTokens] = useState(tokenHoldings || "0");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    checkCurrentPrice(tokenId).then((response) => {
      if (response.ok) {
        setCurrentPrice(response.price);
      }
    });
  });

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
              <IconButton onClick={editHandler}>
                <EditIcon />
              </IconButton>
            ) : (
              <IconButton onClick={addTokensToWallet}>
                <DoneIcon />
              </IconButton>
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
            <Button
              variant="contained"
              color="secondary"
              onClick={removeFromWallet}
              style={{ marginBottom: "12px" }}
            >
              Remove from wallet
            </Button>
          </Grid>
          {vesting ? (
            <VestingPage open={open} onClose={handleClose} vesting={vesting} />
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default WalletCard;
