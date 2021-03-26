import userActions from '../actions/userActions';

const initState = {
    username: '',
    email: '',
}

function userReducer(state = initState, action) {
    switch (action.type) {
        case userActions.login:
            return { ...state, user: action.payload }
        case userActions.logOut:
            return { ...state, user: null }
        default:
            return state;
    }
}

export default userReducer;