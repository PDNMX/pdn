import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import Adeudos from '../../../../components/Declaraciones2/SituacionPatrimonial/14Adeudos';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales, adeudos } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`14Adeudos id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<Adeudos data={adeudos} tipo={dato.metadata.tipo} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
