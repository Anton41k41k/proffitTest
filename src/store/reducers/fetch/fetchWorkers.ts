
import { AppDispatch } from "../../store";
import { workersSlice } from "../WorkersSlice";


export function fetchWorkers(dispatch:AppDispatch) {
  const { fetchingWorkers } = workersSlice.actions
  try {
    const response = localStorage.getItem('workers')    
    if (response !== null) {
      const payload = JSON.parse(response)  
      dispatch(fetchingWorkers(payload))
    } else {
      dispatch(fetchingWorkers([ ]))
    }
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error message:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}
}