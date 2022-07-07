import React, {createContext, useState} from "react";
import { UsuarioType } from "../models/UsuarioType";
import { LoginService } from "../services/LoginService";
import { RecoveryPasswordService } from "../services/RecoveryPasswordService";
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
        const respostaServiceRegister= await RegisterService (nome,email, senha,file)
        if (!respostaServiceRegister) {
            return false;
        } else {
            setUsuario({
                id: respostaServiceRegister?.id,
                name: respostaServiceRegister?.name,
                email: respostaServiceRegister?.email,
                token: respostaServiceRegister?.token,
                fotoPerfil:respostaServiceRegister?.foto_perfil,
            });
            return true;
        }
    };

    const trocarSenha = async (email:string,senha:string) =>{   

        console.log("senha", senha)
        const respostaServiceRegistery= await RecoveryPasswordService(email,senha)
        if (!respostaServiceRegistery) {
            return false;
        } else {
            // setUsuario({
            //     id: usuario!.id,
            //     name: usuario!.name,
            //     email: usuario!.email,
            //     token: respostaServiceRegistery?.token,
            //     fotoPerfil:respostaServiceRegistery?.foto_perfil,
            // });
            return true;
        }
    };
    return (
        <AutenticacaoContext.Provider value={{
            login,
            register,
            setUsuario,
            trocarSenha,
            usuario,
        }}>
            {children}
        </AutenticacaoContext.Provider> 
    )
}