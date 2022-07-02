import React, {createContext, useContext, useState} from 'react';

export const PesquisaContext = createContext({});

export const PesquisaProvider = ({children}) => {
  const [pesquisa, setPesquisa] = useState<any>();

  function Buscar(categoria: any) {
    setPesquisa(categoria);
  }
  return (
    <PesquisaContext.Provider
      value={{
        pesquisa,
        Buscar,
      }}>
      {children}
    </PesquisaContext.Provider>
  );
};
export const usePesquisar= () =>{
    const pesquisar= useContext(PesquisaContext);
    return pesquisar;
}
