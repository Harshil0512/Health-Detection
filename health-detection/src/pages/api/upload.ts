// import { NextApiRequest, NextApiResponse } from "next";
// import { createRouter } from "next-connect";
// import multer from "multer";
// import { Activity } from "@/models/activityModel";
// import cloudinary from "@/lib/cloudinary";
// import connectToDatabase from "@/lib/databaseConnection";
// import mongoose from "mongoose";

// // Multer configuration to store the files in the 'uploads/' directory
// const upload = multer({ dest: 'uploads/' });

// // Extend NextApiRequest to include Multer files
// interface NextApiRequestWithFiles extends NextApiRequest {
//   files: Express.Multer.File[];
// }

// // Initialize next-connect
// const apiRoute = createRouter<NextApiRequestWithFiles, NextApiResponse>();

// // Use multer middleware to handle the file uploads (via next-connect)
// apiRoute.use(upload.array('images', 10));

// // POST and GET handler logic
// apiRoute.post(async (req, res) => {
//   await connectToDatabase();

//   const { report, user } = req.body;
//   const files = req.files;

//   if (!report || !user || !files || files.length === 0) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     // Upload images to Cloudinary
//     const uploadPromises = files.map((file) => cloudinary.uploader.upload(file.path));
//     const uploadResults = await Promise.all(uploadPromises);

//     // Store uploaded image URLs in an array
//     const imageUrls = uploadResults.map((result) => result.secure_url);

//     // Create new Activity record
//     const newActivity = new Activity({
//       user: new mongoose.Types.ObjectId(user),
//       images: imageUrls,
//       report,
//     });

//     await newActivity.save();

//     res.status(201).json(newActivity);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to upload images or create activity: " + error });
//   }
// });

// apiRoute.get(async (req, res) => {
//   try {
//     const activities = await Activity.find();
//     res.status(200).json(activities);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch activities: " + error });
//   }
// });

// // Export the handler
// export default apiRoute.handler({
//   onError: (err, req, res) => {
//     res.status(500).end(`Something went wrong! ${err}`);
//   },
//   onNoMatch: (req, res) => {
//     res.status(405).end("Method not allowed");
//   },
// });
