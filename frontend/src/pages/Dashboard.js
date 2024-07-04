import React from "react";
import { Alert, Grid, Paper, Skeleton, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PaymentIcon from "@mui/icons-material/Payment";
import EuroIcon from "@mui/icons-material/Euro";
import { useQuery } from "@tanstack/react-query";
import { getGeneralObject } from "../api/Api";
import { useAuth } from "../AuthContext";

const Dashboard = () => {
  const auth = useAuth();
  const token = auth?.user?.token;
  const { data, isLoading, isError, isSuccess, error } = useQuery(
    ["reports"],
    () => {
      return getGeneralObject("reports/", token);
    }
  );

  if (isError) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[...Array(3)].map((_, index) => (
          <Grid key={index} item xl={4} lg={4} md={4} sm={6} xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: 240,
                borderRadius: "20px",
              }}
            >
              <Skeleton variant="rectangular" width="50px" height="50px" />
              <Skeleton />
              <Skeleton />
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
  if (isSuccess) {
    return (
      <Grid container spacing={3}>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <PaymentIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total receive Afg money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ؋ {data.totalMoneyInAfg}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <PaidIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total gone Afg money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ؋ {data.totalMoneyOutAfg}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <CreditScoreIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total available Afg money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ؋ {data.totalMoneyAvailableAfg}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <PaymentIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total receive USD money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              $ {data.totalMoneyInUsd}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <PaidIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total gone USD money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              $ {data.totalMoneyOutUsd}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <CreditScoreIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total available USD money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              $ {data.totalMoneyAvailableUsd}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <PaymentIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total receive Euro money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              € {data.totalMoneyInEru}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <EuroIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total gone Euro money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              € {data.totalMoneyOutEru}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 240,
              borderRadius: "20px",
            }}
          >
            <CreditScoreIcon sx={{ fontSize: "50px" }} />
            <Typography variant="h6" fontWeight="bold">
              Total available Euro money
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              € {data.totalMoneyAvailableEru}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
};

export default Dashboard;
