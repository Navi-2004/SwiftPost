import React, { useEffect } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import COLORS from '../constants/color';
// import { WebView } from 'react-native-webview';

const Loading = () => {
 

  return (
    <View style={styles.container}>
      <View style={styles.spinner} />
      <Text>Loading...</Text>
      {/* <WebView
        source={{ uri: 'https://giphy.com/embed/xTkcEQACH24SMPxIQg' }}
        style={styles.webview}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: COLORS.primary, // #66FCF1 with reduced opacity
    borderTopColor: '#66FCF1',
    borderRadius: 20,
    animation: 'spin 1s linear infinite',
  },
});

export default Loading;
