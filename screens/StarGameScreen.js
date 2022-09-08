import { TextInput, View, StyleSheet, Alert } from 'react-native'
import { useState } from 'react'

import PrimaryButton from "../components/PrimaryButton"

export default function StarGameScreen() {
  const [enteredNumber, setEnteredNumber] = useState('')

  function inputNumberHandler(enteredText) {
    setEnteredNumber(enteredText)
  }

  function resetInputHandler() {
    setEnteredNumber("")
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber)

    if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be between 0 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    console.log("Valid number!")
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={inputNumberHandler}
        value={enteredNumber}
      />
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.button}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#4e0329",
    borderRadius: 8,
    elevation: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25
  },
  numberInput: {
    height: 50,
    width: 50,
    textAlign: 'center',
    fontSize: 32,
    borderBottomColor: "#ddb526",
    borderBottomWidth: 2,
    color: "#ddb526",
    marginVertical: 8,
    fontWeight: "bold"
  },
  buttonGroup: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    marginTop: 20
  }
})