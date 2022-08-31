import React from 'react';

//componente
import { readFiles } from '../../../__mocks__/index';
import SituacionPatrimonial from '../../../components/Declaraciones2/SituacionPatrimonial';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const {
      metadata,
      declaracion: { situacionPatrimonial }
    } = dato;
    const { nombre, primerApellido, segundoApellido } = situacionPatrimonial.datosGenerales;

    describe(`01DatosGenerales id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<SituacionPatrimonial value={0} setValue={() => {}} data={situacionPatrimonial} tipo={metadata.tipo} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
