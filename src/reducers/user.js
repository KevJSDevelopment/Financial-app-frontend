export const currentUser = (state=null, action) => {
    switch(action.type) {
        case "SETUSER":
            return action.payload
        case "RESET":
            return null
        default:
            return state
    }

}

export const token = (state=localStorage.getItem("token"), action) => {
    switch(action.type){
        case "SETTOKEN":
            return action.payload
        case "RESET":
            return localStorage.getItem("token")
        default:
            return state
    }
}