import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import * as Action from "../redux/question_reducer";

/** fetch questions */
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading: false,
        apiData: [],
        serverError: null,
    });

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        (async () => {
            try {
                const baseURL = process.env.REACT_APP_SERVER_HOSTNAME || "http://localhost:8080";
                const [{ questions, answers }] = await getServerData(`${baseURL}/api/questions`);
                
                if (questions?.length > 0) {
                    setGetData(prev => ({
                        ...prev,
                        isLoading: false,
                        apiData: questions
                    }));
                    dispatch(Action.startExamAction({ question: questions, answers }));
                } else {
                    throw new Error("No Questions Available");
                }
            } catch (error) {
                setGetData(prev => ({
                    ...prev,
                    isLoading: false,
                    serverError: error.message || "Failed to fetch questions"
                }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
};

/** Move Next Action */
export const MoveNextQuestion = () => (dispatch) => dispatch(Action.moveNextAction());

/** Move Prev Action */
export const MovePrevQuestion = () => (dispatch) => dispatch(Action.movePrevAction());
