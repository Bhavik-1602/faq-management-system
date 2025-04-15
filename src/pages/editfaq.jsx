import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // 🔔 Import toast
import { FaPen, FaTimes } from 'react-icons/fa';

const EditFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");


  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await axios.get(`https://faq-backend-478w.onrender.com/api/faq/${id}`);
        setQuestion(res.data.question);
        setAnswer(res.data.answer);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
        toast.error("Failed to fetch FAQ details ❌");
      }
    };

    fetchFaq();
  }, [id, `https://faq-backend-478w.onrender.com/api/faq`]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("Are you sure you want to update this FAQ?");
    if (!isConfirmed) return;

    try {
      await axios.put(`https://faq-backend-478w.onrender.com/api/faq/${id}`, { question, answer });
      toast.success("FAQ updated successfully ✅");
      navigate("/home", { state: { fromEdit: true } });
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Failed to update FAQ ❌");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit FAQ</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <FaPen className="h-5 w-5" />
              <span>Update FAQ</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
            >
              <FaTimes className="h-5 w-5" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFaq;
