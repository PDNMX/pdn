import React from 'react';

//componente
import { readFiles } from '../../../utils/readFiles';
import IngresosInicial from '../../../../components/Declaraciones2/SituacionPatrimonial/08IngresosInicial';
import IngresosModificacion from '../../../../components/Declaraciones2/SituacionPatrimonial/08IngresosModificacion';
import IngresosConclusion from '../../../../components/Declaraciones2/SituacionPatrimonial/08IngresosConclusion';
//Enzyme
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const info = readFiles();

describe.each(info)('file $name', ({ data }) => {
  describe.each(data)('08Ingresos id:$id nombre:$declaracion.situacionPatrimonial.datosGenerales.nombre|$declaracion.situacionPatrimonial.datosGenerales.primerApellido|$declaracion.situacionPatrimonial.datosGenerales.segundoApellido', ({ id, metadata, declaracion }) => {
    const { ingresos } = declaracion.situacionPatrimonial;

    switch (metadata.tipo) {
      case 'INICIAL':
        test('08Ingresos IngresosInicial', () => {
          const wrapper = mount(<IngresosInicial data={ingresos} />);

          expect(wrapper.length).toBe(1);
        });
        break;
      case 'MODIFICACIÓN':
        test('08Ingresos IngresosModificacion', () => {
          const wrapper = mount(<IngresosModificacion data={ingresos} />);

          expect(wrapper.length).toBe(1);
        });
        break;
      case 'CONCLUSIÓN':
        test('08Ingresos IngresosConclusion', () => {
          const wrapper = mount(<IngresosConclusion data={ingresos} />);

          expect(wrapper.length).toBe(1);
        });
        break;

      default:
        test('08Ingresos Ingreso TipoDeclaracionNoExiste', () => {
          expect(metadata.tipo).toEqual('NOEXISTE');
        });

        break;
    }
  });
});
