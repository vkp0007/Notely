import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
export const SECURITY_QUESTIONS = [
  {
    id: "sports_team",
    label: "Your favorite sports team?"
  },
  {
    id: "street_food",
    label: "Favorite street food?"
  },
  {
    id: "travel_destination",
    label: "Dream travel destination?"
  },
  {
    id: "first_movie",
    label: "First movie you remember watching?"
  }
];


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  securityQuestion: {
    questionId: {
      type: String,
      enum: [
        "sports_team",
        "street_food",
        "travel_destination",
        "first_movie"
      ],
      required: true
    },
    answerHash: {
      type: String,
      required: true
    },
    attempts: {
      type: Number,
      default: 0
    },
    lockedUntil: {
      type: Date
    }
  }

}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model('User', userSchema)