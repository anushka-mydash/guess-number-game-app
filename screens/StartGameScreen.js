import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native'
import { useState } from 'react'

import PrimaryButton from "../components/ui/PrimaryButton"
import Title from "../components/ui/Title"
import Card from "../components/ui/Card"
import InstructionText from '../components/ui/InstructionText'

import Colors from "../constants/colors"

export default function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');

  const { height } = useWindowDimensions();

  function inputNumberHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be between 0 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    onPickNumber(chosenNumber);
  }

  const marginTopDistance = height < 480 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={inputNumberHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
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
    flex: 1
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 100,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontFamily: 'open-sans-bold'
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
})