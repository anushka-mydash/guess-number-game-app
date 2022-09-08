import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'

export default function GameScreen({ userNumber }) {
  function generateRandomBetween(min, max, exclude) {
    const rdmNum = Math.floor(Math.random() * (max - min) + min)

    if (rdmNum == exclude)
      generateRandomBetween(min, max, exclude)
    else
      return rdmNum
  }

  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  
  console.log(currentGuess)
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <View>
        <Text>Higher or lower</Text>
        {/* + 
        - */}
      </View>
      <View>
        {/* LOG ROUNDS */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 24
  },

})