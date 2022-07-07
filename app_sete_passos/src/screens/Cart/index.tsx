import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import {CarrinhoContext} from '../../contexts/CarrinhoContext';
import ListCarrinho from '../../components/ListCarrinho';

const Cart = ({navigation}) => {
  const {listarProdutos, removerTodosProdutos, contaQuantidadeProdutos} =
    useContext(CarrinhoContext);
  const [carrinho, setCarrinho] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [total, setTotal] = useState(0);
  const [vazio, setVazio] = useState(false);

  const getDadosCarrinho = () => {
    setCarrinho(listarProdutos());
    if (listarProdutos() == 0) {
      setVazio(true);
    } else {
      setVazio(false);
    }
  };

  const finalizarCarrinho = () => {
    Alert.alert('Compra finalizada!');
    removerTodosProdutos();
  };

  setTimeout(() => {
    if (carrinho) {
      setCarregando(false);
    }
  }, 2000);

  useFocusEffect(
    useCallback(() => {
      getDadosCarrinho();
    }, []),
  );

  function ListProduto({produto}) {
    var totalTemp = 0;
    carrinho.map(valor => (totalTemp = totalTemp + valor.preco_produto));
    setTotal(totalTemp);
    return <ListCarrinho item={produto} />;
  }

  return (
    <>
      {carregando && (
        <View style={styles.containerLoader}>
          <Loader cor="white" />
          <Text style={styles.nomeLoader}>Carregando</Text>
        </View>
      )}
      {!carregando && (
        <View style={styles.Container}>
          <Text style={styles.tituloPagina}>Meu Carrinho</Text>
          {!vazio && (
            <FlatList
              data={carrinho}
              keyExtractor={(item, index) => item.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={carregando}
                  onRefresh={getDadosCarrinho}
                  colors={['#0D6EFD']}
                />
              }
              renderItem={({item}) => <ListProduto produto={item} />}
              ListFooterComponent={
                <View style={{marginLeft: 20}}>
                  <Text style={{color: 'white', marginLeft: 10}}>
                    Total Produto R$
                    {total
                      .toFixed(2)
                      .replace('.', ',')
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                  </Text>
                  <Text
                    style={{color: 'white', marginLeft: 10, marginBottom: 10}}>
                    Quantidade de Itens: {contaQuantidadeProdutos()}
                  </Text>
                  <Button
                    onPress={() => finalizarCarrinho()}
                    buttonStyle={{backgroundColor: '#D9D9D9'}}
                    titleStyle={{color: '#0D6EFD'}}
                    containerStyle={styles.btt_finalizar}
                    title="Finalizar Compra"
                  />
                </View>
              }
            />
          )}
          {vazio && (
            <View>
              <Text style={styles.nada}>Seu carrinho está vazio.</Text>
              <Text style={styles.segunda_frase}>
                Os produtos que você deseja estão te esperando!
              </Text>
              <Button
                title="Voltar para Home"
                onPress={() => navigation.navigate('HomeTabScreen')}
                titleStyle={styles.titulobotao}
                buttonStyle={styles.botaostyle}></Button>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#0D6EFD',
  },
  tituloPagina: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    fontSize: 30,
    marginBottom: 10,
  },
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
  btt_finalizar: {
    marginBottom: 20,
    width: 250,
    alignSelf: 'center',
  },
  botaostyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 210,
    alignSelf: 'center',
    marginTop: 85,
  },
  titulobotao: {
    color: '#0D6EFD',
    margin: 5,
    fontSize: 20,
  },
  nada: {
    fontSize: 38,
    textAlign: 'center',
    color: 'white',
    marginTop: 130,
    marginBottom: 15,
  },
  segunda_frase: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
});

export default Cart;
