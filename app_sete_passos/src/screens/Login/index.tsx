import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
  BackHandler,
} from 'react-native';
import {Text, Input, Icon, Button} from 'react-native-elements';
import {AutenticacaoContext} from '../../contexts/AutenticacaoContext';
import Loader from '../../components/Loader';
import {StatusBar} from 'react-native';

const Login = ({navigation}) => {
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {login} = useContext(AutenticacaoContext);
  const [carregando, setCarregando] = useState(false);

  useEffect(() =>{
    BackHandler.addEventListener('hardwareBackPress', () =>{
      return true
    })
  }, [])

  const handleLogin = async (email: string, senha: string) => {
    console.log(`Email: ${email} - Senha: ${senha}`);
    setCarregando(true);
    Keyboard.dismiss();

    const respostaLogin = await login(email, senha);
    if (!respostaLogin) {
      setCarregando(false);
      Alert.alert('Erro', '', [
        {text: 'Ok'},
        {text: 'Não foi possivel realizar o login.'},
      ]);
    } else {
      setCarregando(false);
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <View style={styles.container_image}>
        <Image
          source={{
            uri: 'https://cdn.discordapp.com/attachments/972547744516415540/992879079575519272/Frame.png',
          }}
          style={styles.texto_entrada}
        />
      </View>

      <View style={styles.containerPesquisa}>
        <Input inputContainerStyle={styles.inputs}
          placeholder="E-mail"
          onChangeText={setEmail}
          value={email}
          leftIcon={
            <Icon name="mail" color="grey" type="ionocons" size={26} />
          }
        />
      </View>

      <View style={styles.containerPesquisa}>
        <Input inputContainerStyle={styles.inputs}
          placeholder="Senha"
          onChangeText={setSenha}
          value={senha}
          secureTextEntry={true}
          leftIcon={
            <Icon name="lock" color="grey" type="ionocons" size={26} />
          }
        />
      </View>
      <TouchableOpacity
        style={{
          position: 'relative',
          borderRadius: 50,
          marginTop: 30,
          alignItems: 'center',
        }}>
        <Button
          title="Entrar"
          onPress={() => handleLogin(email, senha)}
          titleStyle={styles.titulobotao}
          buttonStyle={styles.botaostyle}
          disabled={carregando}
          />{carregando && (
            <View style={styles.containerLoader}>
            <Loader cor="black" />
          </View>
        )}
        </TouchableOpacity>
        <Text
          onPress={() => navigation.navigate('PasswordRecoveryScreen')}
          style={styles.texto_senha}>
          Esqueci minha senha
        </Text>
        <Text style={styles.texto_cadastro}>
          Não possui cadastro?
          <Text
            onPress={() => navigation.navigate('RegisterScreen')}
            style={styles.crie_conta}>
            Crie sua conta
          </Text>
        </Text>
        
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
    alignItems:'center',
    justifyContent:'center',
    marginBottom:25,
  },
  inputs: {
    color: 'black',
    marginTop:33,
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

export default Login;
