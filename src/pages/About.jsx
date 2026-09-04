import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-8 border-b border-gray-200 text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            About Us
          </h1>
          <p className="text-base text-gray-500">
            Science-backed skincare, made honest and simple.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <section className="py-8 border-b border-gray-100 last:border-b-0">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5">
            Who We Are
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Minimalist was founded on a simple idea: skincare should be effective,
            transparent, and accessible to everyone. We believe you deserve to know
            exactly what's in your products and why it works — no unnecessary
            fragrances, no misleading claims, just clean formulations backed by science.
          </p>
        </section>

        <section className="py-8 border-b border-gray-100 last:border-b-0">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5">
            Our Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-base font-semibold text-gray-900 mb-2.5">
                Transparency
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Full disclosure of every ingredient and its exact concentration, on every label.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-base font-semibold text-gray-900 mb-2.5">
                Efficacy
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Every formulation is developed and tested in our in-house laboratories.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-base font-semibold text-gray-900 mb-2.5">
                Affordability
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Effective skincare shouldn't come with an unreasonable price tag.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-base font-semibold text-gray-900 mb-2.5">
                Global Sourcing
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We source active ingredients from trusted suppliers around the world.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 border-b border-gray-100 last:border-b-0">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5">
            Our Story
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            What started as a small team obsessed with ingredient lists has grown into
            a skincare brand trusted by thousands. We're still driven by the same
            question we started with: does this ingredient actually do what it claims?
            If the answer is yes, and the science backs it up, it earns a place in our
            formulations.
          </p>
        </section>

        <div className="text-center py-12 pb-16">
          <p className="text-lg text-gray-900 mb-5 font-medium">
            Ready to find your routine?
          </p>
          <Link
            to="/shop"
            className="inline-block px-12 py-4 bg-gray-900 text-white text-sm font-medium transition-colors duration-300 hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;