import { registerRootComponent } from 'expo';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

const AppWrapper = () => {
  return (
      <Provider store={store}>
        <StatusBar  />
         <PaperProvider>
       <App />
         </PaperProvider>
      </Provider>
  )
}

registerRootComponent(AppWrapper);