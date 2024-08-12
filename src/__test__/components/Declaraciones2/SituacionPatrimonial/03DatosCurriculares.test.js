import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import Datoscurriculares from '../../../../components/Declaraciones2/SituacionPatrimonial/03DatosCurriculares';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('03Datoscurriculares id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { datosCurricularesDeclarante } = declaracion.situacionPatrimonial;

    test('03Datoscurriculares', () => {
      const wrapper = mount(<Datoscurriculares data={datosCurricularesDeclarante} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
