import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import EmpleoCargoComision from '../../../../components/Declaraciones2/SituacionPatrimonial/04EmpleoCargoComision';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('04EmpleoCargoComision id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { datosEmpleoCargoComision } = declaracion.situacionPatrimonial;

    test('04EmpleoCargoComision', () => {
      const wrapper = mount(<EmpleoCargoComision data={datosEmpleoCargoComision} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
