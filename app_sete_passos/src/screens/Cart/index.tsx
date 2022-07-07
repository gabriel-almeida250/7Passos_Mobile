import React, { useContext, useEffect, useState, useCallback } from "react";
import {   Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Loader from "../../components/Loader";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";
import ListCarrinho from "../../components/ListCarrinho";


const Cart = () => {
  const { listarProdutos, removerItemProduto } = useContext(CarrinhoContext);
  const [carrinho, setCarrinho] = useState();
  const [carregando, setCarregando] = useState(true);
  const [total, setTotal] = useState(0);
  const {contaQuantidadeProdutos} = useContext(CarrinhoContext);
  
  const getDadosCarrinho = () => { 
    setCarrinho(listarProdutos());
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
      keyExtractor={(item, index) => item.toString()}
      style={{backgroundColor:'#0D6EFD'}}
      ListHeaderComponent={
        <View>
      <Text style={{textAlign:'center', color:'white', marginTop: 20, fontSize: 30, marginBottom: 10}}>Meu Carrinho</Text>
        </View>
      }
      renderItem={({item, index}) =>{
        return(
          <ListCarrinho item={item}/>
        )
      }}
      ListFooterComponent={
        <View style={{marginLeft:20}}>
                <Text style={{color:'white', marginLeft:10}}>Total Produto R$</Text>
          <Text style={{color:'white', marginLeft:10, marginBottom: 10}}>Quantidade de Itens: {contaQuantidadeProdutos()}</Text>
              <Button 
              buttonStyle={{backgroundColor: '#D9D9D9'}}
              titleStyle={{color: '#0D6EFD'}}
              containerStyle={styles.btt_finalizar}
              title="Finalizar Compra"/>
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
  },
  btt_finalizar: {
    marginBottom:20,
    width: 250,
    alignSelf: 'center',
    
  }
});

export default Cart;