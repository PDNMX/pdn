import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import ApoyosBeneficiosPublicos from '../../../../components/Declaraciones2/Intereses/03ApoyosBeneficiosPublicos';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales } = dato.declaracion.situacionPatrimonial;
    const { apoyos } = dato.declaracion.interes;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`03ApoyosBeneficiosPublicos id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<ApoyosBeneficiosPublicos data={apoyos} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
