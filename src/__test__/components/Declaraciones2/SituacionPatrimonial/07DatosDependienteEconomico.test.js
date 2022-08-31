import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import DatosDependienteEconomico from '../../../../components/Declaraciones2/SituacionPatrimonial/07DatosDependienteEconomico';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`07DatosDependienteEconomico id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<DatosDependienteEconomico />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
