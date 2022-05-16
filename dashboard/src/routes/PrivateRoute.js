/* import { Navigate, Route } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  return (
    <Route {...rest}>
      {auth.user ? <Component /> : <Navigate to="login" />}
    </Route>
  );
}
 */

import { Navigate, Route } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function PrivateRoute({ Component }) {
  const auth = useAuth();

  return auth.user ? <Component /> : <Navigate to="/login" />;
}
