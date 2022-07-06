import React, { createContext } from 'react';
import Realm from 'realm';

export const FavoritesContext = createContext({});

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

let realm_favorites = new Realm({schema: [ProdutoSchema], schemaVersion: 1});

export const FavoritesProvider= ({children}) => {
  const listarProdutosFavoritos = () => {
    return realm_favorites.objects('Produto');
  };
  const contaQuantidadeProdutos = () => {
    return realm_favorites.objects('Produto').length;
  };
  const adicionarProdutoFavoritos = (
    _sku: string,
    _nome: string,
    _descricao: string,
    _preco: number,
    _imagem: string,
  ) => {
    const ultimoProdutoCadastrado = realm_favorites
      .objects('Produto')
      .sorted('id_produto', true)[0];
    const ultimoIdCadastrado =
      ultimoProdutoCadastrado == null ? 0 : ultimoProdutoCadastrado.id_produto;
    const proximoId = ultimoIdCadastrado == null ? 1 : ultimoIdCadastrado + 1;

    realm_favorites.write(() => {
      const produto = realm_favorites.create('Produto', {
        id_produto: proximoId,
        sku: _sku,
        nome_produto: _nome,
        descricao_produto: _descricao,
        preco_produto: _preco,
        imagem_produto: _imagem,
      });
    });

    console.log(JSON.stringify(realm_favorites.objects('Produto')));
  };

  const removerItemProduto = (_id) => {
    realm_favorites.write(() =>
      realm_favorites.delete(
        realm_favorites.objects('Produto').filter(produto => produto.id_produto == _id),
      ),
    )
  }

  return (
    <FavoritesContext.Provider
      value={{
        listarProdutosFavoritos,
        contaQuantidadeProdutos,
        adicionarProdutoFavoritos,
        removerItemProduto,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};