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

UserSchema.virtual('phoneNumber').get(function(){
    return (this.phone.callingCode || '') + this.phone.number;
})

UserSchema.virtual('skillsets').get(function(){
    return this.skills.join(', ');
})

UserSchema.set('toJSON', {
    virtuals: true
});