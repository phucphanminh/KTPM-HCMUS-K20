const initialStatusState = {
    isLoading: false,
}

export const setLoading = (bool) => {
    return { type: "setLoading", payload: bool }
}


export const StatusReducer = (state = initialStatusState, action) => {
    switch (action.type) {
        case "setLoading":
            return { isLoading: action.payload }
        default:
            return state
    }
}