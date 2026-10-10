import ProductListPage from '../components/ProductListPage';
import productsData from '../data/skin.json';
import filtersData from '../data/filters.json';

function Skin() {
  return (
    <ProductListPage title="Skin"
      description="Shop our efficacious, transparent, and research-backed range of skincare products. Each product is formulated to target your specific skin concerns."
      products={productsData}
      filters={filtersData.skin}
    />
  );
}

export default Skin;