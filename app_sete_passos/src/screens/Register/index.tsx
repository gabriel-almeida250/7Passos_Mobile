import React, {useState, useContext} from 'react';
import {View,StyleSheet,TouchableOpacity,Alert,Keyboard,Image,} from 'react-native';
import {Text, Input, Icon, Button} from 'react-native-elements';
import {AutenticacaoContext} from '../../contexts/AutenticacaoContext';
import Loader from '../../components/Loader';
import {ScrollView} from 'react-native';

const Register = () => {
  const [carregando, setCarregando] = useState(false);
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
        <Input inputContainerStyle={styles.inputs} placeholder="Digite seu nome..." />
      </View>

      <Text style={styles.titulos}>Email:</Text>
      <View style={styles.containerPesquisa}>
        <Input inputContainerStyle={styles.inputs} placeholder="Digite seu email..." />
      </View>

      <Text style={styles.titulos}>Senha:</Text>
      <View style={styles.containerPesquisa}>
        <Input inputContainerStyle={styles.inputs} placeholder="Digite sua senha..." />
      </View>

      <Text style={styles.titulos}>Foto:</Text>
      <View style={styles.containerPesquisa}>
        <Input inputContainerStyle={styles.inputs} placeholder="Insira sua foto de perfil" />
      </View>
      <TouchableOpacity
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
        />

        {carregando && (
          <View style={styles.containerLoader}>
            <Loader cor="black" />
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontWeight:'bold',
    fontSize:18,
    marginBottom:3
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
    alignItems:'center',
    justifyContent:'center',
    marginBottom:25,
  },
  inputs: {
    color: 'black',
    borderBottomColor: 'white',
    padding: 5,
    marginTop:35,
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
