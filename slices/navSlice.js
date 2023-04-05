import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    trevelTimeInformation:null,
    priceForTravel:0,
    orderDone:false,
}


export const navSlice = createSlice({
    name:'nav',
    initialState,
    reducers:{
    setOrigin: (state , action) => {
        state.origin = action.payload;
    },
    setDestination: (state , action) => {
        state.destination = action.payload;
    },
    setTrevelTimeInformation: (state , action) => {
        state.trevelTimeInformation = action.payload;
    },
    setPriceForTravel: (state , action) => {
        state.priceForTravel = action.payload;
    }
    }
})

export const {setOrigin , setDestination , setTrevelTimeInformation , setPriceForTravel} = navSlice.actions;

//Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.trevelTimeInformation;
export const selectPriceForTravel = (state) => state.nav.priceForTravel;

export default navSlice.reducer;

