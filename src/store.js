

const rootReducer = combineReducers({
    user: userReducer,
    clients: clientReducer,
    routines: routineReducer
}); 

export const store = rootReducer;