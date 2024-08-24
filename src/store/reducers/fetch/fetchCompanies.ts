
import { AppDispatch } from "../../store";
import { companiesSlice } from "../CompaniesSlice";


export function fetchCompanies(dispatch:AppDispatch) {
  const { fetchingCompanies } = companiesSlice.actions
  try {
    const response = localStorage.getItem('companies')    
    if (response !== null) {
      const payload = JSON.parse(response)  
      dispatch(fetchingCompanies(payload))
    } else {
      dispatch(fetchingCompanies([ ]))
    }
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error message:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}
}