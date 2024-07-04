import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { deleteObject, getGeneralObject } from "../../api/Api";
import { useAuth } from "../../AuthContext";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Loading from "./skeletonLoading/Loading";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { enqueueSnackbar } from "notistack";

const Month = [
  { id: 1, value: "January" },
  { id: 2, value: "February" },
  { id: 3, value: "March" },
  { id: 4, value: "April" },
  { id: 5, value: "May" },
  { id: 6, value: "June" },
  { id: 7, value: "July" },
  { id: 8, value: "August" },
  { id: 9, value: "September" },
  { id: 10, value: "October" },
  { id: 11, value: "November" },
  { id: 12, value: "December" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${day} ${month} ${year} at ${formattedHours}:${formattedMinutes} ${period}`;
};

const SaveMoney = () => {
  const auth = useAuth();
  const token = auth?.user?.token;
  const navigate = useNavigate();
  const [personData, setPersonData] = useState([]);
  const [filters, setFilters] = useState({});
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const Years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSearch = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const { data: getPersonData, isSuccess: personSuccess } = useQuery(
    ["person"],
    () => {
      return getGeneralObject("persons/", token);
    }
  );

  useEffect(() => {
    if (personSuccess) {
      setPersonData(getPersonData);
    }
  }, [getPersonData, personSuccess]);

  const handleEdit = (money) => {
    localStorage.setItem("money", JSON.stringify(money));
    navigate("/save-money/edit/");
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteMoney.mutate(id);
  };

  const deleteMoney = useMutation((id) => deleteObject("payments", id, token), {
    onSuccess: () => {
      enqueueSnackbar("Successfully Deleted", { variant: "success" });
      refetch();
    },
    onError: () => {
      enqueueSnackbar("Can't delete this item", { variant: "error" });
    },
  });

  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ["save-money"],
    () => {
      const params = new URLSearchParams(filters);
      return getGeneralObject(`payments/?${params.toString()}`, token);
    }
  );

  if (isError) {
    return <Typography color="error">Error loading data</Typography>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <Box>
        <Paper
          sx={{
            width: "100%",
            height: "80px",
            display: "flex",
            borderRadius: "20px",
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            All Transactions
          </Typography>
          <Link to={"/save-money/add/"}>
            <Button variant="contained" color="info">
              New
            </Button>
          </Link>
        </Paper>
        <Paper
          sx={{
            width: "100%",
            minHeight: "80px",
            borderRadius: "20px",
            p: 3,
            marginTop: 2,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <TextField
                select
                fullWidth
                label="Person"
                variant="outlined"
                name="person"
                onChange={handleSearch}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "14px",
                  },
                }}
              >
                {personData.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <TextField
                select
                fullWidth
                label="Month"
                variant="outlined"
                name="month"
                onChange={handleSearch}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "14px",
                  },
                }}
              >
                {Month.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <TextField
                select
                fullWidth
                label="Year"
                variant="outlined"
                name="year"
                onChange={handleSearch}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "14px",
                  },
                }}
              >
                {Years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <TextField
                select
                fullWidth
                label="Currency"
                variant="outlined"
                name="currency"
                onChange={handleSearch}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "46px",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "14px",
                  },
                }}
              >
                <MenuItem value={1}>Afg</MenuItem>
                <MenuItem value={2}>USD</MenuItem>
                <MenuItem value={3}>Euro</MenuItem>
              </TextField>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
              <Button
                variant="contained"
                color="info"
                onClick={() => refetch()}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Person</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.type_display}</TableCell>
                  <TableCell>{item.person_name}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.currency_display}</TableCell>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title:
                              "Are you sure you want to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              handleDelete(item.id);
                            },
                          });
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Box>
    );
  }

  return null;
};

export default SaveMoney;
