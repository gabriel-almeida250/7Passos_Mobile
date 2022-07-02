import React from 'react';
import {Card, Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CardProduto = (props:any) => {
  const dadosDoProduto = props.dados;
  const navigation = props.navigation;
  // console.log(dadosDoProduto)
  return (
    <TouchableOpacity
    onPress={()=>{
      navigation.navigate({name:'ProdutoScreen', params:{
        dadosDoProduto: dadosDoProduto
      }}) 
    }}
    >
    <Card containerStyle={styles.card_style}>
      <Card.Image
        style={styles.imagens_cards}
        source={{uri:dadosDoProduto.imagemProduto}}
      />
      <Card.Divider />
      <Card.Title style={styles.titulo_cards}>{dadosDoProduto.nomeProduto}</Card.Title>
      <Text style={styles.descricao_cards}>{dadosDoProduto.descricaoProduto}</Text>
    </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card_style: {
    backgroundColor: 'red',
    padding: 0,
    marginBottom: 20,
    width: 140,
    height: 260,
    borderRadius: 5,
    borderWidth: 0,
  },
  imagens_cards: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0,

  },

  titulo_cards: {
    fontSize: 18,
    color: 'black',
  },
  descricao_cards: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#181717',
  }
});
export default CardProduto;