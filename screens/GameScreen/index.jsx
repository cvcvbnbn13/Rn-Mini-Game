import {
  StyleSheet,
  View,
  Alert,
  useWindowDimensions,
  FlatList,
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Title, Card, InstructionText } from '../../components/ui'
import { NumberContainer, GuessLogItem } from '../../components/game'
import { PrimaryButton } from '../../components/ui'
import { Ionicons } from '@expo/vector-icons'

let minBoundary = 1
let maxBoundary = 100

const GameScreen = ({ userNumber, onGameOver }) => {
  const { width, height } = useWindowDimensions()

  const generateRandomBetween = useCallback((min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude)
    } else {
      return rndNum
    }
  }, [])

  const initialGuessNumber = generateRandomBetween(1, 100, userNumber)

  const [currentGuessNumber, setCurrentGuessNumber] =
    useState(initialGuessNumber)

  const [guessRounds, setGuessRounds] = useState([initialGuessNumber])

  const guessRoundsListLength = guessRounds.length

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuessNumber < userNumber) ||
      (direction === 'greater' && currentGuessNumber > userNumber)
    ) {
      Alert.alert("Don't lie", 'You Know that this is wrong...', [
        { text: 'OKAY', style: 'cancel' },
      ])
      return
    }

    if (direction === 'lower') {
      maxBoundary = currentGuessNumber
    } else {
      minBoundary = currentGuessNumber + 1
    }
    const newGuessNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuessNumber
    )
    setCurrentGuessNumber(newGuessNumber)
    setGuessRounds(prevGuessRounds => [newGuessNumber, ...prevGuessRounds])
  }

  useEffect(() => {
    if (currentGuessNumber === userNumber) {
      onGameOver(guessRounds.length)
    }
  }, [currentGuessNumber, userNumber, onGameOver])

  useEffect(() => {
    minBoundary = 1
    maxBoundary = 100
  }, [])

  let content = (
    <React.Fragment>
      <NumberContainer>{currentGuessNumber}</NumberContainer>
      <Card>
        <InstructionText styleProps={styles.instructionTextStyle}>
          Higher of lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </React.Fragment>
  )

  if (width > 500) {
    content = (
      <React.Fragment>
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuessNumber}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </React.Fragment>
    )
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.flatListContainer}>
        <FlatList
          data={guessRounds}
          renderItem={itemData => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item, index) => item}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  instructionTextStyle: {
    marginBottom: 12,
  },
  flatListContainer: {
    flex: 1,
    padding: 16,
  },
})

export default GameScreen
