import React from 'react';
import { useDispatch } from 'react-redux';
import { updateResult } from '../hooks/setResult';

export default function Questions({ question, onChecked, trace, result }) {
  const dispatch = useDispatch();

  if (!question) return <h3 className="text-light">Loading...</h3>;

  function onSelect(optionIndex) {
    dispatch(updateResult({ trace, checked: optionIndex }));
    onChecked(optionIndex);
  }

  return (
    <div className="questions">
      <h2 className="text-light">{question.question}</h2>
      <ul key={question.id}>
        {question.options.map((option, i) => (
          <li key={i}>
            <input
              type="radio"
              name={`q${trace}-options`}
              id={`q${trace}-option-${i}`}
              onChange={() => onSelect(i)}
              checked={result[trace] === i}
            />
            <label className="text-primary" htmlFor={`q${trace}-option-${i}`}>{option}</label>
            <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
