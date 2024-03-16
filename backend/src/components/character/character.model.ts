import mongoose, { Schema } from "mongoose";

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    appearance: { type: String, required: true },
    story: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userRef: { type: Schema.Types.ObjectId, ref: 'ForumUser' }
});

export default mongoose.model('Character', characterSchema);