import AxiosInstance from "../api/AxiosInstance";
import jwt_decode from "jwt-decode";

const LoginService = async (email:string, senha:string) => {

    console.log(`Email: ${email} - Senha: ${senha}`);
   
    var tokenDecodificado:any = null;
    try {
       
        const response = await AxiosInstance.post('autenticacao', {
            email,
            senha
        });

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

export {LoginService};