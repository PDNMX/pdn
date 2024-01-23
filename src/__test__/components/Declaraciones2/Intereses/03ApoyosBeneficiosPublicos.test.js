import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import ApoyosBeneficiosPublicos from '../../../../components/Declaraciones2/Intereses/03ApoyosBeneficiosPublicos';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('03ApoyosBeneficiosPublicos id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { apoyos } = declaracion.interes;
    test('03ApoyosBeneficiosPublicos', () => {
      const wrapper = mount(<ApoyosBeneficiosPublicos data={apoyos} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
