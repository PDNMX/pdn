import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import DatosPareja from '../../../../components/Declaraciones2/SituacionPatrimonial/06DatosPareja';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('06DatosPareja id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    test('06DatosPareja', () => {
      const wrapper = mount(<DatosPareja />);
      expect(wrapper.length).toBe(1);
    });
  });
});
