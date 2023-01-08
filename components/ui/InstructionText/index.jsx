import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/colors'

const InstructionText = ({ children, styleProps }) => {
  return <Text style={[styles.instructionText, styleProps]}>{children}</Text>
}

export default InstructionText

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
})
