import React, { useContext, useEffect, useState, useCallback } from "react";
import {  Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { CarrinhoContext } from "../contexts/CarrinhoContext";

const ListCarrinho = (props:any) => {

    const carrinhoProduto = props.item
    const { listarProdutos, removerItemProduto } = useContext(CarrinhoContext);
    const [carrinho, setCarrinho] = useState();
    const [quantidade, setQuantidade] = useState(1)
    const [carregando, setCarregando] = useState(true);
    const [total, setTotal] = useState(0);


    const getDadosCarrinho = () => {      
      setCarrinho(listarProdutos());
    }
    
    const deleteItem = (idProduto:number) => {
      removerItemProduto(idProduto)
    }
    
    function removeItem(idProduto:number){
      setQuantidade(quantidade - 1)
      
      if(quantidade === 0 ){
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
    <View style={styles.container_flatlist}>
                <View >
                <Image source={{uri:carrinhoProduto.imagem_produto}} style={{width: 113, height: 97, alignSelf:"flex-start", borderRadius: 10, resizeMode:'contain'}}/>
                </View>
                <View style={{flex: 1, alignSelf:"center"}}>
                <Text style={styles.text}>{carrinhoProduto.nome_produto}</Text>
                <Text style={styles.text} numberOfLines={1}>{carrinhoProduto.descricao_produto}</Text>
                <Text style={styles.text}>{carrinhoProduto.preco_produto?.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')}</Text>
                  <View style={{alignSelf: "center", flexDirection: "row", flex:1, marginTop:20}}>
                  <Button 
                  buttonStyle={{height: 16, width:30}}
                  onPress={() => removeItem(carrinhoProduto.id_produto)}
                  title={'-'}
                  titleStyle={{color:'white'}}
                  />
                  <Text style={{marginRight: 10, marginLeft: 10}}>{quantidade}</Text>
                      <Button 
                      buttonStyle={{height: 16, width:30}}
                      onPress={() => setQuantidade(quantidade + 1)}
                      title={'+'}
                      />
                  </View>
                </View>
                <TouchableOpacity 
                style={{alignSelf:"flex-end", bottom: 80, left:8}}
                onPress={() => deleteItem(carrinhoProduto.id_produto)}>
                    <Icon name="x" color='#0D6EFD' type="feather" size={25}/>
                </TouchableOpacity>
            </View>
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

export default ListCarrinho;