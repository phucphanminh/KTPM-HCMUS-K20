import { StatusColor } from "../components/Overlay/SlideMessage"

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

const initialMessageState = {
    status:StatusColor.error,
    message:"",
    key:"",
}

export const showMessage = (status,message) => {
    const id=new Date().toString()
   
    return { type: "showMessage", status,message,key:id}
}

export const MessageReducer = (state = initialMessageState, action) => {
    switch (action.type) {
        case "showMessage":
            return { status: action.status,message:action.message, key:action.key }
        default:
            return state
    }
}