import {configureStore} from '@reduxjs/toolkit'
import userslice from'./userslice.js'
const store =configureStore({
reducer:{user:userslice.reducer}
})


export default store;