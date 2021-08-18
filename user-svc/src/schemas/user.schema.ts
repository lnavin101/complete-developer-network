import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: { type:  String },
    email: { type:  String },
    phone: {
        callingCode: { type:  String },
        number: { type:  String }
    },
    skills: [
        { type:  String }
    ],
    hobby: { type:  String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

