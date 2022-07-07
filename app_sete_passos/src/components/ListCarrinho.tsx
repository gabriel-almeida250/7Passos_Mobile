import React, {useContext, useEffect, useState, useCallback} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {CarrinhoContext} from '../contexts/CarrinhoContext';

const ListCarrinho = (props: any) => {
  const carrinhoProduto = props.item;
  const {removerItemProduto} = useContext(CarrinhoContext);
  const [quantidade, setQuantidade] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [total, setTotal] = useState(0);

  const deleteItem = (idProduto: number) => {
    removerItemProduto(idProduto);
  };

  function removeItem(idProduto: number) {
    console.log('produto clicado', carrinhoProduto);

    setQuantidade(quantidade - 1);

    if (quantidade === 0) {
      deleteItem(idProduto);
    }
  }

return(
    <View style={styles.container_flatlist}>
      <View>
        <Image
          source={{uri: carrinhoProduto.imagem_produto}}
          style={{
            width: 113,
            height: 110,
            marginTop:10,
            alignSelf: 'flex-start',
            borderRadius: 10,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{flex: 1, alignSelf: 'center'}}>
        <Text style={styles.text}>{carrinhoProduto.nome_produto}</Text>
        <Text style={styles.text} numberOfLines={1}>
          {carrinhoProduto.descricao_produto}
        </Text>
        <Text style={[styles.text, styles.precoDe]}>
          De: R$ {(carrinhoProduto.preco_produto + carrinhoProduto.preco_produto  * 0.20)
            ?.toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </Text>
        <Text style={[styles.text, styles.precoPor]}>
          Por: R$ {carrinhoProduto.preco_produto
            ?.toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </Text>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            flex: 1,
            marginTop: 20,
          }}>
          <Text style={{marginRight: 10, marginLeft: 10}}>Quantidade: {quantidade}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{alignSelf: 'flex-end', bottom: 80, right: 0, top: -100}}
        onPress={() => deleteItem(carrinhoProduto.id_produto)}>
        <Icon name="x" color="#0D6EFD" type="feather" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container_flatlist: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: '#0D6EFD',
    paddingHorizontal: 10
  },
  precoDe:{
    marginTop: 10,
    marginLeft: -28,
    fontSize: 14,
    textDecorationLine:'line-through'
  },
  precoPor:{
    fontWeight:"bold",
    marginTop: 0,
    fontSize: 20
  },
  nomeLoader: {
    marginTop: 20,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  containerLoader: {
    position: 'relative',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D6EFD',
  },
});

export default ListCarrinho;
