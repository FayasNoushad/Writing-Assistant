const express = require("express");
const {
  getDrafts,
  getDraft,
  createDraft,
  editDraft,
} = require("../helpers/draft-helpers");
const { authenticateToken } = require("../helpers/user-helpers");
const router = express.Router();

router.post("/drafts/", authenticateToken, async (req, res) => {
  try {
    const response = await getDrafts(req.user.id);
    res.json(response).status(response.success ? 200 : 400);
  } catch {
    res.status(400).json({ success: false });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const response = await createDraft(req.user.id);
    res.json(response).status(response.success ? 200 : 400);
  } catch {
    res.status(400).json({ success: false });
  }
});

router.post("/get/", authenticateToken, async (req, res) => {
  try {
    const response = await getDraft(req.user.id, req.body.draftId);
    res.json(response).status(response.success ? 200 : 400);
  } catch {
    res.status(400).json({ success: false });
  }
});

router.post("/save/", authenticateToken, async (req, res) => {
  try {
    const response = editDraft(
      req.user.id,
      req.body.draftId,
      req.body.heading,
      req.body.content
    );
    res.json(response).status(response.success ? 200 : 400);
  } catch {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
