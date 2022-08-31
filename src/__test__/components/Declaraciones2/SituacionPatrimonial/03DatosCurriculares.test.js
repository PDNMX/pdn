import React from 'react';

//componente
import { readFiles } from '../../../../__mocks__/index';
import Datoscurriculares from '../../../../components/Declaraciones2/SituacionPatrimonial/03DatosCurriculares';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Declaraciones', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { datosGenerales, datosCurricularesDeclarante } = dato.declaracion.situacionPatrimonial;
    const { nombre, primerApellido, segundoApellido } = datosGenerales;

    describe(`03Datoscurriculares id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('montar', () => {
        const wrapper = mount(<Datoscurriculares data={datosCurricularesDeclarante} />);

        expect(wrapper.length).toBe(1);
      });
    });
  });
});
