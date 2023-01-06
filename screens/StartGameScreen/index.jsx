import React from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'
import { PrimaryButton } from '@components'

const StartGameScreen = () => {
  return (
    <View>
      <TextInput />
      <PrimaryButton>Reset</PrimaryButton>
      <PrimaryButton>Confirm</PrimaryButton>
    </View>
  )
}

const styles = StyleSheet.create({})

export default StartGameScreen
