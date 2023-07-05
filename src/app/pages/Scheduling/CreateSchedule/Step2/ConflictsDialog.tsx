import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface IConflictsDialogProps {
  open: boolean;
  onForceSave: () => void;
  onModify: () => void;
  conflictMessage: string;
}

export default function ConflictsDialog({
  open,
  onForceSave,
  onModify,
  conflictMessage,
}: IConflictsDialogProps) {
  return (
    <Dialog
      fullWidth
      sx={{ py: 4 }}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontSize: "1.3rem" }}>
        {"Error occurred while scheduling exams"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "1.2rem" }}
        >
          {conflictMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ gap: 1, p: 2 }}>
        <Button
          onClick={onForceSave}
          sx={{ borderRadius: 3 }}
          variant="outlined"
          color="error"
        >
          Force Save
        </Button>
        <Button
          onClick={onModify}
          autoFocus
          variant="contained"
          sx={{ borderRadius: 3 }}
        >
          Modify Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}
