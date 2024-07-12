import * as React from 'react';

import {
  StyleSheet,
  Button,
  SafeAreaView,
  StatusBar,
  TextInput,
  useColorScheme,
  Text,
  DeviceEventEmitter,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useEffect, useState } from 'react';
import HealthCareManager from '@jiomeet/healthcare-template-react-native';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [meetingId, setMeetingId] = useState('7913549377');
  const [password, setPassword] = useState('21wMx');
  const [name, setName] = useState('yash');
  const [callStatus, setCallStatus] = useState('Not Started');

  const backgroundStyle = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });

  useEffect(() => {
    DeviceEventEmitter.addListener('call_ended', (message) => {
      console.log('Received message from Kotlin:', message);
      setCallStatus(message);
      // Handle the message as needed
    });
    DeviceEventEmitter.addListener('participant_icon_clicked', (message) => {
      console.log('Received message from Kotlin:', message);
      //Handle participant icon clicked
    });
    return () => {
      DeviceEventEmitter.removeAllListeners('call_ended');
    };
  }, []);
  return (
      <SafeAreaView style={backgroundStyle.container}>
        <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.container.backgroundColor}
        />
        <TextInput
            value={meetingId}
            onChange={() => setCallStatus('Not Started')}
            style={styles.textInput}
            placeholder={'Meeting ID'}
            placeholderTextColor={'black'}
            onChangeText={setMeetingId}
            inputMode={'numeric'}
        />
        <TextInput
            value={password}
            onChange={() => setCallStatus('Not Started')}
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={'black'}
            onChangeText={setPassword}
        />
        <TextInput
            value={name}
            onChange={() => setCallStatus('Not Started')}
            style={styles.textInput}
            placeholder={'Name Visible'}
            placeholderTextColor={'black'}
            onChangeText={setName}
        />
        <Button
            disabled={
                name.length < 3 || meetingId.length < 9 || password.length < 5
            }
            title={'Join Call'}
            onPress={() => {
              console.log(`${meetingId}`)
              HealthCareManager.launchMeetingHealthCareTemplateUI(meetingId, password, name)
            }}
        />
        <Text style={{ margin: 16 }}>Call status: {callStatus}</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  textInput: {
    padding: 16,
    margin: 16,
    backgroundColor: '#FCE6E7',
    borderRadius: 8,
    alignSelf: 'stretch',
    color: 'black',
  },
});
