const initialState = {
    user: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "successLogin":
            return {
                ...state, user: action.payload
            }
        case "errorLogin":
            return initialState;
        default:
            return state;
    }
}
