import {createSlice} from '@reduxjs/toolkit'

const userslice=createSlice({
    name:'users',
    initialState:{ismoderator:false, isowner:false},
    reducers:{
        togglemod(state)
        {
            state.ismoderator=!state.ismoderator;
        },
        toggleowner(state)
        {
            state.isowner=!state.isowner;
        }
         





        }
    
});

export const userActions=userslice.actions;
export default userslice;