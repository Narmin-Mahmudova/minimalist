import ProductListPage from '../components/ProductListPage';
import productsData from '../data/newlaunches.json';
import filtersData from '../data/filters.json';

function NewLaunches() {
  return (
    <ProductListPage title="New Launches"
      description="Check our new product launches."
      products={productsData}
      filters={filtersData.new_launches}
    />
  );
}

export default NewLaunches;