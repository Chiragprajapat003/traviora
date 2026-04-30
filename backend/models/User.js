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
    profilePicture: { 
      type: String, 
      default: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
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
