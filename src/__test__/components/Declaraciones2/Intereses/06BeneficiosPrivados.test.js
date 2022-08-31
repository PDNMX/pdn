import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import BeneficiosPrivados from '../../../../components/Declaraciones2/Intereses/06BeneficiosPrivados';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales } = dato.declaracion.situacionPatrimonial;
    const { beneficiosPrivados } = dato.declaracion.interes;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`06BeneficiosPrivados id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<BeneficiosPrivados data={beneficiosPrivados} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
