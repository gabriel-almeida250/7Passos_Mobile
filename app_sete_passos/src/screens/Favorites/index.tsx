import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Alert, RefreshControl } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import Loader from '../../components/Loader';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { Card } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

const Favorites = ({ navigation }) => {
  const { listarProdutosFavoritos, removerItemProdutoFavoritos } =
    useContext(FavoritesContext);
  const [favorites, setFavorites] = useState();
  const [carregando, setCarregando] = useState(true);
  const [vazio, setVazio] = useState(false);

  useFocusEffect(useCallback(() => {
    getDadosFavorites();
  }, []));

  const getDadosFavorites = () => {
    setFavorites(listarProdutosFavoritos());
    if (listarProdutosFavoritos() == 0) {
      setVazio(true)
    } else {
      setVazio(false)
    }
  };

  const deleteItemFavorito = (idProduto: number) => {
    Alert.alert('Produto removido dos favoritos!');
    removerItemProdutoFavoritos(idProduto);
  };

  setTimeout(() => {
    if (favorites) {
      setCarregando(false);
    }
  }, 2000);

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
          <Text style={styles.tituloPagina}>Favoritos</Text>
          {!vazio && (
            <FlatList
              data={favorites}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={carregando}
                  onRefresh={getDadosFavorites}
                  colors={['#0D6EFD']}

                />
              }
              numColumns={2}
              style={{ backgroundColor: '#0D6EFD' }}
              renderItem={({ item, index }) => {
                return (
                    <View style={styles.container_favorito}>
                      <Card containerStyle={styles.card_style}>
                        <Card.Image
                          style={styles.imagens_cards}
                          source={{ uri: item.imagem_produto }}>
                          <TouchableOpacity
                            style={{
                              marginTop: 10,
                              alignSelf: 'flex-end',
                              marginRight: 12,
                            }}
                            onPress={() => deleteItemFavorito(item.id_produto)}>
                            <Icon
                              name="heart" color="red"
                              type="font-awesome"
                              size={25}
                            />
                          </TouchableOpacity>
                        </Card.Image>
                        <Card.Divider />
                        <Card.Title numberOfLines={1} style={styles.titulo_cards}>
                          {item.nome_produto}
                        </Card.Title>
                        <Card.Title style={styles.valor_cards}>
                          R$ {item.preco_produto?.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                        </Card.Title>
                      </Card>
                    </View>
                );
              }}
            />
          )}
          {vazio && (
            <View>
              <Text style={styles.nada}>{'OPS... Nenhum produto encontrado :('}</Text>
              <Button
                title='Voltar para Home'
                onPress={() => navigation.navigate('HomeTabScreen')}
                titleStyle={styles.titulobotao}
                buttonStyle={styles.botaostyle}>
              </Button>
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
  nada: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    marginTop: 180,
    width: 320,
    alignSelf: 'center'
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
  tituloPagina: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    fontSize: 30,
    marginBottom: 10
  },
  container_favorito: {
    marginTop: 25,
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
    backgroundColor: '#0D6EFD'
  },

  card_style: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: 0,
    width: 162,
    height: 240,
    borderRadius: 5,
    borderWidth: 0,
    elevation: 10,
    shadowColor: '#000306',
  },
  imagens_cards: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0,
    resizeMode: 'contain'
  },
  titulo_cards: {
    fontSize: 18,
    color: '#0a0a0a',
    textAlign: 'center',
    marginBottom: 3,
  },
  valor_cards: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
    color: '#181717',
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
});

export default Favorites;
