import { Redirect, Route } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function AdminRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  return (
    <Route {...rest}>
      {auth.user ? <Component /> : <Redirect to="login" />}
    </Route>
  );
}
