import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa"; 

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 4;
  const [openFaqId, setOpenFaqId] = useState(null);

  // Get the URL from environment variables
  // eslint-disable-next-line no-undef
  const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

  const fetchFaqs = async () => {
    try {
      const res = await axios.get(API_URL);
      setFaqs(res.data.reverse()); // Display FAQ from top
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this FAQ?");
    if (!confirmed) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setFaqs((prev) => prev.filter((faq) => faq._id !== id));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  useEffect(() => {
    if (location.state?.fromAdd || location.state?.fromEdit) {
      fetchFaqs();
    }
  }, [location.state]);

  // Filter based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirstFaq, indexOfLastFaq);
  const totalPages = Math.ceil(filteredFaqs.length / faqsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">FAQs</h2>
        <button
          onClick={() => navigate("/add-faq")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition flex items-center space-x-2"
        >
          <FaPlus className="h-4 w-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search FAQ..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 when searching
          }}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="grid gap-4">
        {currentFaqs.map((faq) => (
          <div
            key={faq._id}
            className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 transition-all duration-300 ease-in-out"
          >
            {/* Question */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setOpenFaqId(openFaqId === faq._id ? null : faq._id)}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h3>
              <span className="text-blue-600 text-xl transition-transform duration-300">
                {openFaqId === faq._id ? "−" : "+"}
              </span>
            </div>

            {/* Animated Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openFaqId === faq._id ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => navigate(`/edit-faq/${faq._id}`)}>
                <FaEdit className="text-xl text-blue-600 hover:text-blue-800 transition" />
              </button>
              <button onClick={() => handleDelete(faq._id)}>
                <FaTrashAlt className="text-xl text-red-600 hover:text-red-800 transition" />
              </button>
            </div>
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-500">No FAQs found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-blue-700 text-white font-semibold"
                    : "bg-gray-200 text-gray-800 hover:bg-blue-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
