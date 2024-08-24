import { combineReducers, configureStore } from "@reduxjs/toolkit";
import companiesReducer from "./reducers/CompaniesSlice"
import workersReducer from "./reducers/WorkersSlice";
import localStorageMiddleware from "./reducers/middlewares/localStorageMiddleware";
const rootReducer = combineReducers({
  companies: companiesReducer,
  workers: workersReducer,
})


export const setupStore = () => configureStore({reducer: rootReducer, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),})



export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']