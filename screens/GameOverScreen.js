import { View, Image, StyleSheet, Text, useWindowDimensions, ScrollView } from 'react-native'

import Title from '../components/ui/Title'
import PrimaryButton from '../components/ui/PrimaryButton'

import Colors from '../constants/colors'

export default function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 300) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 120;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: (imageSize / 2)
  }

  return (
    <ScrollView style={[styles.screen,
    { paddingTop: height < 400 ? 0 : 50 }]}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            source={require('../assets/images/success.png')}
            style={[imageStyle]}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed
          <Text style={styles.highlight}> {roundsNumber} </Text>
          rounds to guess the number
          <Text style={styles.highlight}> {userNumber} </Text>
          .</Text>

        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary700,
    overflow: 'hidden',
    margin: 32
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
})