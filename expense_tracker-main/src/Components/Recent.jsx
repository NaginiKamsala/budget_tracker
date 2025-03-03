import React, { useMemo, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { convertDate, handleDelete, handleEdit } from "../GlobalState/Reducer";
import CustomModel from "./Model";
import { IoGiftSharp, IoPizzaOutline } from "react-icons/io5";
import { CiRollingSuitcase } from "react-icons/ci";
import "../styles/recent.css";
function Recent({
  totalElementsList,
  count,
  state,
  dispatch,
  setBalance,
  balance,
  setExpense,
  expense,
}) {
  const icons = {
    food: <IoPizzaOutline size={"1.5em"} />,
    entertainment: <IoGiftSharp size={"1.5em"} />,
    travel: <CiRollingSuitcase size={"1.5em"} />,
  };
  const [isOpen, setIsOpen] = useState(false);
  return totalElementsList.map(
    (ele, ind) =>
      ind < count &&
      ind > count - 4 * 1 && (
        <>
          <div key={`Element ${ind}`} className="recentMainContainer">
            <div className="recentSubOne">
              <div className="iconWrapperOne">{icons[ele.category]}</div>
              <div className="recentSubOneText">
                <p>{ele.title}</p>
                <p>{convertDate(ele.date)}</p>
              </div>
            </div>
            <div className="recentSubTwo">
              <p>₹{ele.price}</p>
              <div className="iconWrapper">
                <div className="deleteIconDiv">
                  <RxCrossCircled
                    onClick={() =>
                      handleDelete(
                        ele,
                        state,
                        dispatch,
                        setBalance,
                        balance,
                        setExpense,
                        expense
                      )
                    }
                  />
                </div>
                <div className="editIconDiv">
                  <MdOutlineEdit
                    onClick={() => {
                      handleEdit(
                        state,
                        dispatch,
                        isOpen,
                        setIsOpen,
                        balance,
                        setBalance,
                        setExpense,
                        expense
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <CustomModel
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setBalance={setBalance}
            setExpense={setExpense}
            expense={expense}
            balance={balance}
            state={state}
            dispatch={dispatch}
            isAddExpense={false}
            expenseData={ele}
          />
        </>
      )
  );
}

export default Recent;
