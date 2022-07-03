import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const Profile = () => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.topo} />
          <View style={styles.foto} />
        </View>
        <View style={styles.informacoes}>
          <Text style={styles.usuario}>Nome do Usúario</Text>
          <Text style={styles.email}>Email</Text>
          <Text style={styles.senha}>Editar Senha</Text>
        </View>

      </View>
      <View style={styles.botao}>
        <Button
          title='Sair'
          color='#1c78ff'
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topo: {
    backgroundColor: '#1c78ff',
    marginTop: -267,
    height: 150,
    width: 360,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  foto: {
    backgroundColor: '#1c78ff',
    height: 160,
    width: 160,
    borderRadius: 200 / 1,
    marginTop: -100,
    margin: 96,
    borderColor: 'white',
    borderWidth: 3.5,
  },
  title: {
    color: 'black',
    fontSize: 25
  },
  informacoes: {
    padding: 25,
    marginTop: -50,
    marginBottom: -160
  },
  usuario: {
    borderBottomWidth: 2,
    paddingBottom: 3,
    fontSize: 25,
    marginTop: -20,
    textAlign: 'center'
  },
  email: {
    borderBottomWidth: 2,
    paddingBottom: 3,
    fontSize: 25,
    textAlign: 'center'
  },
  senha: {
    borderBottomWidth: 2,
    paddingBottom: 3,
    fontSize: 25,
    marginBottom: 25,
    textAlign: 'center'
  },
  botao: {
    alignItems: 'center',
    backgroundColor: 'white',
  }

});
export default Profile;