import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import ClientesPrincipales from '../../../../components/Declaraciones2/Intereses/05ClientesPrincipales';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('05ClientesPrincipales id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, declaracion }) => {
    const { clientesPrincipales } = declaracion.interes;
    test('05ClientesPrincipales', () => {
      const wrapper = mount(<ClientesPrincipales data={clientesPrincipales} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
