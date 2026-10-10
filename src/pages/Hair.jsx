import ProductListPage from '../components/ProductListPage';
import productsData from '../data/hair.json';
import filtersData from '../data/filters.json';

function Hair() {
  return (
    <ProductListPage title="Hair"
      description="Shop our haircare products, developed with best-in-class & highly efficacious ingredients to address your hair concerns."
      products={productsData}
      filters={filtersData.hair}
    />
  );
}

export default Hair;