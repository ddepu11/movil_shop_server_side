import { useDispatch, useSelector } from 'react-redux';
import { clearFilter } from '../../../actions/filterMobileActions';

const FilterScreenLogic = () => {
  const { mobiles } = useSelector((state) => state.mobile);

  const dispatch = useDispatch();

  let brands;
  let colors = [];
  let ram;

  if (Object.keys(mobiles).length !== 0) {
    // Gets brands name not repeting any
    brands = Array.from(new Set(mobiles.map((m) => m.brand)));

    for (let i = 0; i < mobiles.length; i += 1) {
      for (let j = 0; j < mobiles[i].colors.length; j += 1) {
        colors.push(mobiles[i].colors[j]);
      }
    }
    // Gets Colors not repeting any
    colors = [...new Set(colors)];

    // Gets ram Not repeting any
    ram = [...new Set(mobiles.map((m) => m.ram))];
  }

  const clearFilters = () => dispatch(clearFilter());

  return { clearFilters, colors, ram, brands };
};

export default FilterScreenLogic;
