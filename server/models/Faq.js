// import mongoose from 'mongoose';

// const FAQSchema = new mongoose.Schema({
//   question: String,
//   answer: String,
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
// });

// export default mongoose.model('FAQ', FAQSchema);


// models/Faq.js

import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  category: String // ✅ change from ObjectId to String
});

export default mongoose.model("Faq", faqSchema);
