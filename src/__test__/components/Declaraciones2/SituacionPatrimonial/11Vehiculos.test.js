import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import Vehiculos from '../../../../components/Declaraciones2/SituacionPatrimonial/11Vehiculos';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('11Vehiculos id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { vehiculos } = declaracion.situacionPatrimonial;

    test('11Vehiculos', () => {
      const wrapper = mount(<Vehiculos data={vehiculos} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
