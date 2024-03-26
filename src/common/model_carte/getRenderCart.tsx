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
  }
};
