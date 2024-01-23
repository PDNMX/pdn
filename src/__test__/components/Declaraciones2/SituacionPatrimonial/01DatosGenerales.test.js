import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import DatosGenerales from '../../../../components/Declaraciones2/SituacionPatrimonial/01DatosGenerales';

//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('01DatosGenerales id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { datosGenerales } = declaracion.situacionPatrimonial;

    test('01DatosGenerales', () => {
      const wrapper = mount(<DatosGenerales data={datosGenerales} titulo='Titulo' />);
      expect(wrapper.length).toBe(1);
    });
  });
});
