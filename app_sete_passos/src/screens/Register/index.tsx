import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
} from 'react-native';
import {Text, Input, Icon, Button} from 'react-native-elements';
import {AutenticacaoContext} from '../../contexts/AutenticacaoContext';
import Loader from '../../components/Loader';
import {ScrollView} from 'react-native';

const Register = ({navigation}) => {
  const [carregando, setCarregando] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');
  const [senha, setSenha] = useState('');
  const {register} = useContext(AutenticacaoContext);

  const [erroNome, setErroNome] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroFoto, setErroFoto] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;

  const validarFormulario = () => {
    let error = false;
    setErroNome('');
    setErroEmail('');
    setErroSenha('');
    setErroFoto('');

    if (nome == '') {
      setErroNome('O campo nome é obrigatório.');
      error = true;
      setCarregando(false);
    }

    if (email == '') {
      setErroEmail('O campo email é obrigatório.');
      error = true;
      setCarregando(false);
    }

    if (senha == '') {
      setErroSenha('O campo senha é obrigatório.');
      error = true;
      setCarregando(false);
    }

    if (foto == '') {
      setErroFoto('O campo foto é obrigatório.');
      error = true;
      setCarregando(false);
    }

    if (!regexEmail.test(String(email).toLowerCase())) {
      setErroEmail('Preencha o email corretamente.');
      error = true;
      setCarregando(false);
    }
    return !error;
  };

  const cadastrarUsuario = async (nomeUsuario:string, emailUsuario: string, senhaUsuario: string,fileUsuario:string) => {
    setCarregando(true);
    Keyboard.dismiss();

    if (validarFormulario()) {
      const respostaRegister = await register(nomeUsuario,emailUsuario, senhaUsuario,fileUsuario);
      if (!respostaRegister) {
        setCarregando(false);
        Alert.alert('Erro', '', [
          {text: 'Ok'},
          {text: 'Não foi possivel realizar o seu cadastro.'},
        ]);
      } else {
        setCarregando(false);
        navigation.navigate('LoginScreen');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container_image}>
        <Image
          source={{
            uri: 'https://cdn.discordapp.com/attachments/972547744516415540/992879079575519272/Frame.png',
          }}
          style={styles.imagem}
        />
      </View>

      <Text style={styles.titulos}>Nome:</Text>
      <View style={styles.container_image}></View>
      <View style={styles.containerPesquisa}>
        <Input
          inputContainerStyle={styles.inputs}
          placeholder="Digite seu nome..."
          errorMessage={erroNome}
          onChangeText={valor => {
            setNome(valor);
            setErroNome('');
          }}
        />
      </View>

      <Text style={styles.titulos}>Email:</Text>
      <View style={styles.containerPesquisa}>
        <Input
          inputContainerStyle={styles.inputs}
          placeholder="Digite seu email..."
          errorMessage={erroEmail}
          onChangeText={valor => {
            setEmail(valor);
            setErroEmail('');
          }}
        />
      </View>

      <Text style={styles.titulos}>Senha:</Text>
      <View style={styles.containerPesquisa}>
        <Input
          inputContainerStyle={styles.inputs}
          placeholder="Digite sua senha..."
          errorMessage={erroSenha}
          onChangeText={valor => {
            setSenha(valor);
            setErroSenha('');
          }}
        />
      </View>

      <Text style={styles.titulos}>Foto:</Text>
      <View style={styles.containerPesquisa}>
        <Input
          inputContainerStyle={styles.inputs}
          placeholder="Insira a url da sua foto de perfil"
          errorMessage={erroFoto}
          onChangeText={valor => {
            setFoto(valor);
            setErroFoto('');
          }}
        />
      </View>
      <View
        style={{
          position: 'relative',
          borderRadius: 50,
          marginTop: 30,
          alignItems: 'center',
        }}>
        <Button
          title="Cadastrar"
          titleStyle={styles.titulobotao}
          buttonStyle={styles.botaostyle}
          disabled={carregando}
          onPress={() => cadastrarUsuario(nome,email,senha,foto)}
        />

        {carregando && (
          <View style={styles.containerLoader}>
            <Loader cor="black" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#0D6EFD',
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  container_image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulos: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
  },
  imagem: {
    height: 65,
    width: 249,
    marginBottom: 30,
  },
  containerPesquisa: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  inputs: {
    color: 'black',
    borderBottomColor: 'white',
    padding: 5,
    marginTop: 35,
    flex: 1,
  },

  titulobotao: {
    color: '#0D6EFD',
    margin: 5,
    fontSize: 25,
  },
  botaostyle: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: 260,
    marginBottom: 15,
  },
  containerLoader: {
    translateY: -50,
  },
  texto_senha: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 25,
  },
  texto_cadastro: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 65,
  },
  crie_conta: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Register;
