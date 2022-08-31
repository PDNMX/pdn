import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import Vehiculos from '../../../../components/Declaraciones2/SituacionPatrimonial/11Vehiculos';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales, vehiculos } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`11Vehiculos id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<Vehiculos data={vehiculos} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
