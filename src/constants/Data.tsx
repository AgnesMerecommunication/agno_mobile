import {cardId} from '../utils/data';

export const dataProfil = [
  {
    id: 1,
    profil: 'Personnel',
    status: true,
    title:
      'Votre carte de visite numérique sera conçue sur mesure pour répondre à vos besoins spécifiques et refléter votre image. Elle pourra inclure des informations de contact telles que votre adresse e-mail, votre numéro de téléphone et votre adresse physique',
  },
  {
    id: 2,
    profil: 'Professionnel',
    status: false,
    title:
      'Ce forfait de carte de visite digital est parfait pour les entrepreneurs, les professionnels, indépendants et les petites entreprises qui cherchent à se faire connaître en ligne. En plus d’avoir toutes les fonctionnalités de la carte personnel, Avec ce forfait vous pouvez créer une carte de visite en ligne qui reflète votre image de marque et vous aide à vous démarquer de la concurrence.',
  },
];
export const TYPES_PERIOD = {
  mensuel: 'mensuel',
  annuel: 'annuel',
};

export const TYPES_STYLE = {
  row: 'row',
  column: 'column',
  grid: true,
};
export type CartData = {
  checked: boolean,
  id: number,
  horizontal : boolean,
  mod: any,
  cat: any,
}
export const ModelCarte  : CartData[]= [
  {
    checked: false,
    id: cardId.card1,
    horizontal : true,
    mod: require('../../assets/images/mod1.png'),
    cat: require('../../assets/images/cat1.png'),
  },
  {
    checked: false,
    id: cardId.card2,
    horizontal : true,
    mod: require('../../assets/images/mod2.png'),
    cat: require('../../assets/images/cat2.png'),
  },
  {
    checked: false,
    id: cardId.card3,
    horizontal : true,
    mod: require('../../assets/images/mod3.png'),
    cat: require('../../assets/images/cat3.png'),
  },
  {
    checked: false,
    id: cardId.card4,
    horizontal : true,
    mod: require('../../assets/images/mod4.png'),
    cat: require('../../assets/images/cat4.png'),
  },
  {
    checked: false,
    id: cardId.card5,
    horizontal : true,
    mod: require('../../assets/images/mod5.png'),
    cat: require('../../assets/images/cat5.png'),
  },
  {
    checked: false,
    id: cardId.card6,
    horizontal : true,
    mod: require('../../assets/images/mod6.png'),
    cat: require('../../assets/images/cat6.png'),
  },
  {
    checked: false,
    id: cardId.card7,
    horizontal : true,
    mod: require('../../assets/images/mod7.png'),
    cat: require('../../assets/images/cat7.png'),
  },
  {
    checked: false,
    id: cardId.card8,
    horizontal : true,
    mod: require('../../assets/images/mod8.png'),
    cat: require('../../assets/images/cat8.png'),
  },
  {
    checked: false,
    id: cardId.card9,
    horizontal : true,
    mod: require('../../assets/images/mod9.png'),
    cat: require('../../assets/images/cat9.png'),
  },
  {
    checked: false,
    id: cardId.card10,
    horizontal : true,
    mod: require('../../assets/images/mod10.png'),
    cat: require('../../assets/images/cat10.png'),
  },
  {
    checked: false,
    id: cardId.card11,
    horizontal : true,
    mod: require('../../assets/images/mod11.png'),
    cat: require('../../assets/images/cat11.png'),
  },
  {
    checked: false,
    id: cardId.card12,
    horizontal : true,
    mod: require('../../assets/images/mod12.png'),
    cat: require('../../assets/images/cat12.png'),
  },
  {
    checked: false,
    id: cardId.card13,
    horizontal : true,
    mod: require('../../assets/images/mod13.png'),
    cat: require('../../assets/images/cat13.png'),
  },
  {
    checked: false,
    id: cardId.card14,
    horizontal : true,
    mod: require('../../assets/images/mod14.png'),
    cat: require('../../assets/images/cat14.png'),
  },
  {
    checked: false,
    id: cardId.card15,
    horizontal : true,
    mod: require('../../assets/images/mod15.png'),
    cat: require('../../assets/images/cat15.png'),
  },
  {
    checked: false,
    id: cardId.card16,
    horizontal : true,
    mod:require('../../assets/images/agnesMode1.png') ,
    cat:require('../../assets/images/agnes1.png'),
  },
  {
    checked: false,
    id: cardId.card17,
    horizontal : false,
    mod: require('../../assets/images/agnesMode2.png'),
    cat: require('../../assets/images/agnes2.png'),
  },
];

export const uuidCustome = new Date().getTime().toString();
export const getExtension = (file1: string) => {
  return `${file1.slice(file1.lastIndexOf('.') - 1 + 2)}`;
};
