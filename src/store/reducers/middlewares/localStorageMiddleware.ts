import {  Middleware } from '@reduxjs/toolkit';
import { Company, Worker } from '../../../types';


const localStorageMiddleware: Middleware = storeAPI => next => action => {
  const result = next(action); 
  const state = storeAPI.getState();
  const clearedWorkers = state.workers.filter((worker: Worker) => state.companies.some((company: Company) => worker.companyId === company.id))
  
  
    switch (action.type) {
      case "companies/addCompany":
        localStorage.setItem('companies', JSON.stringify(state.companies));
        break;
      case "companies/deleteCompany":
        localStorage.setItem('workers', JSON.stringify(clearedWorkers));
        localStorage.setItem('companies', JSON.stringify(state.companies));
        break;
      case "companies/changeCompany":
        localStorage.setItem('companies', JSON.stringify(state.companies));
        break;
      case "workers/addWorker":
        localStorage.setItem('workers', JSON.stringify(state.workers));
        break;
      case "workers/deleteWorker":
        localStorage.setItem('workers', JSON.stringify(state.workers));
        break;
      case "workers/changeWorker":
        localStorage.setItem('workers', JSON.stringify(state.workers));
        break;
      default:
        break;
    }

  return result; 
};

export default localStorageMiddleware