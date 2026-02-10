import { Page } from "../models/page.model.js";

/**
 * @desc    Create a new page
 * @route   POST /api/pages
 * @access  Private
 */
const createPage = async (req, res) => {
  try {
    const { title, content } = req.body;
    const page = await Page.create({ title, content, user: req.user._id });

    res.status(201).json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all pages of logged-in user
 * @route   GET /api/pages
 * @access  Private
 */
const getPages = async (req, res) => {
  try {
    const deleted = req.query.deleted === "true";

    const pages = await Page.find({
      user: req.user._id,
      isDeleted: deleted
    }).sort({ updatedAt: -1 });

    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single page
 * @route   GET /api/pages/:id
 * @access  Private
 */
const getPageById = async (req, res) => {
  try {
    const page = await Page.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update page (Autosave)
 * @route   PUT /api/pages/:id
 * @access  Private
 */
const updatePage = async (req, res) => {
  try {
    const page = await Page.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    page.title = req.body.title ?? page.title;
    page.content = req.body.content ?? page.content;
    page.isDeleted = req.body.isDeleted ?? page.isDeleted; // ✅ FIX

    const updatedPage = await page.save();
    res.json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete page
 * @route   DELETE /api/pages/:id
 * @access  Private
 */
const deletePage = async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json({ message: "Page deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage
};
