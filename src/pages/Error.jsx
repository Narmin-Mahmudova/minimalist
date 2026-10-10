import { Link, useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 py-16 bg-white">
      <h1 className="text-8xl font-black text-gray-900 mb-2 tracking-wider">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8 text-base leading-relaxed">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-100 transition-colors"
        >
          Go Back
        </button>
        <Link
          to="/"
          className="px-6 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors no-underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Error;