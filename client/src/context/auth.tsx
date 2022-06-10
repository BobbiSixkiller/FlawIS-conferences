import { createContext, useReducer, ReactNode } from "react";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "semantic-ui-react";

const ME = gql`
	query me {
		me {
			id
			email
			role
			permissions
			billings {
				id
				name
				address {
					street
					city
					postal
					country
				}
				ICO
				DIC
				ICDPH
				IBAN
				SWIFT
			}
		}
	}
`;

const AuthContext = createContext(null);

function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN":
			return { user: action.user, loading: false, error: "" };

		case "LOGOUT":
			return { ...state, user: null };

		case "ERROR":
			return { ...state, error: action.error, loading: false };

		default:
			return state;
	}
}

function AuthProvider({ children: ReactNode }) {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		loading: true,
		error: "",
	});

	const { data, loading, error } = useQuery(ME, {
		onComplete: ({ me }) => {
			dispatch({ type: "LOGIN", user: me });
			console.log(me);
		},
		onError: (error) => {
			console.log(error);
			dispatch({ type: "ERROR", error });
		},
	});

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProvider, AuthContext };
