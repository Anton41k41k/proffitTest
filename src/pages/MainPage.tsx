import { CompanyItem } from "../components/CompanyItem";
import { List } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { fetchCompanies } from "../store/reducers/fetch/fetchCompanies";
import { useAppDispatch } from "../hooks/redux";

export function MainPage() {
  const companies = useSelector((state: RootState) => state.companies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompanies);
  }, [dispatch]);

  return (
    <List sx={{ marginTop: 2 }}>
      {companies.map((company) => (
        <CompanyItem key={company.id} {...company} />
      ))}
    </List>
  );
}
