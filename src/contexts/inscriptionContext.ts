import {createContext} from 'react';
import {initialDataInscription} from '../utils/data';

export const InscriptionContext = createContext<any>(initialDataInscription);
