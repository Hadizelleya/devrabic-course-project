import SignIn from "../../components/sign-in/SignIn";
import { useContext, useEffect } from "react";
import MainContext from "../../utils/context";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const { user, loading } = useContext(MainContext);
  const navigate = useNavigate();
  useEffect(() => {
    !loading && user && navigate("/");
  }, [user, loading]);
  return <SignIn />;
}
