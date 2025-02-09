import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";

const HomeScreen = () => {
  const { contentType } = useContentStore();

  return (
    <>
      {/* Top Section with Navbar and Welcome Text */}
      <div className="bg-black text-white relative px-5 md:px-20">
        <Navbar />

        <div className="flex flex-col items-center justify-center text-center py-16">
          <h1 className="text-4xl md:text-6xl font-extrabold">Welcome to MovieFlix</h1>
          <p className="mt-4 text-lg max-w-2xl">
            Discover trending {contentType === "movie" ? "movies" : "TV shows"} and explore a wide range of top-rated content.
          </p>

          <div className="flex mt-8">
            <Link
              to="/browse"
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Browse
            </Link>

            <Link
              to="/about"
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section with Trending Movies/TV Shows */}
      <div className="bg-black py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            Trending {contentType === "movie" ? "Movies" : "TV Shows"}
          </h2>
          <MovieSlider />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
