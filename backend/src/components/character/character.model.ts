import { CharacterEntity } from "@src/components/character/types";
import mongoose, { Schema } from "mongoose";

const characterSchema = new mongoose.Schema<CharacterEntity>({
    name: { type: String, required: true, unique: true },
    sex: { type: Number, required: true },
    race: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userRef: { type: Schema.Types.ObjectId, ref: 'ForumUser' }
});

export const CharacterModel = mongoose.model<CharacterEntity>('Character', characterSchema);