import React from "react";
import { useEffect, useReducer, useState } from "react";
import Model from "react-modal";
import "../styles/balanceModel.css";
import { handleAddBalance } from "../GlobalState/Reducer";
import { useSnackbar } from "notistack";
function BalanceModel({ isOpen, setIsOpen, setBalance, balance }) {
  const [val, setVal] = useState("");
  const { enqueueSnackbar } = useSnackbar();
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
      <div className="balanceModelContainer">
        <h1>Add Balance</h1>
        <div className="balanceModelWrapper">
          <input
            type="text"
            placeholder="Income Amount"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button
            onClick={() =>
              handleAddBalance(
                balance,
                val,
                setBalance,
                enqueueSnackbar,
                setIsOpen
              )
            }
          >
            Add Balance
          </button>
          <button onClick={() => setIsOpen((prev) => !prev)}>Cancel</button>
        </div>
      </div>
    </Model>
  );
}

export default BalanceModel;
