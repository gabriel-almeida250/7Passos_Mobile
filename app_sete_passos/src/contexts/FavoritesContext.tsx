import React, { createContext } from 'react';
import Realm from 'realm';
import { realm_carrinho } from './CarrinhoContext';

export const FavoritesContext = createContext({});


export const FavoritesProvider= ({children}) => {
  const listarProdutosFavoritos = () => {
    return realm_carrinho.objects('ProdutoFavoritos');
  };
  const contaQuantidadeProdutos = () => {
    return realm_carrinho.objects('ProdutoFavoritos').length;
  };
  const adicionarProdutoFavoritos = (
    _sku: string,
    _nome: string,
    _descricao: string,
    _preco: number,
    _imagem: string,
  ) => {
    const ultimoProdutoCadastrado = realm_carrinho
      .objects('ProdutoFavoritos')
      .sorted('id_produto', true)[0];
    const ultimoIdCadastrado =
      ultimoProdutoCadastrado == null ? 0 : ultimoProdutoCadastrado.id_produto;
    const proximoId = ultimoIdCadastrado == null ? 1 : ultimoIdCadastrado + 1;

    realm_carrinho.write(() => {
      const produto = realm_carrinho.create('ProdutoFavoritos', {
        id_produto: proximoId,
        sku: _sku,
        nome_produto: _nome,
        descricao_produto: _descricao,
        preco_produto: _preco,
        imagem_produto: _imagem,
      });
    });

    console.log(JSON.stringify(realm_carrinho.objects('ProdutoFavoritos')));
  };

  const removerItemProdutoFavoritos = (_id) => {
    realm_carrinho.write(() =>
    realm_carrinho.delete(
      realm_carrinho.objects('ProdutoFavoritos').filter(produto => produto.id_produto == _id),
      ),
    )
  }

  return (
    <FavoritesContext.Provider
      value={{
        listarProdutosFavoritos,
        contaQuantidadeProdutos,
        adicionarProdutoFavoritos,
        removerItemProdutoFavoritos,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};