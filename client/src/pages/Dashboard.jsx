// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [category, setCategory] = useState('');
//   const [faqs, setFaqs] = useState([]);

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     // ✅ Redirect to login if no token found
//     if (!token) {
//       navigate('/admin');
//     } else {
//       fetchFAQs();
//     }
//   }, [token, navigate]);

//   const fetchFAQs = async () => {
//     try {
//       const res = await axios.get('/faqs');
//       setFaqs(res.data);
//     } catch (error) {
//       console.error('Error fetching FAQs:', error);
//     }
//   };

//   const handleAdd = async () => {
//     try {
//       await axios.post(
//         '/faqs',
//         { question, answer, category },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setQuestion('');
//       setAnswer('');
//       setCategory('');
//       fetchFAQs();
//     } catch (error) {
//       alert('Add failed. Possibly unauthorized.');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/faqs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchFAQs();
//     } catch (error) {
//       alert('Delete failed. Possibly unauthorized.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="flex flex-col gap-3 mb-6">
//         <input className="border p-2" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
//         <input className="border p-2" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
//         <input className="border p-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
//         <button className="bg-green-600 text-white px-4 py-2 rounded w-full" onClick={handleAdd}>
//           Add FAQ
//         </button>
//       </div>

//       <h2 className="text-xl font-semibold mb-2">All FAQs</h2>
//       {faqs.map((faq) => (
//         <div key={faq._id} className="border p-3 mb-2 flex justify-between items-center">
//           <div>
//             <p className="font-medium">{faq.question}</p>
//             <p className="text-sm text-gray-600">{faq.answer}</p>
//           </div>
//           <button onClick={() => handleDelete(faq._id)} className="text-red-500">Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFAQs, createFAQ, deleteFAQ } from '../api/FaqApi';

const Dashboard = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [faqs, setFaqs] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/admin');
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const data = await getFAQs();
      setFaqs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      await createFAQ({ question, answer, category }, token);
      setQuestion('');
      setAnswer('');
      setCategory('');
      fetchData();
    } catch (err) {
      alert('Error adding FAQ');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFAQ(id, token);
      fetchData();
    } catch (err) {
      alert('Error deleting FAQ');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-col gap-3 mb-6">
        <input className="border p-2" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <input className="border p-2" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <input className="border p-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full" onClick={handleAdd}>
          Add FAQ
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">All FAQs</h2>
      {faqs.map((faq) => (
        <div key={faq._id} className="border p-3 mb-2 flex justify-between items-center">
          <div>
            <p className="font-medium">{faq.question}</p>
            <p className="text-sm text-gray-600">{faq.answer}</p>
            <p className="text-xs text-gray-400">Category: {faq.category?.name || faq.category}</p>
          </div>
          <button onClick={() => handleDelete(faq._id)} className="text-red-500">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
