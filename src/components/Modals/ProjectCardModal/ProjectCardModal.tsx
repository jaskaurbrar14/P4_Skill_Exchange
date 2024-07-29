import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
interface PropTypes {
  isProjectCardModalOpen: boolean;
  onClose: () => void;
  onViewMoreProjects: () => void;
  children?: React.ReactNode
}

const ProjectCardModal: React.FC<PropTypes> = ({ isProjectCardModalOpen, onClose, onViewMoreProjects }) => {
  const [answers, setAnswers] = useState<any[]>([
    { id: 1, answerOne: "Sample answer one", answerTwo: "Sample answer two" }
  ]);
  const [answerOne, setAnswerOne] = useState<string>('');
  const [answerTwo, setAnswerTwo] = useState<string>('');
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [submissionComplete, setSubmissionComplete] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!answerOne || !answerTwo) {
      alert("Please answer all the questions.");
      // TODO: replace the alert in the future
      return;
    }
    setIsReviewMode(true);
  };

  const handleFinalSubmit = () => {
    const item = {
      id: Math.floor(Math.random() * 1000),
      answerOne,
      answerTwo,
    };

    try {
      setAnswers((oldList) => {
        const answers = [...oldList, item];
        // TODO: saving to the localStorage will be replaced with saving to the backend.
        localStorage.setItem("answers", JSON.stringify(answers));
        return answers;
      });
      setAnswerOne("");
      setAnswerTwo("");
      setIsReviewMode(false);
      setSubmissionComplete(true);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      // TODO: Add error handling logic (e.g., display an error message to the user)
    }
  };

  useEffect(() => {
    const itemsFromLocalStorage = localStorage.getItem("answers");
    if (itemsFromLocalStorage) {
      const parsedItemsFromLocalStorage = JSON.parse(itemsFromLocalStorage);
      setAnswers(parsedItemsFromLocalStorage);
    }
  }, []);

  const renderForm = () => (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700" htmlFor="question1">
          Question 1
          {/* should be fetched from be */}
        </label>
        <input
          className="w-full px-3 py-2 border-2 border-black rounded shadow-sm shadow-gray-500 text-sm font-light"
          type="text"
          name="question1"
          value={answerOne}
          onChange={(e) => setAnswerOne(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-700" htmlFor="question2">
          Question 2
          {/* should be fetched from be */}
        </label>
        <input
          className="w-full px-3 py-2 border-2 border-black rounded shadow-sm shadow-gray-500"
          type="text"
          name="question2"
          value={answerTwo}
          onChange={(e) => setAnswerTwo(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-4">
        {/* <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          type="button"
          onClick={onClose}
        >
          Back
        </button> */}
        <button
          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
          type="submit"
        >
          Next: Review
        </button>
      </div>
    </form>
  );

  const renderReview = () => (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="question1">
          Question 1
        </label>
        <p className="w-full px-3 py-2 border border-transparent rounded bg-white">{answerOne}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="question2">
          Question 2
        </label>
        <p className="w-full px-3 py-2 border border-transparent rounded bg-white">{answerTwo}</p>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-white text-gray-700 border border-black rounded hover:bg-gray-100"
          type="button"
          onClick={() => setIsReviewMode(false)}
        >
          Back
        </button>
        <button
          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
          type="button"
          onClick={handleFinalSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );

  const renderSubmissionComplete = () => (
    <div className="text-center">
      <h2 className="text-xl font-semibold">Application submitted</h2>
      <div className="flex justify-center items-center my-4">
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <p className="mb-4 text-sm">Your application to "task name" has been submitted</p>
      {/* task name should be replaced by the real task name from be */}
      <div className="flex justify-center space-x-4">
        <Link
          to="/"
          className="px-4 py-2 bg-white text-gray-700 border border-black rounded hover:bg-gray-100"
        >
          View more projects
        </Link>
        <Link
          to="/profile"
          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600 text-center"
        >
          Go to profile
        </Link>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        isProjectCardModalOpen ? 'visible bg-black/20' : 'invisible'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow p-6 border border-black transition-all max-w-x1 ${
        isProjectCardModalOpen ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
      }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-1 px-2 rounded-md text-gray-500 bg-white hover:text-grey-600"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          X
        </button>
        <article className="space-y-4">
          {submissionComplete ? (
            renderSubmissionComplete()
          ) : (
            <>
              <h2 className="text-lg font-medium">Apply to: "task name"</h2> 
              {/* task name should be fetched from the project info */}
              <section className="text-gray-900 bg-blue-300 p-2 text-sm rounded-md">
                Your profile information will be automatically included with your application.
              </section>
              <h3 className="text-lg font-medium">Additional Questions</h3>
              {isReviewMode ? renderReview() : renderForm()}
            </>
          )}
        </article>
      </div>
    </div>
  );
};

export default ProjectCardModal;
