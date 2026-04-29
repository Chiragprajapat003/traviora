import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      ageGroup: {
        type: String,
        default: null,
      },
      travelerType: {
        type: String,
        enum: ['men', 'women', 'family', null],
        default: null,
      },
      travelStyles: {
        type: [String],
        default: [],
      },
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
