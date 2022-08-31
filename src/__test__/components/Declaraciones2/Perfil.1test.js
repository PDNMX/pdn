import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
//import Prestamo from '../../../../components/Declaraciones2/SituacionPatrimonial/15Prestamo';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales, prestamoOComodato } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`15Prestamo id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        // const wrapper = mount(<Prestamo data={prestamoOComodato} />);
        // expect(wrapper.length).toBe(1);
      });
    });
  });
});
