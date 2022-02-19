import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

const VestingPage = (props) => {
  const rows = props.vesting.claimData;
  const vestingPage = props.vesting.vestingPage;
  let claimInformation = "Next claim for";

  const checkClaimDate = () => {
    const actualDate = new Date();
    for (let i = 0; i < rows.length; i++) {
      const date = new Date(rows[i].date);
      if (actualDate < date) {
        if (rows[i].type === "vesting end") {
          claimInformation = "Vesting ends for";
        }
        const claim = Math.round(
          Math.abs(actualDate - date) / (24 * 60 * 60 * 1000)
        );
        return claim;
      }
    }
  };
  const claimData = checkClaimDate();
  return (
    <>
      <Dialog
        onClose={props.onClose}
        open={props.open}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableBody>
                {rows.map((row) => {
                  const date = new Date(row.date).toString().slice(3, 16);
                  return (
                    <TableRow key={row.date}>
                      <TableCell>{date}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Grid container justifyContent="center">
              <Typography variant="h5" component="h5">
                {claimInformation}
              </Typography>
            </Grid>
            <Grid container justifyContent="center">
              <Typography variant="body1" component="p" sx={{ margin: "10px" }}>
                {claimData} days
              </Typography>
            </Grid>
            <Grid container justifyContent="center">
              {vestingPage ? (
                <Link href={vestingPage} target="_blank">
                  <Button sx={{ my: 2 }} variant="contained">
                    Vesting page
                  </Button>
                </Link>
              ) : null}
            </Grid>
          </TableContainer>
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default VestingPage;
