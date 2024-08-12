import React from 'react';

//componente
import SituacionPatrimonial from '../../../components/Declaraciones2/SituacionPatrimonial';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { readFiles } from '../../utils/readFiles';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('01DatosGenerales id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion, metadata }) => {
    const { situacionPatrimonial } = declaracion;

    describe(`SituacionPatrimonial`, () => {
      test('montar', () => {
        const wrapper = mount(<SituacionPatrimonial value={0} setValue={() => {}} data={situacionPatrimonial} tipo={metadata.tipo} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
