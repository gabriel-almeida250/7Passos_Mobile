import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import AxiosInstance from '../api/AxiosInstance';
import {AutenticacaoContext} from '../contexts/AutenticacaoContext';
import {usePesquisar} from '../contexts/PesquisaContext';
import {CategoriaType} from '../models/CategoriaType';

export default function BarraPesquisa(props) {
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState<CategoriaType[]>([]);
  const {usuario} = useContext(AutenticacaoContext);
  const pesquisar = usePesquisar();

  const selecionaPesquisa = (categoria: any) => {
    pesquisar.Buscar(categoria);
    props.navigation.navigate('ProdutoCategoriaScreen');
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
    <View style={{marginBottom: 20}}>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
        <TextInput
          placeholder="Pesquisar..."
          onChangeText={setPesquisa}
          autoCorrect={false}
          style={styles.input}
        />
      </View>
      <ScrollView contentContainerStyle={styles.MenuSanfona}>
        {categoria
          .filter(val => {
            if (pesquisa.length <= 0) {
              return;
            } else if (
              val.nomeCategoria.toLowerCase().includes(pesquisa.toLowerCase())
            ) {
              return val;
            }
          })
          .map((categoria, indice) => (
            <Text
              onPress={e => selecionaPesquisa(categoria)}
              key={indice}
              style={{fontSize: 15, padding: 20}}
              >
              {categoria.nomeCategoria}
            </Text>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    marginBottom: 10,
    borderRadius: 0,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#ff0000',
    color: '#ffffff',
    borderRadius: 20,
    
  },
  MenuSanfona: {
    backgroundColor: 'red',
    borderRadius: 25,
    justifyContent: 'center',
  },
});