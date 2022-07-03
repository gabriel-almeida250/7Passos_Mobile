import React, {useContext} from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {Text} from 'react-native-elements';
import {useEffect, useState} from 'react';
import AxiosInstance from '../../api/AxiosInstance';
import CardProduto from '../../components/CardProduto';
import {AutenticacaoContext} from '../../contexts/AutenticacaoContext';
import Loader from '../../components/Loader';
import BarraPesquisa from '../../components/BarraPesquisa';
import {ProdutoType} from '../../models/ProdutoType';
import Carrousel from '../../components/Carrousel';

const Home = ({navigation}) => {
  //console.log('Params:' + JSON.stringify(route));
  //console.log('token: ' + token);
  const {usuario} = useContext(AutenticacaoContext);
  console.log('Usuario: ' + JSON.stringify(usuario));
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    getProdutos();
  }, []);

  const getProdutos = async () => {
    AxiosInstance.get(`/produto`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
      .then(result => {
        console.log('Dados dos produtos:' + JSON.stringify(result.data));
        setProdutos(result.data);
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

  const imagens = [
    'https://st2.depositphotos.com/6544740/9337/i/600/depositphotos_93376372-stock-photo-sunset-over-sea-pier.jpg',
    'https://t.ctcdn.com.br/5XPASDBUosgmBv5Ptpxcd6eTJso=/512x288/smart/filters:format(webp)/i257652.jpeg',
  ];

  return (
    <ScrollView style={styles.container}>
      <BarraPesquisa navigation={navigation} />
      {carregando && (
        <View style={styles.containerLoader}>
          <Loader cor="white" />
          <Text style={styles.nomeLoader}>Carregando</Text>
        </View>
      )}
      {!carregando && (
        <View>
          <Carrousel imagens={imagens} />

          <Text style={styles.titulo_secao}>{'Mais vendidos'}</Text>

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
  container: {
    flex: 1,
    backgroundColor: '#0D6EFD',
    padding: 16,
  },
  titulo_secao: {
    marginVertical: 20,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
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
    marginTop: '50%',
  },
});

export default Home;
