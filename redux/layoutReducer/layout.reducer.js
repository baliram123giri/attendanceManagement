export const ASIDEBAR_TOGGLE = "ASIDEBAR_TOGGLE"
//initial state
const initialState = {
    asideBarToggle: false
}
//create a reducer 
export const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ASIDEBAR_TOGGLE:
            return {
                ...state, asideBarToggle: !state.asideBarToggle
            }
        default:
            return state
    }
}