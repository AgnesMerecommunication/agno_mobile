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
    mod: require('../../assets/images/mod/mod1.png'),
    cat: require('../../assets/images/cat/cat1.png'),
  },
  {
    checked: false,
    id: cardId.card2,
    horizontal : true,
    mod: require('../../assets/images/mod/mod2.png'),
    cat: require('../../assets/images/cat/cat2.png'),
  },
  {
    checked: false,
    id: cardId.card3,
    horizontal : true,
    mod: require('../../assets/images/mod/mod3.png'),
    cat: require('../../assets/images/cat/cat3.png'),
  },
  {
    checked: false,
    id: cardId.card4,
    horizontal : true,
    mod: require('../../assets/images/mod/mod4.png'),
    cat: require('../../assets/images/cat/cat4.png'),
  },
  {
    checked: false,
    id: cardId.card5,
    horizontal : true,
    mod: require('../../assets/images/mod/mod5.png'),
    cat: require('../../assets/images/cat/cat5.png'),
  },
  {
    checked: false,
    id: cardId.card6,
    horizontal : true,
    mod: require('../../assets/images/mod/mod6.png'),
    cat: require('../../assets/images/cat/cat6.png'),
  },
  {
    checked: false,
    id: cardId.card7,
    horizontal : true,
    mod: require('../../assets/images/mod/mod7.png'),
    cat: require('../../assets/images/cat/cat7.png'),
  },
  {
    checked: false,
    id: cardId.card8,
    horizontal : true,
    mod: require('../../assets/images/mod/mod8.png'),
    cat: require('../../assets/images/cat/cat8.png'),
  },
  {
    checked: false,
    id: cardId.card9,
    horizontal : true,
    mod: require('../../assets/images/mod/mod9.png'),
    cat: require('../../assets/images/cat/cat9.png'),
  },
  {
    checked: false,
    id: cardId.card10,
    horizontal : true,
    mod: require('../../assets/images/mod/mod10.png'),
    cat: require('../../assets/images/cat/cat10.png'),
  },
  {
    checked: false,
    id: cardId.card11,
    horizontal : true,
    mod: require('../../assets/images/mod/mod11.png'),
    cat: require('../../assets/images/cat/cat11.png'),
  },
  {
    checked: false,
    id: cardId.card12,
    horizontal : true,
    mod: require('../../assets/images/mod/mod12.png'),
    cat: require('../../assets/images/cat/cat12.png'),
  },
  {
    checked: false,
    id: cardId.card13,
    horizontal : true,
    mod: require('../../assets/images/mod/mod13.png'),
    cat: require('../../assets/images/cat/cat13.png'),
  },
  {
    checked: false,
    id: cardId.card14,
    horizontal : true,
    mod: require('../../assets/images/mod/mod14.png'),
    cat: require('../../assets/images/cat/cat14.png'),
  },
  {
    checked: false,
    id: cardId.card15,
    horizontal : true,
    mod: require('../../assets/images/mod/mod15.png'),
    cat: require('../../assets/images/cat/cat15.png'),
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
  /*{
    checked: false,
    id: cardId.card18,
    horizontal : false,
    mod: require('../../assets/images/mod/mod18.png'),
    cat: require('../../assets/images/cat/cat18.png'),
  },
  {
    checked: false,
    id: cardId.card19,
    horizontal : false,
    mod: require('../../assets/images/mod/mod19.png'),
    cat: require('../../assets/images/cat/cat19.png'),
  },*/
  {
    checked: false,
    id: cardId.card20,
    horizontal : true,
    mod: require('../../assets/images/mod/mod20.png'),
    cat: require('../../assets/images/cat/cat20.png'),
  },
  /*{
    checked: false,
    id: cardId.card21,
    horizontal : true,
    mod: require('../../assets/images/mod/mod21.png'),
    cat: require('../../assets/images/cat/cat21.png'),
  },  */{
    checked: false,
    id: cardId.card22,
    horizontal : true,
    mod: require('../../assets/images/mod/mod22.png'),
    cat: require('../../assets/images/cat/cat22.png'),
  },  /*{
    checked: false,
    id: cardId.card23,
    horizontal : true,
    mod: require('../../assets/images/mod/mod23.png'),
    cat: require('../../assets/images/cat/cat23.png'),
  },  {
    checked: false,
    id: cardId.card24,
    horizontal : false,
    mod: require('../../assets/images/mod/mod24.png'),
    cat: require('../../assets/images/cat/cat24.png'),
  },
  {
    checked: false,
    id: cardId.card25,
    horizontal : false,
    mod: require('../../assets/images/mod/mod25.png'),
    cat: require('../../assets/images/cat/cat25.png'),
  },*/
  {
    checked: false,
    id: cardId.card26,
    horizontal : true,
    mod: require('../../assets/images/mod/mod26.png'),
    cat: require('../../assets/images/cat/cat26.png'),
  },/*  {
    checked: false,
    id: cardId.card27,
    horizontal : true,
    mod: require('../../assets/images/mod/mod27.png'),
    cat: require('../../assets/images/cat/cat27.png'),
  },*/
  {
    checked: false,
    id: cardId.card28,
    horizontal : true,
    mod: require('../../assets/images/mod/mod28.png'),
    cat: require('../../assets/images/cat/cat28.png'),
  },
 /* {
    checked: false,
    id: cardId.card29,
    horizontal : false,
    mod: require('../../assets/images/mod/mod29.png'),
    cat: require('../../assets/images/cat/cat29.png'),
  },
  {
    checked: false,
    id: cardId.card30,
    horizontal : false,
    mod: require('../../assets/images/mod/mod30.png'),
    cat: require('../../assets/images/cat/cat30.png'),
  },*/
  {
    checked: false,
    id: cardId.card31,
    horizontal : true,
    mod: require('../../assets/images/mod/mod23.png'),
    cat: require('../../assets/images/cat/cat31.png'),
  },
  {
    checked: false,
    id: cardId.card32,
    horizontal : false,
    mod: require('../../assets/images/mod/mod32.png'),
    cat: require('../../assets/images/cat/cat32.png'),
  },
  {
    checked: false,
    id: cardId.card33,
    horizontal : false,
    mod: require('../../assets/images/mod/mod33.png'),
    cat: require('../../assets/images/cat/cat33.png'),
  },
];

export const uuidCustome = new Date().getTime().toString();
export const getExtension = (file1: string) => {
  return `${file1.slice(file1.lastIndexOf('.') - 1 + 2)}`;
};
