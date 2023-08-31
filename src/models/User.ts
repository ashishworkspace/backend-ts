import { Schema, model, Document, Model } from "mongoose";

interface UserAttrs {
  email: string;
  password: string;
  phone: number;
  username: string;
  authType: string;
}

export interface newUserSession {
  authType: string;
  username: string;
  email: string;
  phone: number;
}

interface UserDoc extends UserAttrs, Document {
  newUserSession(): newUserSession;
}

interface UserModel extends Model<UserDoc> {}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  authType: {
    type: String,
  },
});

UserSchema.methods.newUserSession = function newUserSession(): newUserSession {
  return {
    authType: this.authType,
    email: this.email,
    phone: this.phone,
    username: this.username,
  };
};

const User = model<UserDoc, UserModel>("User", UserSchema);

export { User };
