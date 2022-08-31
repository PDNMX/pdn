import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import Participacion from '../../../../components/Declaraciones2/Intereses/01Participacion';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales } = dato.declaracion.situacionPatrimonial;
    const { participacion } = dato.declaracion.interes;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`01Participacion id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<Participacion data={participacion} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
