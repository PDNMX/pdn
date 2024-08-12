import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import ExperienciaLaboral from '../../../../components/Declaraciones2/SituacionPatrimonial/05ExperienciaLaboral';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('05ExperienciaLaboral id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { experienciaLaboral } = declaracion.situacionPatrimonial;

    test('05ExperienciaLaboral', () => {
      const wrapper = mount(<ExperienciaLaboral data={experienciaLaboral} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
