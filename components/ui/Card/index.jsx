import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../../constants/colors'

const Card = ({ children }) => {
  return <View style={styles.cardStyle}>{children}</View>
}

export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  cardStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
})
