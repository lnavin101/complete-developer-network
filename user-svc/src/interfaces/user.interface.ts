import { Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    phone: Object;
    skills: string[];
    hobby: string;
}
