import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Home = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get('/faqs').then((res) => {
      setFaqs(res.data);
    });
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
      {faqs.map((faq, idx) => (
        <div key={idx} className="mb-4 border p-4 rounded">
          <h2 className="font-semibold">{faq.question}</h2>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
