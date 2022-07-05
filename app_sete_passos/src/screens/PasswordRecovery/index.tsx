import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert, Keyboard, Image} from 'react-native';
import {Text, Input, Icon, Button} from 'react-native-elements';
import {AutenticacaoContext} from '../../contexts/AutenticacaoContext';
import Loader from '../../components/Loader';

const PasswordRecovery = ({navigation}) => {
  const [carregando, setCarregando] = useState(false);
  const {usuario, trocarSenha} = useContext(AutenticacaoContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirmaSenha, setErroConfirmaSenha] = useState('');
  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;

  const validarFormulario = () => {
    let error = false;
    setErroEmail('');
    setErroSenha('');
    setErroConfirmaSenha('');

    if (email == '') {
      setErroEmail('Este campo é obrigatório.');
      error = true;
      setCarregando(false);
    }

    if (senha == '') {
      setErroSenha('Este campo é obrigatório.');
      error = true;
      setCarregando(false);
    }

    if (confirmaSenha == '') {
      setErroConfirmaSenha('Este campo é obrigatório.');
      error = true;
      setCarregando(false);
    }

    if (confirmaSenha !== senha) {
      setErroConfirmaSenha('As senhas precisam ser iguais');
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

  const recuperarSenha = async (email:string,senhaUsuario: string) => {
    setCarregando(true);
    Keyboard.dismiss();

    if (validarFormulario()) {
      const respostaRegister = await trocarSenha(email, senhaUsuario);
      if (!respostaRegister) {
        setCarregando(false);
        Alert.alert('Não foi possivel recuperar a sua senha.', '', [
          {text: 'Ok'},
        ]);
      } else {
        Alert.alert('Senha recuperada com sucesso!', '', [
          {text: 'Ok'},
        ]);
        setCarregando(false);
        navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_image}>
        <Image
          source={{
            uri: 'https://cdn.discordapp.com/attachments/972547744516415540/992879079575519272/Frame.png',
          }}
          style={styles.texto_entrada}
        />
      </View>

      <View style={styles.containerPesquisa}>
        <Input
          inputContainerStyle={styles.inputs}
          placeholder="E-mail"
          errorMessage={erroEmail}
          onChangeText={valor => {
            setEmail(valor);
            setErroEmail('');
          }}
          leftIcon={<Icon name="mail" color="grey" type="ionocons" size={26} />}
        />
      </View>

      <View style={styles.containerPesquisa}>
        <Input
          inputContainerStyle={styles.inputs}
          placeholder="Nova senha"
          errorMessage={erroSenha}
          onChangeText={valor => {
            setSenha(valor);
            setErroSenha('');
          }}
          leftIcon={<Icon name="lock" color="grey" type="ionocons" size={26} />}
          secureTextEntry
        />
      </View>

      <View style={styles.containerPesquisa}>
        <Input
          inputContainerStyle={styles.inputs}
          placeholder="Repita sua nova senha"
          errorMessage={erroConfirmaSenha}
          onChangeText={valor => {
            setConfirmaSenha(valor);
            setErroConfirmaSenha('');
          }}
          leftIcon={<Icon name="lock" color="grey" type="ionocons" size={26} />}
          secureTextEntry
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
          title="Salvar"
          titleStyle={styles.titulobotao}
          buttonStyle={styles.botaostyle}
          disabled={carregando}
          onPress={() => recuperarSenha(email,senha)}
        />

        {carregando && (
          <View style={styles.containerLoader}>
            <Loader cor="black" />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D6EFD',
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  container_image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto_entrada: {
    height: 65,
    width: 249,
    marginBottom: 60,
  },
  icons: {
    width: 17,
    height: 19,
  },
  icons2: {
    width: 19,
    height: 17.46,
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
    marginTop: 33,
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

export default PasswordRecovery;
