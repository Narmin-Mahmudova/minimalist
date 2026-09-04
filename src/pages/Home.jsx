import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { FiHeart } from 'react-icons/fi';
import productsData from "../data/products.json";
import launchesData from "../data/launches.json";
import hairData from "../data/hair.json";
import skinData from "../data/skin.json";
import bestsellersData from "../data/bestsellers.json";
import newLaunchesData from "../data/newlaunches.json";
import useScrollAnimation from '../hooks/useScrollAnimation';
import useMediaQuery from '../hooks/useMediaQuery';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { addToCart: addToCartCtx } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [bestSellersRef, bestSellersVisible] = useScrollAnimation();
  const [categoriesRef, categoriesVisible] = useScrollAnimation();
  const [concernsRef, concernsVisible] = useScrollAnimation();
  const [newLaunchesRef, newLaunchesVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [promoRef, promoVisible] = useScrollAnimation();

  const addToCart = (product) => {
    addToCartCtx(product);
    navigate('/cart');
  };

  const handleWishlistToggle = (product) => {
    const item = {
      id: product.id,
      name: product.name,
      description: product.description || product.concern,
      price: product.price,
      image: product.images ? product.images[0] : product.image,
    };
    toggleWishlist(item);
  };

  const categories = [
    { id: 1, image: "/images/skin.avif", title: "Skin", link: "/skin-care" },
    { id: 2, image: "/images/hair.avif", title: "Hair", link: "/hair-care" },
    { id: 3, image: "/images/body.avif", title: "Bath & Body", link: "/bath-body" },
    { id: 4, image: "/images/lip.avif", title: "Lip", link: "/lip" },
    { id: 5, image: "/images/eye.avif", title: "Eye", link: "/skin-care" },
  ];

  const concerns = [
    { id: 1, image: "/images/Tone.avif", title: "Uneven Tone", link: "/skin-care" },
    { id: 2, image: "/images/Acne.avif", title: "Acne control", link: "/skin-care" },
    { id: 3, image: "/images/Oiliness.avif", title: "Oiliness", link: "/skin-care" },
    { id: 4, image: "/images/FineLines.avif", title: "Fine Lines / Wrinkles", link: "/best-sellers" },
    { id: 5, image: "/images/Skinmin.avif", title: "Dryness", link: "/skin-care" },
    { id: 6, image: "/images/Hairmin.avif", title: "Hair Fall", link: "/hair-care" },
    { id: 7, image: "/images/Dandruff.avif", title: "Anti-Dandruff", link: "/hair-care" }
  ];

  const products = productsData;
  const launches = launchesData;

  const heroSlides = [
    { key: "slide-1", image: "/images/slider1.avif", imageMobile: "/images/slider1-1.avif", product: bestsellersData.find(p => p.id === "bestseller-7") || null },
    { key: "slide-2", image: "/images/slider2.avif", imageMobile: "/images/slider2-1.avif", product: newLaunchesData.find(l => l.id === "launch-10") || null },
    { key: "slide-3", image: "/images/slider3.avif", imageMobile: "/images/slider3-1.avif", product: hairData.find(p => p.id === "hair-9") || null },
    { key: "slide-4", image: "/images/slider4.avif", imageMobile: "/images/slider4-1.avif", product: skinData.find(p => p.id === "skin-1") || null },
    { key: "slide-5", image: "/images/slider5.avif", imageMobile: "/images/slider5-1.avif", product: skinData.find(p => p.id === "skin-3") || null },
    { key: "slide-6", image: "/images/slider6.avif", imageMobile: "/images/slider6-1.avif", product: skinData.find(p => p.id === "skin-12") || null },
  ];

  return (
    <div>
      <section className="hero-slider">
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 5000 }} loop={true}>
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.key}>
              <div
                className="slide"
                onClick={() => slide.product && navigate('/product', { state: { product: slide.product } })}
                style={{ cursor: slide.product ? 'pointer' : 'default' }}
              >
                <img 
                  src={isMobile ? slide.imageMobile : slide.image} 
                  alt={slide.key} 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className={`best-sellers fade-in-section ${bestSellersVisible ? 'is-visible' : ''}`} ref={bestSellersRef}>
        <div className="container">
          <h2 className="section-title">Our Best Sellers</h2>
          <div className="product-grid">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1.15}
              breakpoints={{
                480: { slidesPerView: 1.4 },
                640: { slidesPerView: 2.2 },
                900: { slidesPerView: 3 },
                1100: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="products-swiper"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div
                    className="product-card"
                    onClick={() => navigate('/product', { state: { product } })}
                    style={{ cursor: 'pointer' }}
                  >
                    <button
                      className={`wishlist-btn-card ${isInWishlist(product.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlistToggle(product);
                      }}
                    >
                      <FiHeart />
                    </button>
                    <span className="best-seller-badge">Best Seller</span>
                    <div
                      className="product-image-swiper"
                      style={{ height: '400px' }}
                      onClick={(e) => {
                        if (
                          e.target.closest('.swiper-pagination') ||
                          e.target.closest('.swiper-button-next') ||
                          e.target.closest('.swiper-button-prev')
                        ) {
                          e.stopPropagation();
                        }
                      }}
                    >
                      <Swiper modules={[Pagination]} pagination={{ clickable: true }} slidesPerView={1} className="inner-swiper">
                        {product.images.map((img, index) => (
                          <SwiperSlide key={index}>
                            <img src={img} alt={product.name} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-desc">{product.description}</p>

                      <div className="product-price">
                        <span className="current-price">₹{product.price}</span>
                        <span className="old-price">₹{product.oldPrice}</span>
                      </div>

                      <button
                        className="add-to-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="view-all-container">
              <Link to="/best-sellers" className="view-all-button"> View all products </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mid-banner">
        <div className="container">
          <img src={isMobile ? "/images/img1-1.avif" : "/images/img1.avif"} 
            alt="Banner 1" />
        </div>
      </section>

      <section className="mid-banner" onClick={() => navigate('/ai-assistants')} style={{ cursor: 'pointer' }}>
        <div className="container">
          <img src={isMobile ? "/images/img2-1.avif" : "/images/img2.avif"} 
            alt="Banner 2" />
        </div>
      </section>

      <section className={`categories-section fade-in-section ${categoriesVisible ? 'is-visible' : ''}`} ref={categoriesRef}>
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={2}
            loop={false}
            breakpoints={{
              600: { slidesPerView: 3 },
              900: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="categories-swiper"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.id}>
                <Link to={cat.link} className="categories-card">
                  <div className="categories-image">
                    <img src={cat.image} alt={cat.title} />
                  </div>
                  <p className="categories-title">{cat.title}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className={`concerns-section fade-in-section ${concernsVisible ? 'is-visible' : ''}`} ref={concernsRef}>
        <div className="container">
          <h2 className="section-title">Shop by Concerns</h2>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={2}
            loop={false}
            breakpoints={{
              600: { slidesPerView: 3 },
              900: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="concerns-swiper"
          >
            {concerns.map((con) => (
              <SwiperSlide key={con.id}>
                <Link to={con.link} className="concerns-card">
                  <div className="concerns-image">
                    <img src={con.image} alt={con.title} />
                  </div>
                  <p className="concerns-title">{con.title}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className={`products-section fade-in-section ${newLaunchesVisible ? 'is-visible' : ''}`} ref={newLaunchesRef}>
        <div className="container">
          <h2 className="section-title">New Launches</h2>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={{
              480: { slidesPerView: 1.4 },
              640: { slidesPerView: 2.2 },
              900: { slidesPerView: 3 },
              1100: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="products-swiper"
          >
            {launches.map((launche) => (
              <SwiperSlide key={launche.id}>
                <div
                  className="product-card"
                  onClick={() => navigate('/product', { state: { product: launche } })}
                  style={{ cursor: 'pointer' }}
                >
                  <button
                    className={`wishlist-btn-card ${isInWishlist(launche.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(launche);
                    }}
                  >
                    <FiHeart />
                  </button>

                  <div
                    className="product-image-swiper"
                    onClick={(e) => {
                      if (
                        e.target.closest('.swiper-pagination') ||
                        e.target.closest('.swiper-button-next') ||
                        e.target.closest('.swiper-button-prev')
                      ) {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <Swiper modules={[Pagination]} pagination={{ clickable: true }} slidesPerView={1} className="inner-swiper">
                      {launche.images.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img src={img} alt={launche.name} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{launche.name}</h3>
                    <p className="product-desc">{launche.description}</p>

                    <div className="product-price">
                      <span className="current-price">₹{launche.price}</span>
                      <span className="old-price">₹{launche.oldPrice}</span>
                    </div>

                    <button
                      className="add-to-cart"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(launche);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="view-all-container">
            <Link to="/new-launches" className="view-all-button"> View all products </Link>
          </div>
        </div>
      </section>

      <section className={`features-section fade-in-section ${featuresVisible ? 'is-visible' : ''}`} ref={featuresRef}>
        <div className="container">
          <h2 className="features-title">The future of personal care is here</h2>
          <p className="features-subtitle">Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions.</p>

          <div className="features-grid">
            <div className="feature-card">
              <img src="/images/transparency.webp" alt="transparency" />
              <h5>Transparency</h5>
              <p>Full disclosure of ingredients used & their concentration</p>
            </div>
            <div className="feature-card">
              <img src="/images/medical.avif" alt="medical" />
              <h5>Efficacy</h5>
              <p>Formulations developed in our in-house laboratories</p>
            </div>
            <div className="feature-card">
              <img src="/images/download.webp" alt="affordability" />
              <h5>Affordable</h5>
              <p>Skincare, accessible to all</p>
            </div>
            <div className="feature-card">
              <img src="/images/globe.avif" alt="global" />
              <h5>Only the best</h5>
              <p>Ingredients sourced from across the world</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`promo-section fade-in-section ${promoVisible ? 'is-visible' : ''}`} ref={promoRef}>
        <div className="promo-container">

          <div className="promo-card">
            <div className="promo-image">
              <img src="/images/circle.avif" alt="Trust Circle" />
            </div>
            <div className="promo-content">
              <h2>Minimalist Trust Circle</h2>
              <p>Earn & redeem MCash on every purchase</p>
            </div>
          </div>

          <div className="promo-card">
            <div className="promo-image">
              <img src="/images/app.avif" alt="Download App" />
            </div>
            <div className="promo-content">
              <h2>Download Our App</h2>
              <p>Get App Exclusive Discounts & Offers</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;