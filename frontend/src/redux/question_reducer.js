import { createSlice } from "@reduxjs/toolkit";

export const questionReducer = createSlice({
  name: 'questions',
  initialState: { queue: [], answers: [], trace: 0 },
  reducers: {
    startExamAction: (state, action) => {
      state.queue = action.payload.question;
      state.answers = action.payload.answers;
      state.trace = 0;
    },
    moveNextAction: state => { if(state.trace < state.queue.length-1) state.trace += 1; },
    movePrevAction: state => { if(state.trace > 0) state.trace -= 1; },
    resetAllAction: () => ({ queue: [], answers: [], trace: 0 })
  }
});

export const { startExamAction, moveNextAction, movePrevAction, resetAllAction } = questionReducer.actions;
export default questionReducer.reducer;
