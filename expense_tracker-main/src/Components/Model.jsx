import React, { useEffect, useReducer, useState } from "react";
import Model from "react-modal";
import "../styles/model.css";
import { useSnackbar } from "notistack";
import {
  addExpense,
  editExpense,
  initialState,
  reducerFunction,
} from "../GlobalState/Reducer";
import Expense from "./Expense";
function CustomModel({
  state,
  dispatch,
  isOpen,
  setIsOpen,
  balance,
  setBalance,
  setExpense,
  expense,
  isAddExpense,
  expenseData = { title: "", price: "", category: "DEFAULT", date: "" },
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    title: "",
    price: "",
    category: "DEFAULT",
    date: "",
  });
  useEffect(() => {
    if (!isAddExpense) {
      setData({ ...expenseData });
    }
  }, [isOpen]);
  return (
    <Model
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          backgroundColor: "#EFEFEFD9",
          height: "max-content",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "max-content",
        },
      }}
    >
      <div className="modelContainer">
        {isAddExpense == true || isAddExpense == undefined ? (
          <h1>Add Expenses</h1>
        ) : (
          <h1>Edit Expense</h1>
        )}

        <div className="inputContainerOne">
          <input
            type="text"
            value={data.title}
            placeholder="Title"
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            type="text"
            value={data.price}
            placeholder="Price"
            onChange={(e) =>
              setData((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>
        <div className="inputContainerTwo">
          <select
            name=""
            id=""
            value={data.category}
            onChange={(e) =>
              setData((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="DEFAULT">Select Category</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
          </select>
          <input
            type="date"
            value={data.date}
            onChange={(e) =>
              setData((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </div>
        <div className="buttonContainer">
          <button
            onClick={() => {
              if (isAddExpense || isAddExpense == undefined) {
                addExpense(
                  data.category,
                  data,
                  dispatch,
                  state,
                  enqueueSnackbar,
                  setData,
                  setIsOpen,
                  balance,
                  setBalance,
                  expense,
                  setExpense
                );
              } else {
                editExpense(
                  data.category,
                  data,
                  dispatch,
                  state,
                  enqueueSnackbar,
                  setData,
                  setIsOpen,
                  balance,
                  setBalance,
                  expense,
                  setExpense,
                  expenseData
                );
              }
            }}
          >
            {isAddExpense == true || isAddExpense == undefined
              ? "Add Expenses"
              : "Edit Expenses"}
          </button>
          <button
            onClick={() => {
              setIsOpen((prev) => !prev);
              setData((prev) => ({
                title: "",
                price: "",
                category: "DEFAULT",
                date: "",
              }));
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Model>
  );
}

export default CustomModel;
