import Cookies from "js-cookie"

const UserReducer = (state, action) => {
    switch (action.type) {

        case 'LOGIN':
            return { ...state, user: { ...state.user } }

        case 'SIGNUP':
            return { ...state, user: action.payload }

        case 'LOGOUT':
            Cookies.remove("token");
            return { ...state, user: null }

        case 'GET_DETAILS':
            return { ...state, details: { ...state.details, ...action.payload } }

        default:
            return state;
    }
}

export default UserReducer;