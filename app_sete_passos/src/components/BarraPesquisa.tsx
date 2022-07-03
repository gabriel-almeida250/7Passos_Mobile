import React, {useState, useEffect, useContext} from 'react';
import {StatusBar, View, TextInput, StyleSheet} from 'react-native';
import {Icon, Input, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import AxiosInstance from '../api/AxiosInstance';
import {AutenticacaoContext} from '../contexts/AutenticacaoContext';
import {usePesquisar} from '../contexts/PesquisaContext';
import {CategoriaType} from '../models/CategoriaType';

export default function BarraPesquisa(props) {
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState<Categoriatype[]>([]);
  const {usuario} = useContext(AutenticacaoContext);
  const pesquisar = usePesquisar();

  const selecionaPesquisa = (categoria: any) => {
    pesquisar.Buscar(categoria);
    props.navigation.navigate('ProdutoCategoria');
    setPesquisa("")
    console.log('Categoria clicaca', pesquisar.pesquisa);

  };
  useEffect(() => {
    getDadosCategoria();
  }, []);

  const getDadosCategoria = async () => {
    AxiosInstance.get(`/categoria`, {
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
    <View style={{flex: 1, paddingLeft: 15, marginTop: 20, paddingRight: 15, alignItems: 'center'}}>
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
            if (pesquisa.length <= 1) {
              return;
            } else if (
              val.nomeCategoria.toLowerCase().includes(pesquisa.toLowerCase())
            ) {
              return val;
            }
          })
          .map((categoria, indice) => (
            <Text
              style={styles.pesquisaResultado}
              onPress={e => selecionaPesquisa(categoria)}
              key={indice}>
              {categoria.nomeCategoria}
            </Text>
          ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerPesquisa: {
    width: '100%',
    maxWidth:305,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    height: 43,
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
  },
  inputs: {
    color: 'black',
    borderBottomColor: '#D9D9D9',
    padding: 5,
    marginTop:30,
    flex: 1,
    
  },
  resultadoContainer: {
    width: '100%',
    marginTop: 5,
    position:'absolute',
    zIndex:1,
    top:60,
    left: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  pesquisaResultado: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    paddingLeft:15,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottomColor: 'black',
    fontWeight:'bold',
    borderBottomWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginTop:2,
  },
});