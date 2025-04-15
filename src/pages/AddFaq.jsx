import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from 'react-icons/fa';

const AddFaq = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Get the URL from environment variables
  const API_URL = `$process.env.REACT_APP_API_URL}/api/faq`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { question, answer });
      toast.success("FAQ added successfully! ✅");
      navigate("/home", { state: { fromAdd: true } });
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast.error("Failed to add FAQ. ❌");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New FAQ</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              <FaCheck className="h-5 w-5" />
              <span>Submit FAQ</span>
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

export default AddFaq;
