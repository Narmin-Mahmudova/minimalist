import ProductListPage from '../components/ProductListPage';
import productsData from '../data/bathbody.json';
import filtersData from '../data/filters.json';

function BathBody() {
  return (
    <ProductListPage title="Bath & Body"
      description="Treat your body from head to toe with our range of science-backed & efficacious range of body care products..."
      products={productsData}
      filters={filtersData.bathbody}
    />
  );
}

export default BathBody;