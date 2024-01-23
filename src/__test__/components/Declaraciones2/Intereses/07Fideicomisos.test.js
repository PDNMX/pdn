import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import Fideicomisos from '../../../../components/Declaraciones2/Intereses/07Fideicomisos';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('07Fideicomisos id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { fideicomisos } = declaracion.interes;
    test('07Fideicomisos', () => {
      const wrapper = mount(<Fideicomisos data={fideicomisos} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
