import React, { useReducer, useState } from "react";
import Expense from "./Components/Expense";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./App.css";
import { initialState, reducerFunction } from "./GlobalState/Reducer";
import CustomModel from "./Components/Model";
function App() {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(5000);
  const [expense, setExpense] = useState(0);
  return (
    <SnackbarProvider>
      <Expense
        state={state}
        dispatch={dispatch}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        balance={balance}
        setBalance={setBalance}
        expense={expense}
        setExpense={setExpense}
      />
      <CustomModel
        state={state}
        dispatch={dispatch}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        balance={balance}
        setBalance={setBalance}
        expense={expense}
        setExpense={setExpense}
      />
    </SnackbarProvider>
  );
}

export default App;
