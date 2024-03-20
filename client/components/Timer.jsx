import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';
import Button from './Button';
import COLORS from '../constants/color'; // Assuming COLORS are defined in a separate file
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress] = useState(new Animated.Value(0));

  const navigation = useNavigation();

  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.navigate('Login'); // Redirect to OtherScreen
  //     return true; // Prevent default behavior (exit app)
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () => backHandler.remove();
  // }, [navigation]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: seconds / 60,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.outerCircle,{color:"#fff"}]}>
        <View style={styles.innerCircle} >
        <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}</Text>
      </View>
          </View>
      </Animated.View>
      
      <View style={styles.buttonsContainer}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={toggleTimer} style={styles.button} />
        <Button title="Reset" onPress={resetTimer} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginTop:0,
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.3,
    // borderColor: 'rgba(138, 43, 226, 0.2)', // Purple color with reduced opacity
    borderColor:COLORS.secondary,
    // shadowColor: COLORS.grey, // Vibrant purple color
    // shadowOpacity: 1, // Adjust the opacity of the shadow to control the glow intensity
    // shadowRadius: 5, // Adjust the blur radius to control the spread of the glow
    elevation: 10, // For Android to apply shadow
  },
  
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor:COLORS.grey,
    borderWidth: 4,

    backgroundColor: COLORS.primary,
  },
  timerContainer: {
    // width: 170,
    // height: 170,
    // borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:60,
    // marginBottom: 20,
    // backgroundColor: COLORS.primary,
    // borderWidth: 3,
    // borderColor: COLORS.secondary,
    // shadowColor: COLORS.primary,
    // shadowColor: COLORS.colorShadow,
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.6,
    // shadowRadius: 15,
    // elevation: 10,
  },
  timerText: {
    fontSize: 40,
    color: COLORS.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    width: 60,
    height: 60,
    color: COLORS.primary,
    borderRadius: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.primary,
    // color:COLORS.black,
  },
});

export default Timer;
