import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Progress } from '../../../models/progress'

const initialState: Progress = {
    started: false,
    stepIndex: 0,
    ingredientsReady: [],
    ingredientsUsed: []
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    startRecipe(state: Progress) {
        state.started = true
    },
    nextStep(state: Progress) {
        state.stepIndex += 1
    },
    prevStep(state: Progress) {
        state.stepIndex -= 1
    },
    toggleIngredientUsed(state: Progress, action: PayloadAction<string>) {
        const index = state.ingredientsUsed.indexOf(action.payload)
        if (index > -1) {
            state.ingredientsUsed = state.ingredientsUsed.splice(index)
        } else {
            state.ingredientsUsed.push(action.payload)
        }
    },
    toggleIngredientReady(state: Progress, action: PayloadAction<string>) {
        const index = state.ingredientsReady.indexOf(action.payload)
        if (index > -1) {
            state.ingredientsReady = state.ingredientsReady.splice(index)
        } else {
            state.ingredientsReady.push(action.payload)
        }
    },
  },
})

export const { startRecipe, nextStep, prevStep, toggleIngredientReady, toggleIngredientUsed } = progressSlice.actions
export default progressSlice.reducer