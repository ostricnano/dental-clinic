import { createContext, useReducer, ReactNode } from "react";

interface User {
    userName: string;
    password: string;
}

interface AuthState {
    token: string | null;
}

interface AuthContextProps {
    authState: AuthState;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const authInitialState: AuthState = {
    token: null,  
};

export const AuthContext = createContext({} as AuthContextProps);

const authReducer = (state: AuthState, action: any): AuthState => {
    switch (action.tye) {
        case 'SIGN_IN':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
            };
        case 'SIGN_OUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,     
            };
        default:
            return state;
        }
    };

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

        const [authState, dispatch] = useReducer(authReducer, authInitialState);

        const signIn = async (userName: string, password: string) => {
            console.log(userName, password)
            const response = await fetch('http://localhost:8082/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }),
            });
            const data = await response.json();
            dispatch({
                type: 'SIGN_IN',
                payload: {
                    token: data.jwt,
                },
            });
            localStorage.setItem('token', data.jwt);
        };
        const signOut = () => {
            dispatch({ type: 'SIGN_OUT' });
        };

        return (
            <AuthContext.Provider value={{ authState, signIn, signOut }}>
                {children}
            </AuthContext.Provider>
        );
    }
