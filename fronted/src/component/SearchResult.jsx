import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results || [];

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-950 px-6 py-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all text-sm"
            >
              ←
            </button>

            <div>
              <h2 className="text-3xl font-black text-white">
                Search <span className="text-yellow-400">Results</span>
              </h2>

              <p className="text-gray-500 text-sm">
                {results.length} products found
              </p>
            </div>
          </div>

          {/* No Products */}
          {results.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>

              <h3 className="text-xl font-black text-white mb-2">
                No Products Found
              </h3>

              <p className="text-gray-500">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {results.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/products/${item._id}`)}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300 cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="overflow-hidden bg-gray-800">
                    <img
                      src={item.img?.url}
                      alt={item.name}
                      className="h-44 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-yellow-400 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-yellow-400 font-black text-lg">
                        ₹{item.price}
                      </span>

                      <span className="text-xs text-gray-600 line-through">
                        ₹{item.price + 500}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;