import ProductListPage from '../components/ProductListPage';
import productsData from '../data/babycare.json';
import filtersData from '../data/filters.json';

function BabyCare() {
  return (
    <ProductListPage title="Baby Care"
      description="A curated range of pediatrician-approved baby care products formulated with the most sensitive skin in mind..."
      products={productsData}
      filters={filtersData.babycare}
    />
  );
}

export default BabyCare;