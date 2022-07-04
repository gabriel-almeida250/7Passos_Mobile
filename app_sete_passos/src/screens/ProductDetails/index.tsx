import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, Image } from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';
import { ProdutoType } from '../../models/ProdutoType';
import { AutenticacaoContext } from '../../contexts/AutenticacaoContext';
import CardProduto from '../../components/CardProduto';

const ProductDetails = ({ route, navigation }) => {
  const { dadosDoProduto } = route.params;
  console.log('Entrou', dadosDoProduto);

  //const {adicionarProduto} = useContext(CarrinhoContext);

  // const handleAddProduto = () => {
  //   adicionarProduto(
  //     dadosDoProduto.sku,
  //     dadosDoProduto.nomeProduto,
  //     dadosDoProduto.descricaoProduto,
  //     dadosDoProduto.precoProduto ? dadosDoProduto.precoProduto : 0,
  //     dadosDoProduto.imagemProduto,
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.containerPai}>
        <Image
          style={styles.containerImagem}
          source={{ uri: dadosDoProduto.imagemProduto }}
        />
      </View>
      <View style={styles.containerProduto}>
        <Text style={styles.nome_produto}>{dadosDoProduto.nomeProduto}</Text>
        <Text style={styles.descricao_produto}>{dadosDoProduto.descricaoProduto}</Text>
        <Text style={styles.preco_produto}>R${dadosDoProduto.precoProduto}</Text>
        <View style={styles.containerProduto}>
            <TouchableOpacity
            style={styles.btt_tamanhos}>
            <Text style={styles.txt_btt_tamanhos}>36</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btt_tamanhos}>
            <Text style={styles.txt_btt_tamanhos}>37</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btt_tamanhos}>
            <Text style={styles.txt_btt_tamanhos}>38</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btt_tamanhos}>
            <Text style={styles.txt_btt_tamanhos}>39</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btt_tamanhos}>
            <Text style={styles.txt_btt_tamanhos}>40</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btt_tamanhos}>
            <Text style={styles.txt_btt_tamanhos}>41</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <FlatList
          data={produto}
          keyExtractor={(item, index) => String(item.idProduto)}
          renderItem={({ item }) => <ListProduto produto={item} />}
          horizontal={true}
        //onEndReached={getDadosProduto}
        //onEndReachedThreshold={0.1}
        //ListFooterComponent={ <FooterList load={loading}/>}
        /> */}
      <View style={styles.container_comprar}>
        <TouchableOpacity
          style={styles.btt_comprar}>
          <Text style={styles.txt_btt_comprar}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C78FF',
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    display: 'flex'
  },
  containerPai: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  containerImagem: {
    marginTop: -16,
    //marginLeft: -15,
    width: '110%',
    height: '110%',
    //width: 358,
    //height: 250,
  },
  containerProduto: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    paddingTop: 30
    //marginTop:  
    //backgroundColor: 'red'

  },
  nome_produto: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    marginLeft: 20
  },
  descricao_produto: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20
  },
  preco_produto: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 50,
    marginLeft: 20
  },
  btt_tamanhos: {
    //backgroundColor: 'green',
    height: '25%',
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 12
  },
  txt_btt_tamanhos: {
    backgroundColor: 'white',
    borderRadius: 300,
    width: 35,
    height: 35,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 'auto',
    padding: 2,
  },
  container_comprar: {
    marginTop: -20,
  },
  btt_comprar: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    marginBottom: 20,
    width: '55%',
    height: 45,
    borderRadius: 8,
    alignSelf: 'center',
  },
  txt_btt_comprar: {
    color: '#1C78FF',
    fontSize: 18,
    textAlign: 'center'
  },
});

export default ProductDetails;