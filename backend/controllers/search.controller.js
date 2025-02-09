import { User } from "../models/user.model.js";
import { fetch } from "../services/tmdb.service.js";

async function fetchAndHandleResponse(url, query, searchType, req, res) {
	try {
		const response = await fetch(url);
		if (!response.results || response.results.length === 0) {
			return res.status(404).json({ success: false, message: "No results found" });
		}

		const result = response.results[0];
		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: result.id,
					image: result.poster_path || result.primaryImage,
					title: result.title || result.originalTitle || result.name,
					searchType,
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.error(`Error in ${searchType} search controller:`, error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


export async function searchMovie(req, res) {
	const { query } = req.params;
	const url = `https://imdb236.p.rapidapi.com/imdb/search?originalTitle=${query}`;
	await fetchAndHandleResponse(url, query, "movie", req, res);
}

export async function searchTv(req, res) {
	const { query } = req.params;
	const url = `https://imdb236.p.rapidapi.com/imdb/search?originalTitle=${query}`;
	await fetchAndHandleResponse(url, query, "tv", req, res);
}

export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		console.error("Error in getSearchHistory controller:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function removeItemFromSearchHistory(req, res) {
	const { id } = req.params;
	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});
		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.error("Error in removeItemFromSearchHistory controller:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

