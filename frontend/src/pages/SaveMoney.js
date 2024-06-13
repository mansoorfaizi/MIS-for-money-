import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addObject, getObjects } from "../api/Api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [personDate, setPersonData] = useState([]);
  const { data, isSuccess } = useQuery(["persons"], () =>
    getObjects("persons/")
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

    if (isValid) {
      let formData = new FormData();
      formData.append("amount", amount);
      formData.append("type", transactionType);
      formData.append("person", person);
      formData.append("month", month);
      formData.append("description", description);
      AddMoney.mutate(formData);
    }
  };

  const AddMoney = useMutation((data) => addObject("payments", data), {
    onSuccess: () => {
      enqueueSnackbar("Successfully Added", {
        variant: "success",
      });
      navigate("/home/dashboard/");
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
              <Button variant="contained" color="info" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SaveMoney;
