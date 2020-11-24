export const currentUser = (state=null, action) => {
    switch(action.type) {
        case "SETUSER":
            return action.payload
        default:
            return state
    }

}

export const token = (state=localStorage.getItem("token"), action) => {
    switch(action.type){
        case "SETTOKEN":
            return action.payload
        default:
            return state
    }
}