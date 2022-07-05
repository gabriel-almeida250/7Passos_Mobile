import AxiosInstance from "../api/AxiosInstance";
import jwt_decode from "jwt-decode";

const RegisterService = async (nome:string, email:string, senha:string, file:string) => {
    var tokenDecodificado:any = null;


    let  dataPayload = {
        "nomeUsuario":nome,
        "email":email,
        "senha":senha,
        "fotoPerfil":file
    }

    try {
        const response = await AxiosInstance.post('/autenticacao/registro',dataPayload);

        if (response.status === 200) {
            console.log('Resposta do LoginService: ' + JSON.stringify(response.data));
            tokenDecodificado = jwt_decode(response.data.token)
            tokenDecodificado['token'] = response.data.token;
           
            return tokenDecodificado;
            
        } else {
            console.log(response.data);
            return false;
        }
        
    } catch (error) {
        
        console.log('Erro ao realizar o login' + JSON.stringify(error));
        return false;
    }
  
}

export {RegisterService};