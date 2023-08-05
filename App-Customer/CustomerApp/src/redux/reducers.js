const initialStatusState = {
    isLoading: false,
}

export const setLoading = () => {
    return { type: "setLoading" }
}
export const unsetLoading = () => {
    return { type: "unsetLoading" }
}

export const StatusReducer = (state = initialStatusState, action) => {
    switch (action.type) {
        case "setLoading":
            return { isLoading: true }
        case "unsetLoading":
            return { isLoading: false }
        default:
            return state
    }
}