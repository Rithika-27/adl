// import express from "express";
// import {
// 	getMovieDetails,
// 	getMoviesByCategory,
// 	getMovieTrailers,
// 	getSimilarMovies,
// 	getTrendingMovie,
// } from "../controllers/movie.controller.js";

// const router = express.Router();

// router.get("/trending", getTrendingMovie);
// router.get("/:id/trailers", getMovieTrailers);
// router.get("/:id/details", getMovieDetails);
// router.get("/:id/similar", getSimilarMovies);
// router.get("/:category", getMoviesByCategory);

// export default router;
import express from "express";
import {
	getMovieDetails,
	getTrendingMovie,
 } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/details", getMovieDetails);

export default router;
