import { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ gruposPermitidos, children }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/admin/admin-cadastros' } };

  //return children;

  if (!auth.token) {
    return <Navigate to="/login" />;
  }
  try {
    let resp = auth.validarToken(() => auth.token);
    if (!resp) { return navigate('/login'); }
    if (auth?.user?.grupos?.find(grupo => gruposPermitidos.includes(grupo))) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('error validar token', error);
    return <Navigate to="/login" />;
  }

};
