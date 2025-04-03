import { gstSchema } from "../model/gstModel.js";

// Helper function: create GST record (no Express objects here)
const createGst = async () => {
  try {
    const gstValue = 18;
    const gstData = new gstSchema({ gst: gstValue });
    await gstData.save();
    return "gst add";
  } catch (error) {
    throw error;
  }
};

// Controller: Check for existing GST record and create if none exists
export const gst = async (req, res) => {
  try {
    // Look for an existing GST record
    let gstRecord = await gstSchema.findOne({});
    if (!gstRecord) {
      // If not found, create one
      await createGst();
      gstRecord = await gstSchema.findOne({});
    }
    res.status(200).json(gstRecord);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "gst is not calculated" });
  }
};
