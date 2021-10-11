import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    description: { 
      type: String, 
      required: true },
    duration: { 
      type: Number,
       required: true },
    date: { 
      type: Date, 
      required: true },
},{
    timestamps: true,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;