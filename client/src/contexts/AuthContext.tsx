import { createContext, useContext, useEffect, useState } from "react";
import decoder from "jwt-decode";

interface IAuthProvider {
  onLogin: (accessToken: string) => void;
  onLogout: () => void;
  username: string;
}
export const AuthDataContext = createContext({} as IAuthProvider);

const AuthDataProvider = (props: any) => {
  const [authData, setAuthData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userAccessToken");
    if (token) {
      const decoded: { username: string } = decoder(token);
      setAuthData(decoded.username);
    }
  }, []);

  const onLogout = () => {
    localStorage.clear();
    setAuthData("");
  };

  const onLogin = (token: string) => {
    const decoded: { username: string } = decoder(token);
    setAuthData(decoded.username);
  };

  return (
    <AuthDataContext.Provider
      value={{ onLogin, onLogout, username: authData }}
      {...props}
    />
  );
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
