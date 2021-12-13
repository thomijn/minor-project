import { createContext } from "react";

export const UserContext = createContext({
  user: null,
  firstname: null,
  lastname: null,
  Iam: null,
  iCare: null,
  hoursWeek: null,
  dateAlzheimer: null,
  whoAmI: null,
});
