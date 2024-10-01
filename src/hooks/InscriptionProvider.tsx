/* eslint-disable react/react-in-jsx-scope */
import {useContext, useState} from 'react';
import {InscriptionContext} from '../contexts/inscriptionContext';
import {initialDataInscription} from '../utils/data';
import {IDataInscription} from '../types/api';

const InscriptionProvider = ({children}: any) => {
  const [inscriptionData, setInscriptionData] = useState<IDataInscription>(
    initialDataInscription,
  );
  return (
    <InscriptionContext.Provider value={{inscriptionData, setInscriptionData}}>
      {children}
    </InscriptionContext.Provider>
  );
};

export default InscriptionProvider;
export const useInscription = () => useContext(InscriptionContext);
