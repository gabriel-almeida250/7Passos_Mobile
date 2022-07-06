import React, { useContext, useEffect, useState, useCallback } from "react";
import {  Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Loader from "../../components/Loader";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";

const Cart = () => {
  const { listarProdutos, removerItemProduto } = useContext(CarrinhoContext);
  const [carrinho, setCarrinho] = useState();
  const [quantidade, setQuantidade] = useState(1)
  const [carregando, setCarregando] = useState(true);
  
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
  
  setTimeout(() => {
    if (carrinho) {
      setCarregando(false);
    }
  }, 2000);
  
  useFocusEffect(useCallback(() => {
    getDadosCarrinho();
  } , []));

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
      data={carrinho}
      keyExtractor={(item, index) => index.toString()}
      style={{backgroundColor:'#0D6EFD'}}
      ListHeaderComponent={
        <View>
      <Text style={{textAlign:'center', color:'white', marginTop: 20, fontSize: 30, marginBottom: 10}}>Meu Carrinho</Text>
        </View>
      }
      renderItem={({item, index}) =>{
        
          return(
              <View style={styles.container_flatlist}>
                  <View >
                  <Image source={{uri:item.imagem_produto}} style={{width: 113, height: 97, alignSelf:"flex-start", borderRadius: 10, resizeMode:'contain'}}/>
                  </View>
                  <View style={{flex: 1, alignSelf:"center"}}>
                  <Text style={styles.text}>{item.nome_produto}</Text>
                  <Text style={styles.text} numberOfLines={1}>{item.descricao_protudo}</Text>
                  <Text style={styles.text}>{item.preco_produto?.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')}</Text>
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
      ListFooterComponent={
        <View style={{marginLeft:20}}>
          <Text style={{color:'white'}}>Total Compra: R${carrinho.preco_produto}</Text>
        </View>
      }
      />
      )}
      </>
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

export default Cart;