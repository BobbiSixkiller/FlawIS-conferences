import { createContext, Dispatch, useReducer } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "src/graphql/Auth.graphql";
import { me } from "src/graphql/__generated__/me";
import { login_login } from "src/graphql/__generated__/login";
import { Loader } from "semantic-ui-react";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

enum ActionTypes {
  Login = "LOGIN",
  Logout = "LOGOUT",
  Error = "ERROR",
}

type ActionPayload = {
  [ActionTypes.Login]: { user: login_login };
  [ActionTypes.Logout]: undefined;
  [ActionTypes.Error]: { error: string };
};

type AuthActions = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

function authReducer(state: AuthContextType, action: AuthActions) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload.user, loading: false, error: "" };

    case "LOGOUT":
      return { ...state, user: null };

    case "ERROR":
      return { ...state, error: action.payload.error, loading: false };

    default:
      return state;
  }
}

interface AuthContextType {
  loading: boolean;
  error: string;
  user: login_login | null;
  dispatch: Dispatch<AuthActions>;
}

const AuthContext = createContext<AuthContextType>(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    loading: true,
    error: "",
    user: null,
  });

  const { loading } = useQuery<me>(ME, {
    onCompleted: ({ me }) => {
      dispatch({ type: ActionTypes.Login, payload: { user: me } });
      console.log(me);
    },
    onError: (error) => {
      console.log(error);
      dispatch({ type: ActionTypes.Error, payload: { error: error.message } });
    },
  });
  console.log(state.loading);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.loading || loading ? <Loader active /> : children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
