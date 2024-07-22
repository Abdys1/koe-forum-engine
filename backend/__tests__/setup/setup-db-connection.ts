import config from "@src/config"
import mongoose from "mongoose"

beforeAll(async () => {
    await mongoose.connect(config.database.url);
})

afterAll(async () => {
    await mongoose.disconnect();
})