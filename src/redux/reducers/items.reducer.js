const items = (state = [], action) => {
    if (action.type === "SET_ITEMS") {
        return action.payload
    }
    return state
}

export default items