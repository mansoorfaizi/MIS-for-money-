import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { updateObject } from "../../../api/Api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

const EditPerson = () => {
  const personStorage = JSON.parse(localStorage.getItem("person"));
  const auth = useAuth();
  const token = auth?.user?.token;

  const navigate = useNavigate();

  const [name, setName] = useState(personStorage.name);
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
      editPerson.mutate(formData);
    }
  };

  const editPerson = useMutation(
    (data) => updateObject("persons", data, personStorage.id, token),
    {
      onSuccess: () => {
        enqueueSnackbar("Successfully updated", {
          variant: "success",
        });
        navigate(-1);
      },
    }
  );
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
            Edit Person
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
              {editPerson.isLoading ? (
                <CircularProgress />
              ) : (
                <Button variant="contained" color="info" type="submit">
                  Update
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditPerson;
