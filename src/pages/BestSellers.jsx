import ProductListPage from '../components/ProductListPage';
import productsData from '../data/bestsellers.json';
import filtersData from '../data/filters.json';

function BestSellers() {
  return (
    <ProductListPage 
      title="Best Sellers"
      description="Top Selling products on Minimalist"
      products={productsData}
      filters={filtersData.bestsellers}
    />
  );
}

export default BestSellers;