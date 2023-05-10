import { createContext } from "react";

export interface IExamsReloadContext {
  reloadExams: () => void;
}

export const ExamsReloadContext = createContext<IExamsReloadContext>({
  reloadExams: () => {},
});
