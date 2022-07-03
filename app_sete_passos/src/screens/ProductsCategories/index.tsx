import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import AxiosInstance from '../../api/AxiosInstance';
import BarraPesquisa from '../../components/BarraPesquisa';
import CardProduto from '../../components/CardProduto';
import { AutenticacaoContext } from '../../contexts/AutenticacaoContext';
import { usePesquisar } from '../../contexts/PesquisaContext';
import { ProdutoType } from '../../models/ProdutoType';

const ProductsCategories = ({ navigation}) => {

  const [produto, setProdutos] = useState<ProdutoType[]>([]);
  const [loading, setLoading] = useState(false)
  const [semProduto, setSemProduto] = useState(false)
  const {usuario} = useContext(AutenticacaoContext);
  const pesquisar = usePesquisar();

  useEffect(() => {
    getProdutos();
  }, []);

  const getProdutos = async () => {
    // setLoading(true);
    AxiosInstance.get(`/produto`, {
      headers: {'Authorization': `Bearer ${usuario.token}`},
    })
      .then(result => {
        console.log('Dados dos produtos:' + JSON.stringify(result.data));
        setProdutos(result.data);
        // setLoading(false);
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a lista de produtos - ' + JSON.stringify(error),
        );
      });
  };

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

  return (
    <>
    <StatusBar
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
        />
        <ScrollView style={{backgroundColor: '#0D6EFD'}}>
          <BarraPesquisa />
    <View style={styles.container}>
     
      {!semProduto &&(
       <FlatList 
        data={produto}
        keyExtractor={(item, index) => String(item.idProduto)}
        renderItem={({ item }) => <ListProduto  produto={item} />}
        numColumns={2}
        // onEndReached={getDadosProduto}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={ <FooterList load={loading}/>}
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
    </ScrollView>
    </>
  );
}

// function FooterList({load}) {
//   if (!load) return null;
//   return(
//     <View style={styles.loading}>
//       <ActivityIndicator size={25} color='red' />
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D6EFD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0
    
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
