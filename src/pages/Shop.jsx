import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

function CollectionCard({ collection, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <Link to={collection.link} className="block group no-underline">
        <div className="w-full aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
          <img 
            src={collection.image} 
            alt={collection.title} 
            className="w-full h-full object-cover block transition-transform duration-[400ms] group-hover:scale-105"
          />
        </div>
        <h5 className="text-base font-medium text-gray-900 text-center m-0">
          {collection.title}
        </h5>
      </Link>
    </div>
  );
}

function Shop() {
  const [headerRef, isHeaderVisible] = useScrollAnimation();

  const collections = [
    { id: 1, image: "/images/collection1.avif", title: "Bath & Body", link: "/bath-body" },
    { id: 2, image: "/images/collection2.avif", title: "Skin", link: "/skin" },
    { id: 3, image: "/images/collection3.avif", title: "Hair", link: "/hair" },
    { id: 4, image: "/images/collection4.avif", title: "Lip", link: "/lip" },
    { id: 5, image: "/images/collection5.avif", title: "Best Sellers", link: "/best-sellers" },    
    { id: 6, image: "/images/collection6.avif", title: "New Launches", link: "/new-launches" }
  ];

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        <div
          ref={headerRef}
          className={`transition-all duration-700 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          <h1 className="text-[2.5rem] font-bold text-gray-900 mb-10">Collections</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard 
              key={collection.id} 
              collection={collection} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;