import { useEffect, useState } from "react";
import axios from "axios";

const MovieSlider = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        // Ensure the endpoint matches your backend mount point
        const res = await axios.get("/api/v1/movie/trending");
        if (res.data.success) {
          setFeaturedMovie(res.data.content);
          setTrendingMovies(Array.isArray(res.data.movies) ? res.data.movies : []);
        } else {
          console.error("Backend error:", res.data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return <p className="text-white p-4">Loading trending movies...</p>;
  }

  return (
    <div className="movie-slider container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-4">Trending Movies</h2>
      
      {/* Featured Movie Section */}
      {featuredMovie && (
        <div className="featured-movie mb-8 p-4 bg-gray-800 rounded text-white">
          <h3 className="text-2xl font-semibold">
            Featured: {featuredMovie.primaryTitle || featuredMovie.originalTitle}
          </h3>
          {/* Additional details for the featured movie can go here */}
        </div>
      )}

      {/* Slider List */}
      {trendingMovies.length > 0 ? (
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
          {trendingMovies.map((movie, index) => (
            <div key={index} className="min-w-[250px] bg-gray-800 p-4 rounded">
              <img
                src={
                  movie.primaryImage && movie.primaryImage !== "No poster available"
                    ? movie.primaryImage
                    : "https://via.placeholder.com/250x350?text=No+Image"
                }
                alt={movie.primaryTitle || movie.originalTitle}
                className="w-full h-auto rounded"
              />
              <p className="mt-2 text-white text-center">
                {movie.primaryTitle || movie.originalTitle}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No trending movies available.</p>
      )}
    </div>
  );
};

export default MovieSlider;
