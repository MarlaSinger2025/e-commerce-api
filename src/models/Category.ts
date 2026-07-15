import {Schema, model, set} from 'mongoose';

const CategorySchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Categoryname is required'],
        trim: true,
        unique: true,
        minLength: [2, 'Min length is 2 chars'],
        maxLength: [100, 'Max length 100 chars']
    }
});

// every time a User document is serialized to JSON (e.g. res.json(user)), the response has a clean id string instead of both _id and id.
set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete (converted as Partial<typeof converted>)._id;
  }
});

export default model('Category', CategorySchema);