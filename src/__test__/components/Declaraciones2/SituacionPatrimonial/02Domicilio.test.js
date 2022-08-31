import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import Domicilio from '../../../../components/Declaraciones2/SituacionPatrimonial/02Domicilio';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`02Domicilio id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<Domicilio />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
