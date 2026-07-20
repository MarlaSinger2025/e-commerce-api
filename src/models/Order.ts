import { Schema, model, set } from 'mongoose';

const orderSchema = new Schema ({
    
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{ 
        productId: {
            type: Schema.Types.ObjectId, 
            ref: 'Product',
            required: true}, 
        quantity: { 
            type: Number,
        required: true, }
        }],
    total: {
        type: Number,
    },
},
 {
    timestamps: true
    },
);

// every time a Order document is serialized to JSON, the response has a clean id string instead of both _id and id.
set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete (converted as Partial<typeof converted>)._id;
  }
});

export default model('Order', orderSchema);