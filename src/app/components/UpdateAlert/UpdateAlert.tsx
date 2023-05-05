import { Alert, Snackbar } from '@mui/material';
import React from 'react'
export interface IAlertState {
    open: boolean;
    message?: string;
    severity?: "success" | "info" | "warning" | "error" | undefined;
}

interface IUpdateAlertProps {
    alertState: IAlertState;
    setAlertState: React.Dispatch<React.SetStateAction<IAlertState>>;
}
export default function UpdateAlert({ alertState, setAlertState }: IUpdateAlertProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={alertState.open}
      autoHideDuration={3000}
      onClose={() => setAlertState((a: any) => ({ ...a, open: false }))}
    >
      <Alert
        onClose={() => setAlertState((a: any) => ({ ...a, open: false }))}
        variant="filled"
        severity={alertState.severity || "info"}
        sx={{ width: "100%" }}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}
