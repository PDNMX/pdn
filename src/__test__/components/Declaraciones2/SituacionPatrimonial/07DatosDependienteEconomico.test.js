import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import DatosDependienteEconomico from '../../../../components/Declaraciones2/SituacionPatrimonial/07DatosDependienteEconomico';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('07DatosDependienteEconomico id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    test('07DatosDependienteEconomico', () => {
      const wrapper = mount(<DatosDependienteEconomico />);
      expect(wrapper.length).toBe(1);
    });
  });
});
