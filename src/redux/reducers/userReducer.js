import userActions from '../actions/userActions';

const initState = {
    displayName: '',
    email: '',
    uid: '',
    photoURL: '',
    backgroundUrl: '',
    city: '',
    company: '',
    country: '',
    headline: '',
    postalCode: '',
    github: '',
}

function userReducer(state = initState, action) {
    const payload = action.payload;
    switch (action.type) {
        case userActions.login:
            return { ...state, ...payload }
        case userActions.logOut:
            return { ...state, ...initState }
        default:
            return state;
    }
}

export default userReducer;