import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'

const Title = ({ children }) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    borderColor: '#2f4f4f',
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    padding: 8,
    width: 300,
    maxWidth: '80%',
  },
})
