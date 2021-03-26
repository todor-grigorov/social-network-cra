import userActions from '../actions/userActions';

const initState = {
    displayName: '',
    email: '',
    uid: '',
}

function userReducer(state = initState, action) {
    switch (action.type) {
        case userActions.login:
            return { ...state, ...action.payload }
        case userActions.logOut:
            return { ...state, user: null }
        default:
            return state;
    }
}

export default userReducer;