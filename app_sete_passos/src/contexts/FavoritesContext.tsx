import React, { createContext } from 'react';
import Realm from 'realm';

export const FavoritesContext = createContext({});

class ProdutoSchemaFavoritas extends Realm.Object {}
ProdutoSchemaFavoritas.schema = {
  name: 'ProdutoFavoritos',
  properties: {
    id_produto: {type: 'int', default: 0},
    nome_produto: 'string',
    descricao_produto: 'string',
    preco_produto: 'double',
    imagem_produto: 'string',
  },
};

let realm_favorites = new Realm({schema: [ProdutoSchemaFavoritas], schemaVersion: 1});

export const FavoritesProvider= ({children}) => {
  const listarProdutosFavoritos = () => {
    return realm_favorites.objects('ProdutoFavoritos');
  };
  const adicionarProdutoFavoritos = (
    _nome: string,
    _descricao: string,
    _preco: number,
    _imagem: string,
  ) => {
    const ultimoProdutoCadastrado = realm_favorites
      .objects('ProdutoFavoritos')
      .sorted('id_produto', true)[0];
    const ultimoIdCadastrado =
      ultimoProdutoCadastrado == null ? 0 : ultimoProdutoCadastrado.id_produto;
    const proximoId = ultimoIdCadastrado == null ? 1 : ultimoIdCadastrado + 1;

    realm_favorites.write(() => {
      const produto = realm_favorites.create('ProdutoFavoritos', {
        id_produto: proximoId,
        nome_produto: _nome,
        descricao_produto: _descricao,
        preco_produto: _preco,
        imagem_produto: _imagem,
      });
    });

    console.log(JSON.stringify(realm_favorites.objects('ProdutoFavoritos')));
  };

  const removerItemProdutoFavoritos = (_id) => {
    realm_favorites.write(() =>
      realm_favorites.delete(
        realm_favorites.objects('ProdutoFavoritos').filter(produto => produto.id_produto == _id),
      ),
    )
  }

  return (
    <FavoritesContext.Provider
      value={{
        listarProdutosFavoritos,
        adicionarProdutoFavoritos,
        removerItemProdutoFavoritos,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};
