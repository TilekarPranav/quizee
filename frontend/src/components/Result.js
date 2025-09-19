import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import ResultTable from './ResultTable';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';
import '../styles/Result.css';

export default function Result() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { queue, answers } = useSelector(state => state.questions);
  const { result, userId } = useSelector(state => state.result);

  // ✅ compute all values safely
  const totalPoints = queue?.length ? queue.length * 10 : 0;
  const attempts = result?.length ? attempts_Number(result) : 0;
  const earnPoints = result?.length ? earnPoints_Number(result, answers, 10) : 0;
  const flag = flagResult(totalPoints, earnPoints);

  // ✅ call hook unconditionally
  usePublishResult({ result, username: userId, attempts, points: earnPoints, achived: flag ? "Passed" : "Failed" });

  // ✅ redirect if no quiz attempted
  useEffect(() => {
    if (!queue?.length || !result?.length) navigate('/');
  }, [queue, result, navigate]);

  if (!queue?.length || !result?.length) return null;

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      <div className='result flex-center'>
        <div className='flex'><span>Username</span><span className='bold'>{userId || ""}</span></div>
        <div className='flex'><span>Total Quiz Points :</span><span className='bold'>{totalPoints}</span></div>
        <div className='flex'><span>Total Questions :</span><span className='bold'>{queue.length}</span></div>
        <div className='flex'><span>Total Attempts :</span><span className='bold'>{attempts}</span></div>
        <div className='flex'><span>Total Earn Points :</span><span className='bold'>{earnPoints}</span></div>
        <div className='flex'><span>Quiz Result</span><span style={{ color: flag ? "#2aff95" : "#ff2a66" }} className='bold'>{flag ? "Passed" : "Failed"}</span></div>
      </div>
      <div className="start">
        <Link className='btn' to='/' onClick={onRestart}>Restart</Link>
      </div>
      <div className="container">
        <ResultTable />
      </div>
    </div>
  );
}
