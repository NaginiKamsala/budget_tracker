const initialState = {
    food: [],
    entertainment: [],
    travel: []
}

const reducerFunction = (state, action) => {
    switch (action.type) {
        case 'food': {
            if (action.bool) {
                localStorage.setItem("data", JSON.stringify({
                    ...state,
                    food: [...state.food, action.payload]
                }));
            }
            return {
                ...state,
                food: [...state.food, action.payload]
            }
        }
        case 'entertainment': {
            if (action.bool) {
                localStorage.setItem("data", JSON.stringify({
                    ...state,
                    entertainment: [...state.entertainment, action.payload]
                }));
            }
            return {
                ...state,
                entertainment: [...state.entertainment, action.payload]
            }
        }
        case 'travel': {
            if (action.bool) {
                localStorage.setItem("data", JSON.stringify({
                    ...state,
                    travel: [...state.travel, action.payload]
                }));
            }
            return {
                ...state,
                travel: [...state.travel, action.payload]
            }
        }
        case 'deleteFood': {
            localStorage.setItem('data', JSON.stringify({
                ...state,
                food: [...action.payload]
            }))
            return {
                ...state,
                food: [...action.payload]
            }
        }
        case 'deleteTravel': {
            localStorage.setItem('data', JSON.stringify({
                ...state,
                travel: [...action.payload]
            }))
            return {
                ...state,
                travel: [...action.payload]
            }
        }
        case 'deleteEntertainment': {
            localStorage.setItem('data', JSON.stringify({
                ...state,
                entertainment: [...action.payload]
            }))
            return {
                ...state,
                entertainment: [...action.payload]
            }
        }
        default:
            return state;
    }
}

function addExpense(type, payload, dispatch, state, enqueueSnackbar, setData, setShow, balance, setBalance, expense, setExpense) {
    if (payload.title && parseInt(payload.price) && payload.category && payload.category != 'DEFAULT' && payload.date) {
        if (balance >= +expense + parseInt(payload.price)) {
            dispatch({
                type: type,
                payload: payload,
                bool: true
            })
            setData(prev => ({
                title: "",
                price: "",
                category: "DEFAULT",
                date: "",
            }))
            enqueueSnackbar("Expense added successfully", {
                autoHideDuration: 2000,
                variant: "success",
            })
            setShow(prev => !prev)
            setBalance(prev => prev - payload.price)
            localStorage.setItem('balance', balance - payload.price)
            setExpense(prev => prev + parseInt(payload.price))
        } else {
            enqueueSnackbar("Expense greater than balance", {
                autoHideDuration: 2000,
                variant: "error",
            })
        }

    } else if (!parseInt(payload.price)) {
        enqueueSnackbar("Price must be a number", {
            autoHideDuration: 2000,
            variant: "error",
        })
    } else {
        enqueueSnackbar("Please enter all details", {
            autoHideDuration: 2000,
            variant: "error",
        })
    }
}

function handleGetLocalStorage(setExpense, setBalance, balance, dispatch) {
    if (JSON.parse(localStorage.getItem("data"))) {
        let result = 0,
            arr = Object.values(JSON.parse(localStorage.getItem("data")));
        arr.forEach((i) => {
            if (i?.length > 0) {
                i.forEach((ele) => {
                    result += parseInt(ele.price)
                    dispatch({
                        type: ele.category,
                        payload: ele,
                        bool: false
                    })
                })
            }
        });
        setExpense(result);
        if (!localStorage.getItem('balance')) {
            setBalance(balance - result)
        } else {
            setBalance(localStorage.getItem('balance'))
        }
    }
}

function handleAddBalance(balance, value, setBalance, enqueueSnackbar, setIsOpen) {
    if (!parseInt(value)) {
        enqueueSnackbar("Please enter amount in numeric form", {
            autoHideDuration: 2000,
            variant: "error",
        })
    } else {
        setBalance(parseInt(balance) + parseInt(value))
        localStorage.setItem('balance', balance + parseInt(value))
        setIsOpen(prev => !prev)
    }
}

function handleDelete(ele, state, dispatch, setBalance, balance, setExpense, expense) {
    let result = [...state[ele.category]]
    let ind = result.findIndex(i => i.title === ele.title && i.date === ele.date && i.price === ele.price)
    let deletedItem = result.splice(ind, 1)
    switch (ele.category) {
        case 'food': {
            dispatch({
                type: 'deleteFood',
                payload: result
            })
            break
        }
        case 'travel': {
            dispatch({
                type: 'deleteTravel',
                payload: result
            })
            break;
        }
        case 'entertainment': {
            dispatch({
                type: 'deleteEntertainment',
                payload: result
            })
            break
        }
    }
    setBalance(+balance + parseInt(deletedItem[0].price))
    setExpense(+expense - parseInt(deletedItem[0].price))
    localStorage.setItem('balance', balance + parseInt(deletedItem[0].price))
}

function getTotalItemsLength(state) {
    let result = 0;
    Object.values(state).forEach(i => {
        if (i.length) {
            i.forEach(ele => {
                result += 1
            })
        }
    })
    return result
}

function getTotalItemsList(state) {
    let result = [];
    Object.values(state).forEach(i => {
        if (i.length) {
            i.forEach(ele => {
                result.push(ele)
            })
        }
    })
    return result
}

function handleDecrement(setCount) {
    setCount((prev) => {
        if (prev - 3 <= 0) {
            return prev;
        }
        return prev - 3;
    });

}

function handleIncrement(setCount, maxCount) {
    setCount((prev) => {
        if (prev >= Math.floor(maxCount)) {
            return prev;
        }
        return prev + 3;
    });
}

function handleEdit(state,
    dispatch,
    isOpen,
    setIsOpen,
    balance,
    setBalance,
    setExpense,
    expense, ) {
    setIsOpen(prev => !prev)
}

function editExpense(type,
    data,
    dispatch,
    state,
    enqueueSnackbar,
    setData,
    setIsOpen,
    balance,
    setBalance,
    expense,
    setExpense, expenseData) {
    let result = [...state[type]]
    let editIndex = result.findIndex(i => i.title === expenseData.title && i.date === expenseData.date && i.price === expenseData.price)
    result.splice(editIndex, 1, data)
    switch (type) {
        case 'food': {
            dispatch({
                type: 'deleteFood',
                payload: result
            })
            break
        }
        case 'travel': {
            dispatch({
                type: 'deleteTravel',
                payload: result
            })
            break;
        }
        case 'entertainment': {
            dispatch({
                type: 'deleteEntertainment',
                payload: result
            })
            break
        }
    }
    if (expenseData.price > data.price) {
        setBalance(+balance + (expenseData.price - data.price))
        localStorage.setItem('balance', +balance + (expenseData.price - data.price))
        setExpense(+expense - (expenseData.price - data.price))
    } else if (expenseData.price < data.price) {
        setBalance(+balance - (data.price - expenseData.price))
        localStorage.setItem('balance', +balance + (expenseData.price - data.price))
        setExpense(+expense + (data.price - expenseData.price))
    }
}
const dateObj = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
};

function convertDate(date) {
    let result = date.split(/-/)
    return `${dateObj[result[1]]} ${result[2]}, ${result[0]}`
}
export {
    initialState,
    reducerFunction,
    addExpense,
    handleGetLocalStorage,
    handleAddBalance,
    handleDelete,
    getTotalItemsLength,
    getTotalItemsList,
    handleIncrement,
    handleDecrement,
    handleEdit,
    editExpense,
    convertDate
}