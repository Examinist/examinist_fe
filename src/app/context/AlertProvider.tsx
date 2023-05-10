import React from 'react'
import UpdateAlert, { IAlertState } from '../components/UpdateAlert/UpdateAlert';

interface IAlertContext{
  setAlertState: React.Dispatch<React.SetStateAction<IAlertState>>;
}

export const AlertContext = React.createContext<IAlertContext>(null!);
export default function AlertProvider({children}: {children: React.ReactNode}) {
  const [alertState, setAlertState] = React.useState<IAlertState>({
    open: false,
    message: "",
    severity: "info",
  });

  const value = {setAlertState};
  return (
    <AlertContext.Provider value={value}>
      {children}
      <UpdateAlert alertState={alertState} setAlertState={setAlertState} />
    </AlertContext.Provider>
  )
}
