import { postServerData } from '../helper/helper';
import * as Action from '../redux/result_reducer';
import { useEffect } from 'react';

export const PushAnswer = (result) => (dispatch) => dispatch(Action.pushResultAction(result));

export const updateResult = (index) => (dispatch) => dispatch(Action.updateResultAction(index));

export const usePublishResult = (resultData) => {
    useEffect(() => {
        const publishResult = async () => {
            try {
                if (!resultData.result?.length || !resultData.username)
                    throw new Error("Couldn't get Result");
                await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultData);
            } catch (error) {
                console.log(error);
            }
        };
        publishResult();
    }, [resultData]);
};
