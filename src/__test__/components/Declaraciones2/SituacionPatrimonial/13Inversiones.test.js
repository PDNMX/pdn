import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import Inversiones from '../../../../components/Declaraciones2/SituacionPatrimonial/13Inversiones';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales, inversiones } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`13Inversiones id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<Inversiones data={inversiones} tipo={dato.metadata.tipo} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
