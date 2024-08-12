import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import Bienesinmuebles from '../../../../components/Declaraciones2/SituacionPatrimonial/10Bienesinmuebles';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('10Bienesinmuebles id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion, metadata }) => {
    if (declaracion.situacionPatrimonial.hasOwnProperty('bienesInmuebles')) {
      const { bienesInmuebles } = declaracion.situacionPatrimonial;

      test('10Bienesinmuebles', () => {
        const wrapper = mount(<Bienesinmuebles data={bienesInmuebles} />);
        expect(wrapper.length).toBe(1);
      });
    } else {
      test('debe ser declaracionCompleta false', () => {
        expect(metadata.declaracionCompleta).toBeFalsy();
      });
    }
  });
});
