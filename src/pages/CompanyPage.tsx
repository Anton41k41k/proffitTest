import { useLocation } from "react-router-dom";
import { List } from "@mui/material";
import WorkersItem from "../components/WorkersItem";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/redux";
import { useEffect } from "react";
import { fetchWorkers } from "../store/reducers/fetch/fetchWorkers";

export default function CompanyPage() {
  const location = useLocation();
  const companyId: number = location.state.companyId;
  const workers = useSelector((state: RootState) => state.workers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkers);
  }, [dispatch]);

  const filteredWorkers = workers.filter(
    (worker) => worker.companyId === companyId
  );

  return (
    <List sx={{ marginTop: 2 }}>
      {filteredWorkers.map((worker) => (
        <WorkersItem key={worker.id} {...worker} />
      ))}
    </List>
  );
}
