import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../../types";

const initialState: Company[] = [];

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
      addCompany(state, action: PayloadAction<Company>){
        state.push(action.payload)
      },
      deleteCompany(state, action: PayloadAction<number>){
        return state.filter(company => company.id !== action.payload)
      },
      changeCompany(state, action: PayloadAction<Company>){
        return state.map(company => company.id === action.payload.id ? {...action.payload} : company)
      },
      fetchingCompanies(_state, action: PayloadAction<Company[]>){
        return action.payload
      }
    

  }
})

export default companiesSlice.reducer;