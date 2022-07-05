import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AxiosInstance from '../../api/AxiosInstance';
import BarraPesquisa from '../../components/BarraPesquisa';
import CardProduto from '../../components/CardProduto';
import { AutenticacaoContext } from '../../contexts/AutenticacaoContext';
import { usePesquisar } from '../../contexts/PesquisaContext';
import { ProdutoType } from '../../models/ProdutoType';
import Loader from '../../components/Loader';

const Categories = ({ navigation}) => {

  const [categoria, setCategoria] = useState<ProdutoType[]>([]);
  const [loading, setLoading] = useState(false)
  const {usuario} = useContext(AutenticacaoContext);
  const pesquisar = usePesquisar();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getDadosCategoria();
  }, []);

  const getDadosCategoria = async () => {
    //setLoading(true)
    AxiosInstance.get(`/categoria`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
      .then(result => {
        console.log('Dados das categorias: ' + JSON.stringify(result.data));
        setCategoria(result.data);
       //setLoading(false)
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a lista de categorias - ' + JSON.stringify(error),
        );
      });
  };

  function ListCategoria({categoria}) {
    return (
      <TouchableOpacity 
      onPress={() => navigation.navigate('ProductsCategoriesScreen')}
      >
      <Card containerStyle={styles.card_style}>
        <Card.Image
          style={styles.imagens_cards}
          source={{uri:categoria.nomeImagem}}
        />
        <Card.Divider />
        <Card.Title style={styles.titulo_cards}>{categoria.nomeCategoria}</Card.Title>
      </Card>
      </TouchableOpacity>
    );
  };

  setTimeout(() => {
    if (categoria) {
      setCarregando(false);
    }
  }, 2000);

  return (
    <View style={styles.container}>
    
      <Text style={{textAlign:'center', color:'white', marginTop: 20, fontSize: 30, marginBottom: 30}}>Categorias</Text>
    {carregando && (
         <View style={styles.containerLoader}>
         <Loader cor="white" />
         <Text style={styles.nomeLoader}>Carregando</Text>
       </View>
      )}
      {!carregando && (
       <FlatList 
        data={categoria}
        keyExtractor={(item, index) => String(item.idCategoria)}
        renderItem={({ item }) => <ListCategoria  categoria={item} />}
        style={styles.cardCategoria}
        // onEndReached={getDadosProduto}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={ <FooterList load={loading}/>}
        />
        )}
    </View>
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
      alignItems: 'center'
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
  },
  cardCategoria:{
    backgroundColor:'#0D6EFD',
  },
  card_style: {
    backgroundColor: '#D9D9D9',
    padding: 0,
    margin: 0,
    marginBottom: 30,
    width: 305,
    height: 284,
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
    fontSize: 20,
    color: 'black',
    marginTop:10
  },
  descricao_cards: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#181717',
  },
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

export default Categories;