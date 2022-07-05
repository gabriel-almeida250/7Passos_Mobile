import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native';
import { Card } from 'react-native-elements';
import AxiosInstance from '../../api/AxiosInstance';
import BarraPesquisa from '../../components/BarraPesquisa';
import CardProduto from '../../components/CardProduto';
import Loader from '../../components/Loader';
import { AutenticacaoContext } from '../../contexts/AutenticacaoContext';
import { usePesquisar } from '../../contexts/PesquisaContext';
import { ProdutoType } from '../../models/ProdutoType';

const ProductsCategories = ({ navigation}) => {

  const perPage = 2;
  const [produto, setProdutos] = useState<ProdutoType[]>([]);
  const [loading, setLoading] = useState(false)
  const [semProduto, setSemProduto] = useState(false)
  const [carregando, setCarregando] = useState(true);
  const {usuario} = useContext(AutenticacaoContext);
  const [page, setPage] = useState(1)
 
  useEffect(() => {
    loadApi();
  }, []);

  async function loadApi() {
    if (loading) return;

    setLoading(true);

    const response = await   AxiosInstance.get(`/produto?pagina=${page}&qtdRegistros=${perPage}`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
    setProdutos([...produto, ...response.data]);
    setPage(page +1);
    setLoading(false)

  }

  function ListProduto({produto}) {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate({
          name: 'ProductDetailsScreen',
          params: {
            dadosDoProduto: produto,
          },
        });
      }}>
    <CardProduto dados={produto}/>
    </TouchableOpacity>
    );
  }

  
  setTimeout(() => {
    if (produto) {
      setCarregando(false);
    }
  }, 2000);
  

  return (
    <>
    <StatusBar
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
        />        
        {carregando && (
      <View style={styles.containerLoader}>
      <Loader cor="white" />
      <Text style={styles.nomeLoader}>Carregando</Text>
    </View>
   )}
      {!carregando && (

    <View style={styles.container}>
     
      {!semProduto &&(
       <FlatList 
        data={produto}
        keyExtractor={(item, index) => String(item.idProduto)}
        renderItem={({ item }) => <ListProduto  produto={item} />}
        numColumns={2}
        onEndReached={loadApi}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ <FooterList load={loading}/>}
        />
        )}
        {semProduto &&(
          <View>
            <Text>
              {'Nenhum Produto encotrado'}
            </Text>
          </View>
        )}
    </View>
    )}
    </>
  );
}

function FooterList({load}) {
  if (!load) return null;
  return(
    <View style={styles.loading}>
      <ActivityIndicator size={25} color='red' />
    </View>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor:'#0D6EFD'
  },
  container: {
    flex: 1,
    backgroundColor: '#0D6EFD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  card_style: {
    backgroundColor: 'blue',
    padding: 0,
    margin: 0,
    marginBottom: 20,
    width: 110,
    maxHeight: 400,
    borderRadius: 5,
    borderWidth: 0,
    justifyContent: 'space-between'
  },
  imagens_cards: {
    height: 200,
    borderRadius: 5,

  },
  titulo_cards: {
    fontSize: 18,
    color: 'black',
  },
  // descricao_cards: {
  //   marginBottom: 10,
  //   fontSize: 16,
  //   textAlign: 'center',
  //   color: '#181717',
  // },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 25,
    fontSize: 20,
    paddingHorizontal: 20,
    marginBottom: 10
  }
});

export default ProductsCategories;
