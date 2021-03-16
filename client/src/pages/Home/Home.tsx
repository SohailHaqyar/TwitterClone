import { useAuthDataContext } from "../../contexts/AuthContext";

export const Home = () => {
  const { onLogout, username } = useAuthDataContext();
  return (
    <div style={{ padding: 28 }}>
      <h1>Home </h1>
      <p>
        Username: <strong>{username}</strong>
      </p>
      <button onClick={() => onLogout()}>Logout</button>
    </div>
  );
};
