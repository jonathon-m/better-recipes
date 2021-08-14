import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Progress } from '../../../models/progress'
import { Step } from '../../../models/step'

const initialState: Progress = {
    url: '',
    started: false,
    stepIndex: 0,
    ingredientsCurrent: [],
    ingredientsUsed: []
}


function getUsed(steps: Step[], index: number) {
    const stepsCompleted = steps.slice(0, index)
    return stepsCompleted.reduce((acc: string[], curr) => acc.concat(curr.ingredients), [])
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setUrl(state: Progress, action: PayloadAction<string>) {
        state.url = action.payload
    },
    startRecipe(state: Progress) {
        state.started = true
    },
    nextStep(state: Progress) {
        state.stepIndex += 1
    },
    prevStep(state: Progress) {
        if (state.stepIndex > 0) state.stepIndex -= 1
    },
    setIngredients(state: Progress, action: PayloadAction<Step[]>) {
        state.ingredientsUsed = getUsed(action.payload, state.stepIndex)
        state.ingredientsCurrent = action.payload[state.stepIndex].ingredients
    }
  },
})

export const { startRecipe, nextStep, prevStep, setIngredients, setUrl } = progressSlice.actions
export default progressSlice.reducer