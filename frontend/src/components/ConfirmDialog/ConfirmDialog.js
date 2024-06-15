import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        <NotListedLocationIcon fontSize="large" />
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography>{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="info"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={confirmDialog.onConfirm}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
