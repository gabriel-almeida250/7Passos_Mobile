import React, { useContext, useEffect, useState } from "react";
import {  Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";

const Cart = () => {
  const { listarProdutos, removerItemProduto } = useContext(CarrinhoContext);
  const [carrinho, setCarrinho] = useState();
  
  const [quantidade, setQuantidade] = useState(1)
  
  useEffect(() => {
      getDadosCarrinho();
    }, []);
    
  const getDadosCarrinho = () => {
    console.log("AQuiiiiiiiiiiiiiiiiiiiiiii ",carrinho);

      setCarrinho(listarProdutos());
  }

  const deleteItem = (idProduto:number) => {
      removerItemProduto(idProduto)
  }

  function removeItem(idProduto:number){
    setQuantidade(quantidade - 1)

    if(quantidade < 1 ){
        deleteItem(idProduto)
    }
}

  return(
      <FlatList 
      data={carrinho}
      keyExtractor={(item, index) => index.toString()}
      style={{backgroundColor:'#0D6EFD'}}
      renderItem={({item, index}) =>{
          return(
              
              <View style={styles.container_flatlist}>
                  <View >
                  <Image source={{uri:item.imagem_produto}} style={{width: 113, height: 97, alignSelf:"flex-start", borderRadius: 10}}/>
                  </View>
                  <View style={{flex: 1, alignSelf:"center"}}>
                  <Text style={styles.text}>{item.nome_produto}</Text>
                  <Text style={styles.text}>{item.descricao_protudo}</Text>
                  <Text style={styles.text}>{item.preco_produto}</Text>
                    <View style={{alignSelf: "center", flexDirection: "row", flex:1}}>
                    <Button 
                    style={{width: 33,height: 16}}
                    onPress={() => removeItem(item.id_produto)}
                    title={'-'}
                    />
                    <Text style={{marginRight: 10, marginLeft: 10}}>{quantidade}</Text>
                        <Button 
                        style={{width: 40,height: 16 }}
                        onPress={() => setQuantidade(quantidade + 1)}
                        title={'+'}
                        />
                    </View>
                  </View>
                  <TouchableOpacity 
                  style={{alignSelf:"flex-end", bottom: 80, left:8}}
                  onPress={() => deleteItem(item.id_produto)}>
                      <Icon name="x" color='#0D6EFD' type="feather" size={25}/>
                  </TouchableOpacity>
              </View>
          )
      }}
      />
  )
}

const styles = StyleSheet.create({
    container_flatlist: {
       flexDirection:"row",
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
   margin: 20,
   padding: 10,
  }, 
  text:{
    textAlign: "center",
    color: '#0D6EFD'
  }
});

export default Cart;