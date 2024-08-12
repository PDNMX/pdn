import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import Inversiones from '../../../../components/Declaraciones2/SituacionPatrimonial/13Inversiones';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('13Inversiones id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, metadata, declaracion }) => {
    const { inversiones } = declaracion.situacionPatrimonial;

    test('13Inversiones', () => {
      const wrapper = mount(<Inversiones data={inversiones} tipo={metadata.tipo} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
