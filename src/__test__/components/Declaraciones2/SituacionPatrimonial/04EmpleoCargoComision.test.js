import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import EmpleoCargoComision from '../../../../components/Declaraciones2/SituacionPatrimonial/04EmpleoCargoComision';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales, datosEmpleoCargoComision } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`04EmpleoCargoComision id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<EmpleoCargoComision data={datosEmpleoCargoComision} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
