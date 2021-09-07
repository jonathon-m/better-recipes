import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Progress } from '../../../models/progress';

const initialState: Progress = {
  url: '',
  started: false,
  instructionsCompleted: [],
  ingredientsUsed: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setUrl(state: Progress, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    startRecipe(state: Progress) {
      state.started = true;
    },
    completeInstruction(state: Progress, action: PayloadAction<string>) {
      state.instructionsCompleted.push(action.payload);
    },
    undoInstruction(state: Progress, action: PayloadAction<string>) {
      state.instructionsCompleted.splice(
        state.instructionsCompleted.indexOf(action.payload),
        1
      );
    },
  },
});

export const { startRecipe, completeInstruction, undoInstruction, setUrl } =
  progressSlice.actions;
export default progressSlice.reducer;
