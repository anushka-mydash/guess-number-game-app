import { useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

import Colors from './constants/colors'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [roundsNumber, setRoundsNumber] = useState(0);
  const [isGameOver, setIsGameOver] = useState(true);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  function pickNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setIsGameOver(false)
  }

  function GameOverHandler(rounds) {
    setRoundsNumber(rounds)
    setIsGameOver(true)
  }

  function startNewGame() {
    setUserNumber(null)
    setRoundsNumber(0)
  }

  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={GameOverHandler} />
  }

  if (isGameOver && userNumber) {
    screen = <GameOverScreen
      userNumber={userNumber}
      roundsNumber={roundsNumber}
      onStartNewGame={startNewGame}
    />
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={styles.rootScreen}
    >
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <StatusBar style={"light"} />
        <ImageBackground
          source={require("./assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.imgBackground}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  imgBackground: {
    opacity: 0.15
  }
});
