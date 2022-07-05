import React, {useContext} from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {Image, Text} from 'react-native-elements';
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
  // console.log('Usuario: ' + JSON.stringify(usuario));
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
    'https://images-ext-2.discordapp.net/external/soXks4RbTqJlWu41UuuQBEwqOWMTyJZUCfZwrZETbTU/%3Fv%3D637850404090930000/https/artwalk.vteximg.com.br/arquivos/ids/245218/tenis-air-jordan-4-retro-military-black-masculino-1.jpg?width=406&height=406',
    'https://images-ext-1.discordapp.net/external/Hmz6TTmYNpLIYsMwpWaeSRhG9yr_pkBzArZGhIDpchQ/%3Fts%3D1632126026%26ims%3D544x/https/static.zattini.com.br/produtos/bota-coturno-feminina-vicerinne-tratorada-salto-alto/06/GYK-0049-006/GYK-0049-006_zoom3.jpg?width=406&height=406',
  ];

  return (
    <ScrollView style={styles.container}>
       <View  style={styles.logoalinhar}>
            <Image style={styles.logo}
              source={{
                uri: 'https://media.discordapp.net/attachments/972547744516415540/992889603579199549/Frame.png',
              }}
            />
          </View>
      <BarraPesquisa navigation={navigation} />
      {carregando && (
        <View style={styles.containerLoader}>
          <Loader cor="white" />
          <Text style={styles.nomeLoader}>Carregando</Text>
        </View>
      )}
      {!carregando && (
        <View>
          <View style={styles.estilizandoCarro}>
          <Carrousel imagens={imagens} />
          </View>
          <Text style={styles.titulo_secao}>{'Mais vendidos'}</Text>

          <View style={styles.estilizandoCard}>
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
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D6EFD',
    padding: 0,
  },
  logoalinhar:{
alignItems:'center'
  },
    estilizandoCarro:{
      flex:1,
      alignItems:'center',
      flexDirection:'row',
    },
  logo:{
    height: 51,
    width: 153,
    marginTop:15,
    marginBottom: 15,
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
  estilizandoCard:{
    justifyContent:'center',
    alignItems:'center'
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
