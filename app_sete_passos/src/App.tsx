import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import {AutenticacaoProvider} from './contexts/AutenticacaoContext';
import {PesquisaProvider} from './contexts/PesquisaContext';
//import {CarrinhoProvider} from './contexts/CarrinhoContext';

export default () => {
  return (
    <AutenticacaoProvider>
      <PesquisaProvider>
        {/* <CarrinhoProvider> */}
          <Routes />
       {/* </CarrinhoProvider> */}
      </PesquisaProvider>
    </AutenticacaoProvider>
  );
};
