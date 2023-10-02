import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema([{
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    index: true,
    required: 'description required'
  },
  created: {
    type: Date,
    default: Date.now
}
}]);

export default mongoose.model('category', categorySchema);
