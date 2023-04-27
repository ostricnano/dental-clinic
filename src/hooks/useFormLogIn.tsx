import { useReducer } from "react";

const INITIAL_STATE = {
    userName: '',
    password: '',
}
interface FormState {
    userName: string
    password: string
}
type FormReducerAction = {
    type: 'change_value' ,
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: 'clear_form'
}

const formReducer = (state: FormState, action: FormReducerAction) => {
    switch(action.type){
        case 'change_value':
            const {inputName, inputValue} = action.payload
            return {
                ...state,
                [inputName]: inputValue
            }
            case 'clear_form':
                return INITIAL_STATE
        }
}
const useFormLogIn = () => {
    return useReducer(formReducer, INITIAL_STATE)
}
export default useFormLogIn;