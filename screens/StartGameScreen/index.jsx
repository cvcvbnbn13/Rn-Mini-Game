import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  useWindowDimensions,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { useState } from 'react'
import {
  PrimaryButton,
  Title,
  Card,
  InstructionText,
} from '../../components/ui'
import Colors from '../../constants/colors'

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState('')

  const { width, height } = useWindowDimensions()

  const resetInputNumber = () => {
    setEnteredNumber('')
  }

  const numberInputHandler = entered => {
    setEnteredNumber(entered)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber, 10)

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: resetInputNumber,
          },
        ]
      )
      return
    }

    onPickNumber(chosenNumber)
  }

  const marginTopDistance = height < 380 ? 30 : 100

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        keyboardVerticalOffset={50}
        behavior={'position'}
      >
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Try to Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputNumber}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
})

export default StartGameScreen
