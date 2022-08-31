import React from 'react';

//componente
import { readFiles } from '../../../__mocks__/index';
//Enzyme
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


describe('mount', () => {
  const data = readFiles();

  data.forEach((dato, index) => {
    const { nombre, primerApellido, segundoApellido } = dato.declaracion.situacionPatrimonial.datosGenerales;
    describe(`declaracion id:${dato.id} nombre:${nombre}|${primerApellido}|${segundoApellido}`, () => {
      test('should ', () => {});
    });
  });
  // test.each(info)('double(%d)', d => {});

  test('mount Intereses', () => {
    // const Int = mount(<Intereses></Intereses>);
    // expect(Int.length).toBe(1);
  });
  test('montar', async () => {
    const wrapper = mount(<div>aaaa</div>);

    const div = wrapper.find('div');
    expect(div.text()).toBe('aaaa');
  });
});
