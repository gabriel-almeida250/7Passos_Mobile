import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, View, TextInput, StyleSheet} from 'react-native';
import {Icon, Input, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import AxiosInstance from '../api/AxiosInstance';
import {AutenticacaoContext} from '../contexts/AutenticacaoContext';
import {usePesquisar} from '../contexts/PesquisaContext';
import { ProdutoType } from '../models/ProdutoType';

export default function BarraPesquisa(props) {
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState<ProdutoType[]>([]);
  const {usuario} = useContext(AutenticacaoContext);
  const pesquisar = usePesquisar();

  const selecionaPesquisa = (categoria: any) => {
    pesquisar.Buscar(categoria);
    props.navigation.navigate({
      name: 'ProductDetailsScreen',
      params: {
        dadosDoProduto: categoria,
      },
    });
    setPesquisa('');
  };
  useEffect(() => {
    getDadosCategoria();
  }, []);

  const getDadosCategoria = async () => {
    AxiosInstance.get(`/produto/busca?keyword=${pesquisa}`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
      .then(result => {
        // console.log('Dados das categorias:' + JSON.stringify(result.data));
        setCategoria(result.data);
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a lista de categoria - ' + JSON.stringify(error),
        );
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 15,
        marginTop: 20,
        paddingRight: 15,
        alignItems: 'center',
      }}>
      <View style={styles.containerPesquisa}>
        <Input
          placeholder="Pesquisar"
          value={pesquisa}
          onChangeText={setPesquisa}
          rightIcon={
            <Icon name="search" color="black" type="font-awesome" size={26} />
          }
          inputContainerStyle={styles.inputs}
          placeholderTextColor={'black'}
        />
      </View>
      <ScrollView style={styles.resultadoContainer}>
        {categoria
          .filter(val => {
            if (pesquisa.length <= 0) {
              return;
            } else if (
              val.nomeProduto.toLowerCase().includes(pesquisa.toLowerCase())
            ) {
              return val;
            }
          })
          .map((categoria, indice) => (
            <Text
              style={styles.pesquisaResultado}
              onPress={e => selecionaPesquisa(categoria)}
              key={indice}>
              {categoria.nomeProduto}
            </Text>
          ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerPesquisa: {
    width: '100%',
    maxWidth: 346.5,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 43,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputs: {
    color: 'black',
    borderBottomColor: 'white',
    padding: 5,
    marginTop: 30,
    flex: 1,
  },
  resultadoContainer: {
    width: '100%',
    marginTop: 5,
    position: 'absolute',
    zIndex: 1,
    top: 42,
    left: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  pesquisaResultado: {
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 15,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottomColor: 'black',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginTop: 2,
  },
});
