import React, {createContext, useContext, useState} from "react";
import { UsuarioType } from "../models/UsuarioType";
import { LoginService } from "../services/LoginService";
import { RegisterService } from "../services/RegisterService";

export const AutenticacaoContext = createContext({});


export const AutenticacaoProvider = ({children}) => {
    
    const [usuario, setUsuario] = useState<UsuarioType>();

    const login = async (email:string, senha:string) => {
        const respostaServiceLogin= await LoginService(email, senha)
        if (!respostaServiceLogin) {
            return false;
        } else {
            console.log('context',respostaServiceLogin)
            setUsuario({
                id: respostaServiceLogin?.id,
                name: respostaServiceLogin?.name,
                email: respostaServiceLogin?.email,
                token: respostaServiceLogin?.token,
                fotoPerfil:respostaServiceLogin?.foto_perfil,
            });
            return true;
        }
    };

    const register = async (nome:string, email:string, senha:string, file:string) => {
        const respostaServicRegister= await RegisterService (nome,email, senha,file)
        if (!respostaServicRegister) {
            return false;
        } else {
            setUsuario({
                id: respostaServicRegister?.id,
                name: respostaServicRegister?.nome,
                email: respostaServicRegister?.email,
                token: respostaServicRegister?.token,
                fotoPerfil:respostaServicRegister?.fotoPerfil,
            });
            return true;
        }
    };
    return (
        <AutenticacaoContext.Provider value={{
            login,
            register,
            setUsuario,
            usuario,
        }}>
            {children}
        </AutenticacaoContext.Provider> 
    )
}