import React from 'react';
import {Card, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
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
      <Card.Title style={styles.valor_cards}>R$ {dadosDoProduto.precoProduto}</Card.Title>
      
    </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card_style: {
    backgroundColor: '#D9D9D9',
    padding: 0,
    width: 160,
    height: 232,
    borderRadius: 5,
    borderWidth: 0,
  },
  imagens_cards: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0,
    width:159.48,
    height:151.13
  },
  titulo_cards: {
    fontSize: 18,
    color: '#0a0a0a',
    textAlign: 'center',
  },
  valor_cards: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#181717',
    fontStyle:'italic',
    fontWeight:'normal',
  }
});
export default CardProduto;