import { createSlice } from '@reduxjs/toolkit';



const loginslice = createSlice({
    name: 'login',
    initialState: {
        token: localStorage.getItem('token') || null,
        enable: false
      
    },
    reducers: {
        logindone: (state, action) => {
            // Directly set token and role from payload
            state.token = action.payload;
          console.log(action.payload)

           
           
        },
        logoutdone: (state) => {
         
            const authtoken = localStorage.getItem('token');
          
     
           

            // Clear token and role
            state.token = null;
        

            // Remove from local storage
            localStorage.removeItem('token');
           
        },
        enableDone: (state , action) => {
            state.enable = action.payload
        }
    }
});

export const { logindone, logoutdone , enableDone } = loginslice.actions;
export default loginslice.reducer;