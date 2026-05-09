import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TestState, TestAnswers } from '@/types/test';
import { apiUrl } from '@/api';

// API call pour soumettre le test avec le score total
export const submitTest = createAsyncThunk(
  'test/submitTest',
  async ({ totalScore, token }: { totalScore: number; token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}passTest`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          point: totalScore.toString()
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la soumission du test:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Erreur inconnue');
    }
  }
);

// Modifions l'interface TestState pour supporter les réponses multiples


const initialState: TestState = {
  isSubmitting: false,
  answers: {} as TestAnswers,
  error: null,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // Garder l'ancien setAnswer pour les radios
    setAnswer: (state, action: PayloadAction<{ subQuestionId: string; optionId: string }>) => {
      state.answers[action.payload.subQuestionId] = [action.payload.optionId];
    },
    // Ajouter toggleCheckboxAnswer pour les checkboxes
    toggleCheckboxAnswer: (state, action: PayloadAction<{ subQuestionId: string; optionId: string }>) => {
      const { subQuestionId, optionId } = action.payload;
      if (!state.answers[subQuestionId]) {
        state.answers[subQuestionId] = [optionId];
      } else {
        const currentAnswers = state.answers[subQuestionId];
        const index = currentAnswers.indexOf(optionId);
        if (index === -1) {
          currentAnswers.push(optionId);
        } else {
          currentAnswers.splice(index, 1);
        }
        if (currentAnswers.length === 0) {
          delete state.answers[subQuestionId];
        }
      }
    },
    clearAnswers: (state) => {
      state.answers = {};
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTest.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitTest.fulfilled, (state) => {
        state.isSubmitting = false;
        state.answers = {};
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string || 'Erreur lors de la soumission du test';
      });
  },
});

export const { setAnswer, toggleCheckboxAnswer, clearAnswers, clearError } = testSlice.actions;
export default testSlice.reducer;
