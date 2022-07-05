import React, {useContext} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import {AutenticacaoContext} from '../../contexts/AutenticacaoContext';

const Profile = ({navigation}) => {
  const {usuario,setUsuario} = useContext(AutenticacaoContext);
 
  const logout = () => {
    setUsuario({});
    navigation.navigate("LoginScreen")
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topo} />
        <Image style={styles.foto} source={{uri: usuario.fotoPerfil}} />
        <View style={styles.informacoes}>
          <Text style={styles.input}>{usuario.name}</Text>
          <Text style={styles.input}>{usuario.email}</Text>
          <Button
            buttonStyle={styles.botao}
            titleStyle={styles.tituloBotao}
            title="Trocar Senha"
            onPress={()=> navigation.navigate({
              name:"ChangePasswordScreen",
              params: { dadosDoUsuario: usuario,
            }})}
          />
          <Text onPress={()=> logout()} style={styles.btnSair}>Sair</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topo: {
    backgroundColor: '#1c78ff',
    height: 150,
    width: Dimensions.get('window').width,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  foto: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginTop: -85,
    borderColor: 'white',
    borderWidth: 3.5,
  },
  informacoes: {
    padding: 25,
    width: '90%',
    marginTop: 30,
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0D6EFD',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#0D6EFD',
  },
  botao: {
    backgroundColor: '#0D6EFD',
    width: '70%',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  tituloBotao: {
    color: 'white',
    fontSize: 20,
  },
  btnSair:{
    marginTop:30,
    fontSize:20,
    color:"#BC2A28",
    textAlign:"center"
  }
});
export default Profile;
