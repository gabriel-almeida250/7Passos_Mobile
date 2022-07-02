import React, {useState, useContext} from 'react';
import {View,StyleSheet,TouchableOpacity,Alert,Keyboard,Image,} from 'react-native';
import {Text, Input, Icon, Button} from 'react-native-elements';
import {AutenticacaoContext} from '../../contexts/AutenticacaoContext';
import Loader from '../../components/Loader';


const PasswordRecovery = () => {
  const [carregando, setCarregando] = useState(false);
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

      <View style={styles.inputs}>
        <Input
          placeholder="E-mail"
          leftIcon={
            <Image
              source={{
                uri: 'https://cdn.discordapp.com/attachments/972547744516415540/992885692105502770/icons8-email-aberto-50_1.png',
              }}
              style={styles.icons}
            />
          }
        />
      </View>

      <View style={styles.inputs}>
        <View style={{alignItems: 'center'}}>
          <Input
            placeholder="Senha"
            leftIcon={
              <Image
                source={{
                  uri: 'https://cdn.discordapp.com/attachments/972547744516415540/992885691870617660/icons8-padlock-64_1.png',
                }}
                style={styles.icons2}
              />
            }
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.inputs}>
        <View style={{alignItems: 'center'}}>
          <Input
            placeholder="Repita sua senha"
            leftIcon={
              <Image
                source={{
                  uri: 'https://cdn.discordapp.com/attachments/972547744516415540/992885691870617660/icons8-padlock-64_1.png',
                }}
                style={styles.icons2}
              />
            }
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity
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
        />

        {carregando && (
          <View style={styles.containerLoader}>
            <Loader cor="black" />
          </View>
        )}
      </TouchableOpacity>
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

  inputs: {
    backgroundColor: 'white',
    margin: 11,
    width: 350,
    height: 44,
    borderRadius: 8,
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
