const db = require("../config/connection");
const collections = require("../config/collections");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const bcrypt = require("bcrypt");

async function getDrafts(userId) {
  try {
    const drafts = await db
      .get()
      .collection(collections.DRAFT_COLLECTION)
      .find({ userId: new ObjectId(userId) })
      .toArray();
    return { success: true, drafts };
  } catch {
    return { success: false, message: "drafts not found!" };
  }
}

async function getDraft(userId, draftId) {
  try {
    const draft = await db
      .get()
      .collection(collections.DRAFT_COLLECTION)
      .findOne({ userId: new ObjectId(userId), _id: new ObjectId(draftId) });
    return { success: true, draft };
  } catch {
    return { success: false, message: "draft not found!" };
  }
}

async function createDraft(userId) {
  try {
    const draft = await db
      .get()
      .collection(collections.DRAFT_COLLECTION)
      .insertOne({ userId: new ObjectId(userId), content: "" });
    return { success: true, draftId: String(draft.insertedId) };
  } catch (error) {
    return { success: false, message: `draft can't create!` };
  }
}

async function editDraft(userId, draftId, heading, content) {
  try {
    await db
      .get()
      .collection(collections.DRAFT_COLLECTION)
      .updateOne(
        { userId: new ObjectId(userId), _id: new ObjectId(draftId) },
        { $set: { heading, content } }
      );
    return { success: true };
  } catch {
    return { success: false };
  }
}
async function deleteDraft() {}

module.exports = { getDrafts, getDraft, createDraft, editDraft, deleteDraft };
