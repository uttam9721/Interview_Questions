import axios from './axios';

const getFAQs = async () => {
  const res = await axios.get('/faqs');
  return res.data;
};

const createFAQ = async (faq, token) => {
  const res = await axios.post('/faqs', faq, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const deleteFAQ = async (id, token) => {
  const res = await axios.delete(`/faqs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export { getFAQs, createFAQ, deleteFAQ };
