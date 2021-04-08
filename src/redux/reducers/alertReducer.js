import alertActions from '../actions/alertActions';
/*
    severity: '',
    message: '',
*/

const initState = {
    severity: '',
    message: '',
};

function userReducer(state = initState, action) {
    const payload = action.payload;
    switch (action.type) {
        case alertActions.add:
            return { ...state, ...payload }
        case alertActions.remove:

            return { ...state, ...initState }
        default:
            return state;
    }
}

export default userReducer;