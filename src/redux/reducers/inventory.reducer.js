const inventory = (state = [], action) => {
    if (action.type === "SET_INVENTORY") {
        return action.payload
    }
    return state
}

export default inventory