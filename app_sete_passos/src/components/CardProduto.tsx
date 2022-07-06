import React from 'react';
import {Card, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardProduto = (props: any) => {
  const dadosDoProduto = props.dados;
  const navigation = props.navigation;
  // console.log(dadosDoProduto)

  const navigateToDetail = () => {
    navigation.navigate({
      name: 'ProdutoScreen',
      params: {
        dadosDoProduto: dadosDoProduto,
      },
    });
  };
  return (
    <TouchableOpacity onPress={() => navigateToDetail()}>
      <View>
        <Card containerStyle={styles.card_style}>
          <Card.Image
            style={styles.imagens_cards}
            source={{uri: dadosDoProduto.imagemProduto}}
          />
          <Card.Divider />
          <Card.Title numberOfLines={1} style={styles.titulo_cards}>{dadosDoProduto.nomeProduto}</Card.Title>
          <Card.Title style={styles.valor_cards}>R$ {dadosDoProduto.precoProduto?.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')}</Card.Title>

        </Card>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card_style: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: 0,
    width: '84%',
    height: '78%',
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
    width: 164,
    height: 151.13,
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
    textAlign: 'center',
    color: '#181717',
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
});
export default CardProduto;
