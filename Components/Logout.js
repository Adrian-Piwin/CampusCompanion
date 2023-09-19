import { View,  Button } from 'react-native'; 
import React from "react";

export default function LogoutButton ({ onLogout }) {
  return (
    <View>
      <Button onClick={onLogout}>Logout</Button>
    </View>
  );
};

