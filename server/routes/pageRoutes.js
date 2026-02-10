import express from "express";
import {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage
} from "../controllers/pageController.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createPage)
  .get(getPages);

router.route("/:id")
  .get(getPageById)
  .put(updatePage)   // autosave
  .delete(deletePage);

export default router;
