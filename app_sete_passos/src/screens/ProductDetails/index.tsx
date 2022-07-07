import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {CarrinhoContext} from '../../contexts/CarrinhoContext';
import {Icon} from 'react-native-elements';
import {FavoritesContext} from '../../contexts/FavoritesContext';
import Loader from '../../components/Loader';

const ProductDetails = ({route, navigation}) => {
  const {dadosDoProduto} = route.params;
  console.log('Entrou', dadosDoProduto);

  const {adicionarProduto} = useContext(CarrinhoContext);
  const {adicionarProdutoFavoritos} = useContext(FavoritesContext);
  const [favorito, setFavorito] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const {contaQuantidadeProdutos} = useContext(CarrinhoContext);

  const handleAddProdutoCarrinho = () => {
    contaQuantidadeProdutos();
    Alert.alert('Produto adicionado ao carrinho');
    adicionarProduto(
      dadosDoProduto.sku,
      dadosDoProduto.nomeProduto,
      dadosDoProduto.descricaoProduto,
      dadosDoProduto.precoProduto ? dadosDoProduto.precoProduto : 0,
      dadosDoProduto.imagemProduto,
    );
  };

  const handleAddProdutoFavoritos = () => {
    adicionarProdutoFavoritos(
      dadosDoProduto.sku,
      dadosDoProduto.nomeProduto,
      dadosDoProduto.descricaoProduto,
      dadosDoProduto.precoProduto ? dadosDoProduto.precoProduto : 0,
      dadosDoProduto.imagemProduto,
    );
    setFavorito(!favorito);
    console.log('Entrou favorito' + dadosDoProduto);
  };

  setTimeout(() => {
    if (dadosDoProduto) {
      setCarregando(false);
    }
  }, 2000);

  return (
    <>
      {carregando && (
        <View style={styles.containerLoader}>
          <Loader cor="white" />
          <Text style={styles.nomeLoader}>Carregando</Text>
        </View>
      )}
      {!carregando && (
        <View style={styles.containerPai}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.btt_favoritar}
              onPress={() => handleAddProdutoFavoritos()}>
              {favorito && (
                <Icon name="heart" color="red" type="font-awesome" size={25} />
              )}
              {!favorito && (
                <Icon
                  name="heart-o"
                  color="red"
                  type="font-awesome"
                  size={25}
                />
              )}
            </TouchableOpacity>
            <Image
              style={styles.containerImagem}
              source={{uri: dadosDoProduto.imagemProduto}}
            />
          </View>
          <View style={styles.containerProduto}>
            <Text style={styles.nome_produto}>
              {dadosDoProduto.nomeProduto}
            </Text>
            <Text style={styles.descricao_produto}>
              {dadosDoProduto.descricaoProduto}
            </Text>
            <Text style={[styles.preco_produto, styles.precoDe]}>
              De: R${' '}
              {(dadosDoProduto.precoProduto + dadosDoProduto.precoProduto * 0.2)
                ?.toFixed(2)
                .replace('.', ',')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
            </Text>
            <Text style={styles.preco_produto}>
              Por: R$
              {dadosDoProduto.precoProduto
                ?.toFixed(2)
                .replace('.', ',')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
            </Text>
            <View style={styles.containerTamanho}>
              <TouchableOpacity style={styles.btt_tamanhos}>
                <Text style={styles.txt_btt_tamanhos}>36</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btt_tamanhos}>
                <Text style={styles.txt_btt_tamanhos}>37</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btt_tamanhos}>
                <Text style={styles.txt_btt_tamanhos}>38</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btt_tamanhos}>
                <Text style={styles.txt_btt_tamanhos}>39</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btt_tamanhos}>
                <Text style={styles.txt_btt_tamanhos}>40</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btt_tamanhos}>
                <Text style={styles.txt_btt_tamanhos}>41</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container_comprar}>
            <TouchableOpacity
              onPress={() => handleAddProdutoCarrinho()}
              style={styles.btt_comprar}>
              <Text style={styles.txt_btt_comprar}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerPai: {
    flex: 1,
    backgroundColor: '#0D6EFD',
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    display: 'flex',
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: -15,
    width: Dimensions.get('screen').width,
    height: 380,
  },
  precoDe: {
    translateY: 20,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  containerImagem: {
    //marginTop: 25,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    position: 'absolute',
    // width: 360,
    // height: 238,
  },
  btt_favoritar: {
    alignItems: 'stretch',
    marginTop: -200,
    marginLeft: 300,
    borderBottomWidth: 0,
    zIndex: 1,
  },
  nome_produto: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: -30,
  },
  descricao_produto: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
  },
  preco_produto: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 24,
    marginLeft: 20,
  },
  containerProduto: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    paddingTop: 10,
    margin: 'auto',
  },
  containerTamanho: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    flexDirection: 'row',
    //backgroundColor: 'red',
    marginLeft: 12,
  },
  btt_tamanhos: {
    height: '25%',
    padding: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 12,
    alignSelf: 'center',
  },
  txt_btt_tamanhos: {
    backgroundColor: 'white',
    borderRadius: 300,
    width: 35,
    height: 35,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
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
    color: '#0D6EFD',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProductDetails;
