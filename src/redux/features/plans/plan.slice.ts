import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Plan {
  _id?: string;
  limit: number;
  price: number;
  name: string;
  expire?: number;
}

interface PlanState {
  planData: Plan | null;
}

const initialState: PlanState = {
  planData: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlanData: (state, action: PayloadAction<Plan>) => {
      state.planData = action.payload;
    },
    clearPlanData: (state) => {
      state.planData = null;
    },
  },
});

export const { setPlanData, clearPlanData } = planSlice.actions;
export default planSlice.reducer;
