import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import IngresosInicial from '../../../../components/Declaraciones2/SituacionPatrimonial/08IngresosInicial';
import IngresosModificacion from '../../../../components/Declaraciones2/SituacionPatrimonial/08IngresosModificacion';
import IngresosConclusion from '../../../../components/Declaraciones2/SituacionPatrimonial/08IngresosConclusion';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales, ingresos } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`08Ingresos id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      switch (dato.metadata.tipo) {
        case 'INICIAL':
          test('montar IngresosInicial', () => {
            const wrapper = mount(<IngresosInicial data={ingresos} />);

            expect(wrapper.length).toBe(1);
          });
          break;
        case 'MODIFICACIÓN':
          test('montar IngresosModificacion', () => {
            const wrapper = mount(<IngresosModificacion data={ingresos} />);

            expect(wrapper.length).toBe(1);
          });
          break;
        case 'CONCLUSIÓN':
          test('montar IngresosConclusion', () => {
            const wrapper = mount(<IngresosConclusion data={ingresos} />);

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
