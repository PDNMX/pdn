import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import Representacion from '../../../../components/Declaraciones2/Intereses/04Representacion';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales } = dato.declaracion.situacionPatrimonial;
    const { representacion } = dato.declaracion.interes;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`04Representacion id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<Representacion data={representacion} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
