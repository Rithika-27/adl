import fetch from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetch("https://imdb236.p.rapidapi.com/imdb/india/top-rated-indian-movies");

    // Ensure data.results exists and has elements
    if (!data || !Array.isArray(data.results) || data.results.length === 0) {
      return res.status(404).json({ success: false, message: "No trending movies found" });
    }

    // Randomly select a featured movie from data.results
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];

    // Use the full results array as the list of movies
    const list = data.results;

    return res.json({ success: true, content: randomMovie, movies: list });
  } catch (error) {
    console.error("Error fetching trending movies:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetch(`https://imdb236.p.rapidapi.com/imdb/${id}`);
    const description = data.description || "Description not found";
    return res.json({ description });
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
