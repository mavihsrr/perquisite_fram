const router = require("express").Router();
const Book = require("../models/Book");
const books = require("../config/Book.json");

// router.get("/books", async(req, res) => {
//     try {
//         const page = parseInt(req.query.page) - 1 || 0;
//         const limit = parseInt(req.query.limit) || 3;
//         const search = req.query.search || "";
//         let sort = req.query.sort || "rating";
//         let genre = req.query.genre || "All";

//         const genreOptions = [
//             "Action", 
//             "Romance", 
//             "Fantasy", 
//             "Drama", 
//             "Crime", 
//             "Adventure", 
//             "Thriller", 
//             "Sci-fi",
//             "Music", 
//             "Family"
//         ];

//         genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.genre.split(","));
//         req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);


//         let sortBy = {};
//         if(sort[1]) {
//             sortBy[sort[0]] = sort[1];
//         } else {
//             sortBy[sort[0]] = "asc";
//         }

//         const data = await Book.find({ name: { $regex: search, $options: "i"}})
//             .where("genre")
//             .in([...genre])
//             .sort(sortBy)
//             .skip(page * limit)
//             .limit(limit);

//         const total = await Book.countDocuments({
//             genre: { $in: [...genre] },
//             title: { $regex: search, $options: "i"},
//         });

//         const response = {
//             error: false,
//             total,
//             page: page+1,
//             limit,
//             genres: genreOptions,
//             data,
//         };

//         res.status(200).json(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "error" });
//     }
// });

router.get("/books", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		let sort = req.query.sort || "rating";
		let genre = req.query.genre || "All";

		const genreOptions = [
			"Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
			"Adventure",
			"Thriller",
			"Sci-fi",
			"Music",
			"Family",
		];

		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const book = await Book.find({ title: { $regex: search, $options: "i" } })
			.where("genre")
			.in([...genre])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await Book.countDocuments({
			genre: { $in: [...genre] },
			title: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			genres: genreOptions,
			book,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});


// const bookInsert = async () => {
//     try {
//         const docs = await Book.insertMany(books);
//         return Promise.resolve(docs);
//     } catch(err) {
//         return Promise.reject(err);
//     }
// }

// bookInsert()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

module.exports = router;