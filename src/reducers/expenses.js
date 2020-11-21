export const amount = (state = "", action) => {
    switch(action.type){
        case "AMOUNT":
            return action.payload
        default:
            return state
    }
}

export const expDate = (state = new Date(), action) =>{
    switch(action.type){
        case "EXPDATE":
            return action.payload
        default:
            return state
    }
}