// // store/slices/profileSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   name: "",
//   age: "",
//   email: "",
//   address: "",
//   coins: 1250,
//   streak: 7,
 
// };

// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     updateProfile: (state, action) => {
//       return { ...state, ...action.payload };
//     },
//     // Add other reducers as needed
//   },
// });

// export const { updateProfile } = profileSlice.actions;
// export default profileSlice.reducer;





import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  name: string;
  age: string;
  email: string;
  education: string;
  reason: string;
}

const initialState: ProfileState = {
  name: "",
  age: "",
  email: "",
  education: "",
  reason: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      return { ...state, ...action.payload };
    },
    clearProfile: () => initialState,
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
