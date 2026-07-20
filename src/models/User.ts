
import {Schema, model, set } from "mongoose";



const UserSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
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

// every time a User document is serialized to JSON (e.g. res.json(user)), the response has a clean id string instead of both _id and id.
set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete (converted as Partial<typeof converted>)._id;
  }
});

export default model('User', UserSchema);