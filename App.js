import { StyleSheet, ImageBackground, View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'

import { StartGameScreen, GameScreen, GameOverScreen } from './screens'
import Colors from './constants/colors'

export default function App() {
  const [userNumber, setUserNumber] = useState(null)
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return (
      <View
        style={[
          styles.rootScreen,
          { backgroundColor: 'white', color: 'black' },
        ]}
      >
        <Text>Loading...</Text>
      </View>
    )
  }

  const pickedNumberHandler = pickedNumber => {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  const gameOverHandler = numberOfRounds => {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  const startNewGame = () => {
    setUserNumber(null)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGame}
      />
    )
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
})
