import { createSlice } from '@reduxjs/toolkit';

const seasonCalculator = (month) => {
	if (month > 3 && month <= 5) {
		return 'spring';
	} else if (month > 5 && month <= 7) {
		return 'summer';
	} else if (month > 7 && month <= 9) {
		return 'autumn';
	} else {
		return 'winter';
	}
};

const initialState = {
	status: 'loading',
	season: seasonCalculator(new Date().getMonth())
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setLoading: (state) => ({ ...state, status: 'loading' }),
		setIdle: (state) => ({ ...state, status: 'idle' })
	}
});

export const { resetGithubRepos, setLoading, setIdle } = appSlice.actions;

export default appSlice.reducer;
