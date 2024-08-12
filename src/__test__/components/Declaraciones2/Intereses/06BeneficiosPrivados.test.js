import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import BeneficiosPrivados from '../../../../components/Declaraciones2/Intereses/06BeneficiosPrivados';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('06BeneficiosPrivados id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion, metadata }) => {
    if (declaracion.hasOwnProperty('interes')) {
      const { beneficiosPrivados } = declaracion.interes;
      test('06BeneficiosPrivados', () => {
        const wrapper = mount(<BeneficiosPrivados data={beneficiosPrivados} />);
        expect(wrapper.length).toBe(1);
      });
    } else {
      test('debe ser declaracionCompleta false', () => {
        expect(metadata.declaracionCompleta).toBeFalsy();
      });
    }
  });
});
