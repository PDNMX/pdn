import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import Fideicomisos from '../../../../components/Declaraciones2/Intereses/07Fideicomisos';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales } = dato.declaracion.situacionPatrimonial;
    const { fideicomisos } = dato.declaracion.interes;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`07Fideicomisos id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<Fideicomisos data={fideicomisos} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
