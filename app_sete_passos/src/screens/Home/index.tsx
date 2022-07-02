import React, {useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
} from 'react-native';
import {Text} from 'react-native-elements';
import {useEffect, useState} from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import CardProduto from '../../components/CardProduto';
import {AutenticacaoContext} from '../../contexts/AutenticacaoContext';
import Loader from '../../components/Loader';
import BarraPesquisa from '../../components/BarraPesquisa';
import { ProdutoType } from '../../models/ProdutoType';

const Home = ({navigation}) => {
  //console.log('Params:' + JSON.stringify(route));
  //console.log('token: ' + token);
  const {usuario} = useContext(AutenticacaoContext);
  console.log('Usuario: ' + JSON.stringify(usuario));
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProdutos();
  }, []);

  const getProdutos = async () => {
    // setLoading(true);
    AxiosInstance.get(`/produto`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
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
  function ListProduto({produtos}) {
    return <CardProduto navigation={navigation} dados={produtos} />;
  }
  setTimeout(() => {
    if (produtos) {
      setCarregando(false);
    }
  }, 2000);

  return (
    <ScrollView style={styles.container}>
      <BarraPesquisa navigation={navigation}/>
      {carregando && (
        <View style={styles.containerLoader}>
          <Loader cor="pink" />
          <Text style={styles.nomeLoader}>Carregando</Text>
        </View>
      )}
      {!carregando && (
        <View>
          <Text style={styles.titulo_secao}>{'Cardápio'}</Text>

          <FlatList
            data={produtos}
            keyExtractor={(item, index) => String(item.idProduto)}
            renderItem={({item}) => <ListProduto produtos={item} />}
            numColumns={2}
            // onEndReached={getDadosCategoria}
            // onEndReachedThreshold={0.1}
            // ListFooterComponent={ <FooterList load={loading}/>}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#0d0d0e',
    padding: 16,
  },
  scroll_categorias: {
    flexGrow: 0,
  },

  view_itens_categoria: {
    width: 100,
    height: 100,
    backgroundColor: 'pink',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 15,
    marginTop:30
  },
  titulo_secao: {
    marginLeft: 15,
    fontSize: 25,
    color: 'pink',
  },
  card_style: {
    backgroundColor: 'pink',
    padding: 0,
    marginBottom: 20,
    width: 125,
    borderRadius: 5,
    borderWidth: 0,
  },
  imagens_cards: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0,
  },

  titulo_cards: {
    fontSize: 18,
    color: 'black',
  },
  card_grande: {
    backgroundColor: 'pink',
    padding: 0,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 0,
  },
  botao_categoria: {
    alignItems: 'center',
    padding: 10,
  },
  texto_nome_categoria: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17.5,
    padding: 5,
  },
  titulo_card: {
    fontSize: 25,
    color: 'black',
  },
  descricao_cards: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#181717',
  },
  descricao_card: {
    textAlign: 'center',
    fontSize: 20,
    color: '#181717',
    marginBottom: 15,
  },
  nomeLoader: {
    marginTop: 20,
    fontSize: 25,
    color: 'pink',
    textAlign: 'center',
  },
  containerLoader: {
    position: 'relative',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '50%',
  },
});

export default Home;
