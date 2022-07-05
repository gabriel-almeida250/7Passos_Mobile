import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import Loader from "../../components/Loader";
import { FavoritesContext } from "../../contexts/FavoritesContext";

const Favorites = () => {

  const { listarProdutosFavoritos, removerItemProdutoFavoritos } = useContext(FavoritesContext);
  const [favorites, setFavorites] = useState();
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
      getDadosFavorites();
  }, []);

  const getDadosFavorites = () => {
      setFavorites(listarProdutosFavoritos());
  }

  const deleteItemFavorito = (idProduto:number) => {
      removerItemProdutoFavoritos(idProduto)
  }

  setTimeout(() => {
    if (favorites) {
      setCarregando(false);
    }
  }, 2000);

  return(
    <>
    {carregando && (
      <View style={styles.containerLoader}>
      <Loader cor="white" />
      <Text style={styles.nomeLoader}>Carregando</Text>
    </View>
   )}
       {!carregando && (

      <FlatList 
      data={favorites}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) =>{
          return(
              
              <View style={styles.container_flatlist}>
                  <Text>{item.id_produto}</Text>
                  <Text>{item.sku}</Text>
                  <Text>{item.nome_produto}</Text>
                  <Text>{item.imagem_produto}</Text>
                  <Text>{item.descricao_protudo}</Text>
                  <Text>{item.preco_produto}</Text>
                  <TouchableOpacity onPress={() => deleteItemFavorito(item.id_produto)}>
                      <Icon name="trash" color='black' type="font-awesome" size={36}/>
                  </TouchableOpacity>
              </View>
          )
      }}
      />
      )}
      </>
  )
}

const styles = StyleSheet.create({
  container_flatlist: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    marginTop:10
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
    backgroundColor:'#0D6EFD'
  }

});

export default Favorites;