import Carte15 from './Carte15';
import Carte1 from './Carte1';
import Carte12 from './Carte12';
import Carte2 from './Carte2';
import Carte3 from './Carte3';
import Carte4 from './Carte4';
import Carte5 from './Carte5';
import Carte6 from './Carte6';
import Carte7 from './Carte7';
import Carte8 from './Carte8';
import Carte9 from './Carte9';
import Carte10 from './Carte10';
import Carte11 from './Carte11';
import Carte13 from './Carte13';
import Carte14 from './Carte14';
import Carte16 from './Carte16';
import Carte17 from './Carte17';
import Carte18 from './Carte18';
import Carte19 from './Carte19';
import Carte20 from './Carte20';
import Carte21 from './Carte21';
import Carte22 from './Carte22';
import Carte23 from './Carte23';
import Carte24 from './Carte24';
import Carte25 from './Carte25';
import Carte26 from './Carte26';
import Carte28 from './Carte28';
import Carte29 from './Carte29';
import Carte30 from './Carte30';
import Carte31 from './Carte31';
import Carte32 from './Carte32';
import Carte33 from './Carte33';

export const getRenderCart = (id: any, data: any, code : string) => {
  switch (id) {
    case 1:
      return <Carte1 data={data} />;
    case 2:
      return <Carte2 data={data} />;
    case 3:
      return <Carte3 data={data} />;
    case 4:
      return <Carte4 data={data} />;
    case 5:
      return <Carte5 data={data} />;
    case 6:
      return <Carte6 data={data} />;
    case 7:
      return <Carte7 data={data} />;
    case 8:
      return <Carte8 data={data} />;
    case 9:
      return <Carte9 data={data} />;
    case 10:
      return <Carte10 data={data} />;
    case 11:
      return <Carte11 data={data} />;
    case 12:
      return <Carte12 data={data} />;
    case 13:
      return <Carte13 data={data} />;
    case 14:
      return <Carte14 data={data} />;
    case 15:
      return <Carte15 data={data} />;
    case 16:
        return <Carte16 data={data}  code={code}/>;
    case 17:
        return <Carte17 data={data} code={code}/>;
    case 18:
        return <Carte18 data={data} code={code}/>;
    case 19:
        return <Carte19 data={data} code={code}/>;
    case 20:
        return <Carte20 data={data} code={code}/>;
    case 21:
        return <Carte21 data={data} code={code}/>;
    case 22:
        return <Carte22 data={data} code={code}/>;
    case 23:
        return <Carte23 data={data} code={code}/>;
    case 24:
        return <Carte24 data={data} code={code}/>;
    case 25:
        return <Carte25 data={data} code={code}/>;
    case 26:
            return <Carte26 data={data} code={code}/>;
    case 28:
        return <Carte28 data={data} code={code}/>;
    case 29:
          return <Carte29 data={data} code={code}/>;
    case 30:
            return <Carte30 data={data} code={code}/>;
    case 31:
        return <Carte31 data={data} code={code}/>;
    case 32:
        return <Carte32 data={data}/>;
    case 33:
        return <Carte33 data={data}/>;
      }
};
