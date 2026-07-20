import { Schema, model, set } from 'mongoose';

const productSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Productname is required'],
        trim: true,
        minLength: [2, 'Min length is 2 characters'],
        maxLength: [100, 'Max length is 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [2, 'Min length is 2 characters'],
        maxLength: [250, 'Max length is 250 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    categoryId : {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
    
});

// every time a User document is serialized to JSON (e.g. res.json(user)), the response has a clean id string instead of both _id and id.
set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete (converted as Partial<typeof converted>)._id;
  }
});

export default model('Product', productSchema);