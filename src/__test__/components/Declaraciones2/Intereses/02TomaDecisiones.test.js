import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import TomaDecisiones from '../../../../components/Declaraciones2/Intereses/02TomaDecisiones';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('02TomaDecisiones id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion, metadata }) => {
    if (declaracion.hasOwnProperty('interes')) {
      const { participacionTomaDecisiones } = declaracion.interes;
      test('02TomaDecisiones', () => {
        const wrapper = mount(<TomaDecisiones data={participacionTomaDecisiones} />);
        expect(wrapper.length).toBe(1);
      });
    } else {
      test('debe ser declaracionCompleta false', () => {
        expect(metadata.declaracionCompleta).toBeFalsy();
      });
    }
  });
});
