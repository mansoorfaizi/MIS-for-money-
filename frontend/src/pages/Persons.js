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

const Persons = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [nameError, setNameError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
      isValid = true;
    }

    if (isValid) {
      let formData = new FormData();
      formData.append("name", name);
      addPerson.mutate(formData);
    }
  };

  const addPerson = useMutation((data) => addObject("persons", data), {
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
            Add Person
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
                type="name"
                name="name"
                placeholder="Enter Person Name"
                error={!!nameError}
                helperText={nameError}
                value={name}
                onChange={(e) => setName(e.target.value)}
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

export default Persons;
