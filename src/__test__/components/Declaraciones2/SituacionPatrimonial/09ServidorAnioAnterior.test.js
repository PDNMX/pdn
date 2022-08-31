import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import ServidorAnioAnterior from '../../../../components/Declaraciones2/SituacionPatrimonial/09ServidorAnioAnterior';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales, actividadAnualAnterior } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`08Ingresos id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      switch (dato.metadata.tipo) {
        case 'INICIAL':
          test('montar ServidorAnioAnterior', () => {
            const wrapper = mount(<ServidorAnioAnterior data={actividadAnualAnterior} />);

            expect(wrapper.length).toBe(1);
          });
          break;
        case 'MODIFICACIÓN':
          break;
        case 'CONCLUSIÓN':
          test('montar ServidorAnioAnterior', () => {
            const wrapper = mount(<ServidorAnioAnterior data={actividadAnualAnterior} />);

            expect(wrapper.length).toBe(1);
          });
          break;

        default:
          console.log(dato.metadata.tipo);
          break;
      }
    });
  });
});
