import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LearnerSubscription } from "@/api/learner/subscriptions";

interface SubscriptionState {
  subscriptions: LearnerSubscription[];
}

const initialState: SubscriptionState = {
  subscriptions: [],
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptions: (state, action: PayloadAction<LearnerSubscription[]>) => {
      state.subscriptions = action.payload;
    },
    clearSubscriptions: (state) => {
      state.subscriptions = [];
    },
    setLogoutSubscription: (state) => {
      state.subscriptions = [];
    },
  },
});

export const { setSubscriptions, clearSubscriptions, setLogoutSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
