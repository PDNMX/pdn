import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import Prestamo from '../../../../components/Declaraciones2/SituacionPatrimonial/15Prestamo';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('15Prestamo id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { prestamoOComodato } = declaracion.situacionPatrimonial;

    test('15Prestamo', () => {
      const wrapper = mount(<Prestamo data={prestamoOComodato} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
