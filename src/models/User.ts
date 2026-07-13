import mongoose from "mongoose";
import {Schema, model } from "mongoose";
import { maxLength, minLength } from "zod";
 
const UserSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true, // automatically deletes extra spaces at the start and end of a text string before saving it to the database
        minLength: [2, 'Min length is 2 characters'],
        maxLength: [50, 'Max length is 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email is not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password needs to be at least 8 characters'],
        select: false
    }
});

export default model('User', UserSchema);