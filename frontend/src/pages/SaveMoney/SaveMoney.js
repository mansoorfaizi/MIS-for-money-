import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Loading from "./skeletonLoading/Loading";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { enqueueSnackbar } from "notistack";

const SaveMoney = () => {
  const auth = useAuth();
  const token = auth?.user?.token;
  const navigate = useNavigate();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

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

  const deleteMoney = useMutation((id) => deleteObject("persons", id, token), {
    onSuccess: () => {
      enqueueSnackbar("Successfully Deleted", { variant: "success" });
      refetch();
    },
    onError: () => {
      enqueueSnackbar("con't delete this item", {
        variant: "error",
      });
    },
  });

  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ["save-money"],
    () => {
      return getGeneralObject("payments/", token);
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
            All Transaction
          </Typography>
          <Link to={"/save-money/add/"}>
            <Button variant="contained" color="info">
              New
            </Button>
          </Link>
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
                <TableCell>date</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.person}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.date}</TableCell>
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
                              handleDelete(person.id);
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
