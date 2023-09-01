import mongoose, { Date } from "mongoose";

const explanationOfBenefitSchema = new mongoose.Schema({
  id: Number,
  year: Number,
  eventHeader: String,
  provider: String,
  facility: String,
  eventType: String,
  references: [Number],
  reference: Number,
  serviceDate: Date,
  resourceType: String,
  cost: String,
});

const Timelines = mongoose.model("Timelines", explanationOfBenefitSchema);

export { Timelines };
