// import FAQ from '../models/FAQ.js';
import Faq from '../models/Faq.js';
import Category from '../models/Category.js';

export const getAllFAQs = async (req, res) => {
  const faqs = await Faq.find().populate('category');
  res.json(faqs);
};

// export const createFAQ = async (req, res) => {
//   const { question, answer, category } = req.body;
//   const newFAQ = new Faq.create({ question, answer, category });
//   await newFAQ.save();
//   res.json(newFAQ);
// };

export const createFAQ = async (req, res) => {
  const { question, answer, category } = req.body;
  const newFAQ = await Faq.create({ question, answer, category });
  res.json(newFAQ);
};


export const deleteFAQ = async (req, res) => {
  const { id } = req.params;
  await Faq.findByIdAndDelete(id);
  res.json({ message: 'Deleted successfully' });
};
