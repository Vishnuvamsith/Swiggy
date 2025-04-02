const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Who requested feedback
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Who is receiving feedback
    feedbackText: { type: String, required: true },   // Raw feedback text
    aiSummary: { type: String },  // AI-generated summary (optional)
    feedbackOn: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // The person the feedback is about
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },  // Status of feedback
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
