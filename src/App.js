import React from 'react';
import AuthRouter from './components/AuthRouter';
import AuthProvider from './components/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <AuthRouter/>
    </AuthProvider>
  )
}

export default App