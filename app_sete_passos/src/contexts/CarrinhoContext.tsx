import React, { createContext } from 'react';
import Realm from 'realm';

export const CarrinhoContext = createContext({});

class ProdutoSchema extends Realm.Object {}
ProdutoSchema.schema = {
  name: 'Produto',
  properties: {
    id_produto: {type: 'int', default: 0},
    sku: 'string',
    nome_produto: 'string',
    descricao_produto: 'string',
    preco_produto: 'double',
    imagem_produto: 'string',
  },

};

class ProdutoSchemaFavorites extends Realm.Object {}
ProdutoSchemaFavorites.schema = {
  name: 'ProdutoFavoritos',
  properties: {
    id_produto: {type: 'int', default: 0},
    sku: 'string',
    nome_produto: 'string',
    descricao_produto: 'string',
    preco_produto: 'double',
    imagem_produto: 'string',
  },
};

export let realm_carrinho = new Realm({schema: [ProdutoSchema, ProdutoSchemaFavorites], schemaVersion: 7});

export const CarrinhoProvider= ({children}) => {
  const listarProdutos = () => {
    return realm_carrinho.objects('Produto');
  };

  const contaQuantidadeProdutos = () => {
    return realm_carrinho.objects('Produto').length;
  };
  
  const adicionarProduto = (
    _sku: string,
    _nome: string,
    _descricao: string,
    _preco: number,
    _imagem: string,
  ) => {
    const ultimoProdutoCadastrado = realm_carrinho
      .objects('Produto')
      .sorted('id_produto', true)[0];
    let ultimoIdCadastrado =
      ultimoProdutoCadastrado == null ? 0 : ultimoProdutoCadastrado.id_produto;
    let proximoId = ultimoIdCadastrado == null ? 1 : ultimoIdCadastrado + 1;
    

    realm_carrinho.write(() => {
      const produto = realm_carrinho.create('Produto', {
        id_produto: proximoId,
        sku: _sku,
        nome_produto: _nome,
        descricao_produto: _descricao,
        preco_produto: _preco,
        imagem_produto: _imagem,
      });
    });

    console.log(JSON.stringify(realm_carrinho.objects('Produto')));
  };

  const removerItemProduto = (_id) => {
    realm_carrinho.write(() =>
      realm_carrinho.delete(
        realm_carrinho.objects('Produto').filter(produto => produto.id_produto == _id),
      ),
    )
  }

  const removerTodosProdutos = () => {
    realm_carrinho.write(() =>{
      realm_carrinho.deleteAll();
    })
  }

  realm_carrinho.close

  return (
    <CarrinhoContext.Provider
      value={{
        listarProdutos,
        contaQuantidadeProdutos,
        adicionarProduto,
        removerItemProduto,
        removerTodosProdutos
      }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
