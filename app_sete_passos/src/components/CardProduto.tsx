import React from 'react';
import {Card, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardProduto = (props: any) => {
  const dadosDoProduto = props.dados;
  

  return (
      <View>
        <Card containerStyle={styles.card_style}>
          <Card.Image
            style={styles.imagens_cards}
            source={{uri: dadosDoProduto.imagemProduto}}
          />
          <Card.Divider />
          <Card.Title numberOfLines={1} style={styles.titulo_cards}>{dadosDoProduto.nomeProduto}</Card.Title>
          <Card.Title style={[styles.valor_cards, styles.precoDe]}>De: R$ {(dadosDoProduto.precoProduto + dadosDoProduto.precoProduto  * 0.20)?.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')}</Card.Title>
          <Card.Title style={styles.valor_cards}>Por: R$ {dadosDoProduto.precoProduto?.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')}</Card.Title>

        </Card>
      </View>
  );
};
const styles = StyleSheet.create({
  card_style: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: 0,
    width: 160,
    height: 240,
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 18,
    elevation:10,
    shadowColor:'#000306',
  },
  imagens_cards: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0,
    resizeMode:'contain'
  },
    precoDe:{
    fontSize: 14,
    translateY:-5,
    marginLeft: -15,
    textDecorationLine:'line-through'
  },
  titulo_cards: {
    fontSize: 18,
    color: '#0a0a0a',
    textAlign: 'center',
    marginBottom: 3,
  },
  valor_cards: {
    marginBottom: 20,
    fontSize: 16,
    translateY:-30,
    textAlign: 'center',
    color: '#181717',
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
});
export default CardProduto;
