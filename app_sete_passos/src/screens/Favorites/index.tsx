import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { FavoritesContext } from "../../contexts/FavoritesContext";

const Favorites = () => {

  const { listarProdutosFavoritos, removerItemProduto } = useContext(FavoritesContext);
  const [favorites, setFavorites] = useState();

  useEffect(() => {
      getDadosFavorites();
  }, []);

  const getDadosFavorites = () => {
      setFavorites(listarProdutosFavoritos());
  }

  const deleteItem = (idProduto:number) => {
      removerItemProduto(idProduto)
  }

  return(
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
                  <TouchableOpacity onPress={() => deleteItem(item.id_produto)}>
                      <Icon name="trash" color='black' type="font-awesome" size={36}/>
                  </TouchableOpacity>
              </View>
          )
      }}
      />
  )
}

const styles = StyleSheet.create({
  container_flatlist: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    marginTop:10
  }

});

export default Favorites;