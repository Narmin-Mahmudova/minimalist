import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import infoPagesData from '../data/infoPages.json';

function InfoPage() {
  const { slug } = useParams();
  const page = infoPagesData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-white">
        <div className="max-w-[900px] mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-medium text-ink mb-4">Page not found</h1>
          <Link to="/" className="text-ink underline">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 bg-white">
      <div className="max-w-[900px] mx-auto px-4 md:px-8">
        <h1 className="text-2xl md:text-4xl font-medium text-ink mb-6 md:mb-8 border-t border-gray-200 pt-6 md:pt-8">
          {page.title}
        </h1>

        {page.paragraphs && page.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm md:text-base text-gray-800 leading-relaxed mb-4 md:mb-5"
            dangerouslySetInnerHTML={{ __html: p }}
          />
        ))}

        {page.tagline && (
          <h2 className="text-2xl md:text-4xl font-light text-ink mt-6 md:mt-8 [&_strong]:font-extrabold">
            {page.tagline}
          </h2>
        )}

        {page.list && (
          <ul className="list-disc pl-5 md:pl-6 space-y-3 md:space-y-4">
            {page.list.map((item, i) => (
              <li key={i} className="text-sm md:text-base text-gray-800 leading-relaxed">
                {typeof item === 'string' ? (
                  item
                ) : (
                  <>
                    {item.text}
                    <ul className="list-[circle] pl-5 md:pl-6 mt-2 space-y-1">
                      {item.subList.map((sub, j) => (
                        <li key={j}>{sub}</li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default InfoPage;