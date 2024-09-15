import mongoose from 'mongoose';
const { Schema } = mongoose;

const folderSchema = new Schema({
   username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  folderName: { type: String },
  parentFolderId: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  },
  
}, { timestamps: true });


//@ts-ignore
mongoose.models = {}

export default mongoose.model("Folder", folderSchema);