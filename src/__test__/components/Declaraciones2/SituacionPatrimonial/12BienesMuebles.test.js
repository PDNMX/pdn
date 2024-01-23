import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import BienesMuebles from '../../../../components/Declaraciones2/SituacionPatrimonial/12BienesMuebles';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('12BienesMuebles id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { bienesMuebles } = declaracion.situacionPatrimonial;

    test('12BienesMuebles', () => {
      const wrapper = mount(<BienesMuebles data={bienesMuebles} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
