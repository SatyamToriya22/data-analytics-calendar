import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  [key: string]: number;
}

export interface CalendarData {
  [date: string]: UserData[];
}

interface CalendarState {
  data: CalendarData;
  selectedDate: string | null;
}

const initialState: CalendarState = {
  data: {
    '01-09-2025': [{ user_1: 1 }, { user_2: 2 }, { user_3: 3 }, { user_4: 4 }],
    '02-09-2025': [{ user_1: 1 }, { user_2: 2 }, { user_3: 3 }, { user_4: 4 }],
    '03-09-2025': [{ user_1: 1 }, { user_2: 2 }, { user_3: 3 }, { user_4: 4 }],
    '10-09-2025': [{ user_1: 1 }, { user_2: 2 }, { user_3: 3 }, { user_4: 4 }],
  },
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
