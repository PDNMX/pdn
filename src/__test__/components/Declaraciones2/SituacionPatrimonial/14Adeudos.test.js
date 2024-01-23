import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import Adeudos from '../../../../components/Declaraciones2/SituacionPatrimonial/14Adeudos';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('14Adeudos id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, metadata, declaracion }) => {
    const { adeudos } = declaracion.situacionPatrimonial;

    test('14Adeudos', () => {
      const wrapper = mount(<Adeudos data={adeudos} tipo={metadata.tipo} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
