import { View, StyleSheet, Text } from 'react-native';
import React, {useState, useEffect} from 'react';
import Navbar from './Views/Navbar';
import AuthContainer from './Containers/AuthContainer';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthenticated = (isLoggedIn) => {
    setAuthenticated(isLoggedIn);
  };

  if (authenticated) {
    return (
      <Navbar />
    );
  }
  else {
    return (
      <AuthContainer onAuthenticated={handleAuthenticated} />
    );
  }
}
