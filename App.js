/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Switch
} from 'react-native';

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('green');
  const [inputValue, setInputValue] = useState('');
  const [regexValid, setRegexValid] = useState(true);
  const [safetyOn, setSaftyOn] = useState(true);
  const [buttons] = useState([
   
    {title: 'positive lookbehind', regex: '(?<=a)b'},
    {title: 'negative lookbehind', regex: '(?<!a)b'},
    {title: 'positive lookahead', regex: 'x(?=y)'},
    {title: 'negative lookahead', regex: 'x(?!y)'},
    {title: 'email', regex: '^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'},
    {title: 'html', regex: '^<([a-z]+)([^<]+)*(?:>(.*)</1>|s+/>)$'},
    {
      title: 'date',
      regex:
        '^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$',
    },
    {
      title: 'phone number',
      regex: '^(?:(?:\\(?(?:00|\\+)([1-4]\\\\d\\\\d|[1-9]\\\\d?)\\)?)?[\\-\\.\\ \\\\\\/]?)?((?:\\(?\\d{1,}\\)?[\\-\\.\\ \\\\\\/]?){0,})(?:[\\-\\.\\ \\\\\\/]?(?:#|ext\\.?|extension|x)[\\-\\.\\ \\\\\\/]?(\\d+))?$',
    },
    {title: 'zip code', regex: '^[0-9]{5}(?:-[0-9]{4})?$'},
  ]);

  useEffect(() => {
    if(safetyOn) {
      const color = regexValid ? 'green' : 'red';
      setBackgroundColor(color);
    }else{
      setBackgroundColor('#333')
    }
   
  }, [regexValid, safetyOn]);



  const toggleSwitch = () => setSaftyOn(previousState => !previousState);


  const checkRegex = (regex) => {
    let isValid = true;
    if(safetyOn) {
      try {
        new RegExp(regex);
      } catch (e) {
        isValid = false;
      }
  
    }else{
     
      new RegExp(regex);

    }
    setRegexValid(isValid);
   
  };

  const sendRegexToInput = (regex) => {
    setInputValue(regex);
    checkRegex(regex);
  };

  const onChangeText = (text) => {
    setInputValue(text);
    checkRegex(text);
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      style={{...styles.scrollView, backgroundColor: backgroundColor}}>
      <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
      <View style={{...styles.container, backgroundColor: backgroundColor}}>
        <Text style={styles.text}>
          Regex is {regexValid ? 'valid' : 'not valid'}
        </Text>
        <View style={styles.safetySwitchContainer}>
        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={safetyOn ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={safetyOn}
      />
          <Text style={{color: '#fff'}}>Safety Switch {safetyOn ? 'on' : 'off'}</Text>
        </View>
       
        <TextInput
          placeholder="Enter regex"
          style={styles.input}
          onChangeText={(text) => onChangeText(text)}
          value={inputValue}
        />
        <Text style={styles.value}>{inputValue}</Text>
        <View style={styles.buttonWrap}>
        <Text style={{color: 'white'}}>Quick test buttons</Text>
          {buttons.map((button) => (
            <Button
              key={button.title}
              title={button.title}
              regex={button.regex}
              sendRegexToInput={sendRegexToInput}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const Button = ({sendRegexToInput, title, regex}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => sendRegexToInput(regex)}>
      <Text style={{color: '#333'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  safetySwitchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
    color: '#333',
    padding: 10,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  text: {
    color: 'white',
    fontSize: 30,
    paddingVertical: 10,
    textAlign: 'center',
  },
  value: {
    color: 'white',
    paddingTop: 25,
    textAlign: 'center'
  },
  buttonWrap: {
    flex: 1,
    paddingVertical: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff90',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    textTransform: 'capitalize',
  },
});

export default App;
