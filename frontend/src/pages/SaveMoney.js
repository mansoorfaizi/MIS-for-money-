import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addObject, getGeneralObject } from "../api/Api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Month = [
  { id: 1, value: "January" },
  { id: 2, value: "February" },
  { id: 3, value: "March" },
  { id: 4, value: "April" },
  { id: 5, value: "May" },
  { id: 6, value: "Jun" },
  { id: 7, value: "July" },
  { id: 8, value: "August" },
  { id: 9, value: "September" },
  { id: 10, value: "October" },
  { id: 11, value: "November" },
  { id: 12, value: "December" },
];

const TransactionType = [
  { id: 1, value: "In" },
  { id: 2, value: "Out" },
];
const SaveMoney = () => {
  const auth = useAuth();
  const token = auth?.user?.token;

  const navigate = useNavigate();
  const [personDate, setPersonData] = useState([]);
  const { data, isSuccess } = useQuery(["persons"], () =>
    getGeneralObject("persons/", token)
  );
  useEffect(() => {
    if (isSuccess) {
      setPersonData(data);
    }
  }, [data, isSuccess]);

  const date = new Date();
  const currentMonth = date.getMonth() + 1;

  const [amount, setAmount] = useState(null);
  const [amountError, setAmountError] = useState("");

  const [transactionType, setTransactionType] = useState(1);
  const [transactionTypeError, setTransactionTypeError] = useState(null);

  const [person, setPerson] = useState(null);
  const [personError, setPersonError] = useState("");

  const [month, setMonth] = useState(currentMonth);
  const [monthError, setMonthError] = useState("");

  const [description, setDescription] = useState("");

  const [currency, setCurrency] = useState(null);
  const [currencyError, setCurrencyError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    if (!amount) {
      setAmountError("Amount is required");
      isValid = false;
    } else {
      setAmountError("");
      isValid = true;
    }

    if (!transactionType) {
      setTransactionTypeError("transaction type is required");
      isValid = false;
    } else {
      setTransactionTypeError("");
      isValid = true;
    }

    if (!person) {
      setPersonError("person is required");
      isValid = false;
    } else {
      setPersonError("");
      isValid = true;
    }

    if (!month) {
      setMonthError("please select the month is required");
      isValid = false;
    } else {
      setMonthError("");
      isValid = true;
    }

    if (!currency) {
      setCurrency("please choice the currency");
      isValid = false;
    } else {
      setCurrency("");
      isValid = true;
    }

    if (isValid) {
      let formData = new FormData();
      formData.append("amount", amount);
      formData.append("type", transactionType);
      formData.append("person", person);
      formData.append("month", month);
      formData.append("description", description);
      formData.append("currency", currency);
      AddMoney.mutate(formData);
    }
  };

  const AddMoney = useMutation((data) => addObject("payments", data, token), {
    onSuccess: () => {
      enqueueSnackbar("Successfully Added", {
        variant: "success",
      });
      navigate("/");
    },
  });
  return (
    <Grid container spacing={3}>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Paper
          sx={{
            height: 50,
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Save Money
          </Typography>
        </Paper>
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Paper
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            borderRadius: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                type="number"
                name="amount"
                placeholder="Enter the money amount"
                error={!!amountError}
                helperText={amountError}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                select
                fullWidth
                label="Transaction Type"
                name="transactionType"
                error={!!transactionTypeError}
                helperText={transactionTypeError}
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                {TransactionType.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                select
                fullWidth
                label="Person"
                name="person"
                error={!!personError}
                helperText={personError}
                value={person}
                onChange={(e) => setPerson(e.target.value)}
              >
                {personDate.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                select
                fullWidth
                label="Month"
                name="month"
                error={!!monthError}
                helperText={monthError}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {Month.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                select
                fullWidth
                label="Currency"
                error={!!currencyError}
                helperText={currencyError}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={1}>Afg</MenuItem>
                <MenuItem value={2}>USD</MenuItem>
                <MenuItem value={3}>ERU</MenuItem>
              </TextField>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                multiline
                rows={10}
                type="text"
                name="description"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              {AddMoney.isLoading ? (
                <CircularProgress />
              ) : (
                <Button variant="contained" color="info" type="submit">
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SaveMoney;
