import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const updateUserFromToken = async (newToken) => {
    if (!newToken) {
      setFirstname("");
      setProfileImage("");
      setRole("");
      setIsLoggedIn(false);
      return;
    }

    try {
      const decoded = jwtDecode(newToken);
      const userId = decoded.id;
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Token expired");
        localStorage.removeItem("token");
        setToken(null);
        setIsLoggedIn(false);
        return;
      }

      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
// console.log("token" , newToken )
      if (!res.ok) throw new Error("User fetch failed");

      const data = await res.json();

      setFirstname(data.firstName);
      setProfileImage(`http://localhost:5000/uploads/${data.profileImage}`);
      setRole(decoded.role); 
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch user from token:", error.message);
      setIsLoggedIn(false);
      setRole("");
    }
  };

  useEffect(() => {
    updateUserFromToken(token);
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        profileImage,
        setProfileImage,
        firstname,
        setFirstname,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        role,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};