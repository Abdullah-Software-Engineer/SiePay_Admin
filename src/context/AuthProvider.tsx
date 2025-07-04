import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isToken: boolean;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize token from localStorage on mount
    const storedToken = localStorage.getItem("token");
    setTokenState(storedToken);
    setIsInitialized(true);
  }, []);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const clearAuth = () => {
    setTokenState(null);
    localStorage.removeItem("token");
  };

  const isToken = Boolean(token);

  // Don't render children until we've initialized the token from localStorage
  if (!isInitialized) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ token, isToken, setToken, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
