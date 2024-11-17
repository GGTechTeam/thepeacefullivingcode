const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResponseSchema = new Schema({
  courseId: { type: Number, required: true },
  studentId: { type: Number, required: true },
  responses: [
    {
      questionText: { type: String, required: true },
      answerType: { type: String, enum: ['yes-no', 'multiple-choice', 'short-text'], required: true },
      answer: Schema.Types.Mixed, // Store answer based on question type
      responseDate: { type: Date, default: Date.now }, // Default date for each individual response
    }
  ],
  submissionDate: { type: Date, default: null } // Overall submission date
});

module.exports = mongoose.model('Response', ResponseSchema);
