import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import ServidorAnioAnterior from '../../../../components/Declaraciones2/SituacionPatrimonial/09ServidorAnioAnterior';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('09ServidorAnioAnterior id:$id tipo:$metadata.tipo nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, metadata, declaracion }) => {

    const { actividadAnualAnterior } = declaracion.situacionPatrimonial;

    switch (metadata.tipo) {
      case 'INICIAL':
        test('09ServidorAnioAnterior Inicial $metadata.tipo', () => {
          const wrapper = mount(<ServidorAnioAnterior data={actividadAnualAnterior} />);

          expect(wrapper.length).toBe(1);
        });
        break;
      case 'MODIFICACIÓN':
        test('es de tipo modificación', () => {
          expect(metadata.tipo).toEqual('MODIFICACIÓN');
        })

        break;
      case 'CONCLUSIÓN':
        test('09ServidorAnioAnterior Conclusión', () => {
          const wrapper = mount(<ServidorAnioAnterior data={actividadAnualAnterior} />);

          expect(wrapper.length).toBe(1);
        });
        break;

      default:
        test('no debe ser de este tipo', () => {
          expect(metadata.tipo).toEqual('otro');
          console.log(metadata.tipo);
        })
        break;
    }
  });
});
