import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserId } from '../redux/result_reducer';
import '../styles/Main.css';

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function startQuiz(e) {
    e.preventDefault();
    const username = inputRef.current?.value.trim();
    if (username) {
      dispatch(setUserId(username));
      navigate('/quiz');
    } else {
      alert('Please enter a username before starting the quiz!');
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>
      <ol>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points are awarded for the correct answer.</li>
        <li>Each question has three options. You can choose only one option.</li>
        <li>You can review and change answers before the quiz finishes.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <form id="form" onSubmit={startQuiz}>
        <input
          ref={inputRef}
          className="userid"
          type="text"
          placeholder="Username*"
        />
        {/* Start button right below the input */}
        <button type="submit" className="btn start-btn">
          Start Quiz
        </button>
      </form>
    </div>
  );
}
