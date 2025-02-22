import React, { useReducer } from 'react';
import SalaryContext from './SalaryContext';

const initialState = {
  basicSalary: 0,
  earnings: [],
  deductions: [],
};

const salaryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BASIC_SALARY':
      return { ...state, basicSalary: action.payload };
    case 'ADD_EARNING':
      return { ...state, earnings: [...state.earnings, action.payload] };
    case 'REMOVE_EARNING':
      return { ...state, earnings: state.earnings.filter((_, index) => index !== action.payload) };
    case 'UPDATE_EARNING':
      return {
        ...state,
        earnings: state.earnings.map((earning, index) =>
          index === action.payload.index ? action.payload.earning : earning
        ),
      };
    case 'ADD_DEDUCTION':
      return { ...state, deductions: [...state.deductions, action.payload] };
    case 'REMOVE_DEDUCTION':
      return { ...state, deductions: state.deductions.filter((_, index) => index !== action.payload) };
    case 'UPDATE_DEDUCTION':
      return {
        ...state,
        deductions: state.deductions.map((deduction, index) =>
          index === action.payload.index ? action.payload.deduction : deduction
        ),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const SalaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(salaryReducer, initialState);

  return (
    <SalaryContext.Provider value={{ state, dispatch }}>
      {children}
    </SalaryContext.Provider>
  );
};

export default SalaryProvider;
