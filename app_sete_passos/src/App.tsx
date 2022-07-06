import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {AutenticacaoProvider} from './contexts/AutenticacaoContext';
import {PesquisaProvider} from './contexts/PesquisaContext';
import {CarrinhoProvider} from './contexts/CarrinhoContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

export default () => {
  return (
    <AutenticacaoProvider>
      <PesquisaProvider>
        <CarrinhoProvider>
          <FavoritesProvider>
          <Routes />
          </FavoritesProvider>
       </CarrinhoProvider>
      </PesquisaProvider>
    </AutenticacaoProvider>
  );
};
