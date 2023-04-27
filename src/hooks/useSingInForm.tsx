import { useReducer } from "react";

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userRole:''
}
interface FormState {
    firstName: string
    lastName: string
    email: string
    password: string
    userRole: string
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

const useSingInForm = () => {
    return useReducer(formReducer, INITIAL_STATE)
}

export default useSingInForm;

