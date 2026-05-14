import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.UUID,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: String
}, {
    timestamps: true
});

export const mongooseUserModel = mongoose.model('User', userSchema);