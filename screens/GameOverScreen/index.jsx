import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import React from 'react'
import { Title, PrimaryButton } from '../../components/ui'

import Colors from '../../constants/colors'

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions()

  let imageSize = 300

  if (width < 380) {
    imageSize = 150
  }

  if (height < 412) {
    imageSize = 80
  }

  const imageSizeStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <Title>Game Is Over!!</Title>
        <View style={[styles.imageContainer, imageSizeStyle]}>
          <Image
            style={styles.imageStyle}
            source={require('../../assets/images/success.png')}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone need <Text style={styles.highligh}>{roundsNumber}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highligh}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  )
}
// const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 24,
  },
  highligh: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
})

export default GameOverScreen
