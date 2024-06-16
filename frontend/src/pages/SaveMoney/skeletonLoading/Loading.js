import React from "react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const Loading = () => {
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
          marginBottom: 2,
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Person</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>date</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(10)).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Loading;
