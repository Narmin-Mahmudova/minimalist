import ProductListPage from '../components/ProductListPage';
import productsData from '../data/lip.json';
import filtersData from '../data/filters.json';

function Lip() {
  return (
    <ProductListPage title="Lip"
      description="Our lip treatment products ranging from protection & treatment to maintenance."
      products={productsData}
      filters={filtersData.lip}
    />
  );
}

export default Lip;