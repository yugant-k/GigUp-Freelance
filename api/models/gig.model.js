import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: [
          'Design',
          'Video',
          'Writing',
          'AI',
          'Marketing',
          'Audio',
          'Programming',
          'Business',
          'Lifestyle',
          'Art',
          'Other'
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    descMedia: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);