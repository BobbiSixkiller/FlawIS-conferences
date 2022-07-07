import { createContext, Dispatch, ReactNode, useReducer } from "react";
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
}

type ActionPayload = {
  [ActionTypes.Login]: { user: login_login };
  [ActionTypes.Logout]: undefined;
};

type AuthActions = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

function authReducer(state: AuthContextType, action: AuthActions) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload.user, loading: false };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
}

interface AuthContextType {
  loading: boolean;
  user: login_login | null;
  dispatch: Dispatch<AuthActions>;
}

const AuthContext = createContext<AuthContextType>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    loading: true,
    user: null,
  });

  const { loading } = useQuery<me>(ME, {
    onCompleted: ({ me }) =>
      dispatch({ type: ActionTypes.Login, payload: { user: me } }),
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.loading || loading ? <Loader active /> : children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
