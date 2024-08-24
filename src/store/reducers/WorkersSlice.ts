import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Worker } from "../../types";

const initialState: Worker[] = []

export const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
      addWorker(state, action: PayloadAction<Worker>){
        state.push(action.payload)
      },
      deleteWorker(state, action: PayloadAction<number>){
        return state.filter(worker => worker.id !== action.payload)
      },
      changeWorker(state, action: PayloadAction<Worker>){
        return state.map(worker => worker.id === action.payload.id ? {...action.payload} : worker)
      },
      fetchingWorkers(_state, action: PayloadAction<Worker[]>){
        return action.payload
      }

  }
})

export default workersSlice.reducer;