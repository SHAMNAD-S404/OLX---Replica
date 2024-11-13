   
   import {createContext , useState,ReactNode , useContext, Children} from "react";

   type AuthContextType = {
    user : any;
    setUser :(user:any) => void;
    isAuthenticated : boolean;
   }

   const AuthContext = createContext<AuthContextType | undefined>(undefined);

   export const useAuth = ()=> {
      const context = useContext(AuthContext)

      if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
      }

      return context;
   }

   export const AuthProvider = ({children}:{children : ReactNode})=> {

        const [user,setUser] = useState<any>(null)
   

   return (
    <AuthContext.Provider value={{user,setUser,isAuthenticated: !!user}} >
        {children}
    </AuthContext.Provider>
   );
}
