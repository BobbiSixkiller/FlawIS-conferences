import router from "next/router";
import { ReactNode, useContext } from "react";
import { AuthContext } from "./Auth";

export default function ProtectedRouteProvider({
  children,
  protect,
}: {
  children: ReactNode;
  protect?: boolean;
}) {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (!protect) return <>{children}</>;

  if (!user) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
