import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: [
        {
            type: String,
            ref: 'Role',
            required: true
        }
    ],
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    }
}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema)