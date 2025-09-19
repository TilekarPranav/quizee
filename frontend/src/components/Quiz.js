import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Questions from './Questions';
import { PushAnswer } from '../hooks/setResult';
import { MoveNextQuestion, MovePrevQuestion, useFetchQuestion } from '../hooks/FetchQuestion';

export default function Quiz() {
  const dispatch = useDispatch();
  const { queue, trace } = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);

  const [checked, setChecked] = useState(undefined);
  const [{ isLoading, serverError }] = useFetchQuestion();

  // Reset checked when trace changes
  useEffect(() => {
    setChecked(result[trace] ?? undefined);
  }, [trace, result]);

  function onNext() {
    if (!queue || queue.length === 0) return;

    if (result.length <= trace) dispatch(PushAnswer(checked));
    dispatch(MoveNextQuestion());
  }

  function onPrev() {
    if (trace > 0) dispatch(MovePrevQuestion());
  }

  function onChecked(optionIndex) {
    setChecked(optionIndex);
  }

  if (result.length && queue && result.length >= queue.length)
    return <Navigate to="/result" replace />;

  if (isLoading) return <h3 className="text-light">Loading Questions...</h3>;
  if (serverError) return <h3 className="text-light">{serverError}</h3>;

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <Questions
        question={queue[trace]}
        onChecked={onChecked}
        result={result}
        trace={trace}
      />

      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>Prev</button>
        ) : <div></div>}
        <button className="btn next" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}
