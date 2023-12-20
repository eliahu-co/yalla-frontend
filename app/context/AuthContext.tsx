// "use client"

// import React, { createContext, useState, useContext } from 'react';
// import axios from 'axios';
// import { API_URL } from '../config'



// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<boolean>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//     children: React.ReactNode;
//   }



// export const useAuth = () => {
//   return useContext(AuthContext) as AuthContextType;
// };

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }): React.ReactNode => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await axios.post(`${API_URL}/users/login`, {
//         email,
//         password,
//       }, { withCredentials: true });

//       setUser(response.data.userData);
//       return true;

//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   };


// return <AuthContext.Provider value={{user, login}}>{children}</AuthContext.Provider>;
// };