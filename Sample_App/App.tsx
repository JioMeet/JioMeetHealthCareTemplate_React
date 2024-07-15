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
  const [meetingId, setMeetingId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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

    HealthCareManager.addListener('participant_icon_clicked', (data) => {
      console.log('Received event participant_icon_clicked');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('call_ended', (data) => {
      console.log('Received event call_ended');
      console.log('Received message from Kotlin:', data)
      setCallStatus('Call Ended')
    });

    HealthCareManager.addListener('call_joined', (data) => {
      console.log('Received event call_joined');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('local_mic_updated', (data) => {
      console.log('Received event local_mic_updated');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('local_video_updated', (data) => {
      console.log('Received event local_video_updated');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('remote_user_joined', (data) => {
      console.log('Received event remote_user_joined');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('remote_user_left', (data) => {
      console.log('Received event remote_user_left');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('remote_user_mic_updated', (data) => {
      console.log('Received event remote_user_mic_updated');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('remote_user_video_updated', (data) => {
      console.log('Received event remote_user_video_updated');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('failed_to_join_call', (data) => {
      console.log('Received event failed_to_join_call');
      console.log('Received message from Kotlin:', data)
    });

    HealthCareManager.addListener('error_occurred', (data) => {
      console.log('Received event error_occurred');
      console.log('Received message from Kotlin:', data)
    });

    return () => {
      HealthCareManager.removeAllListeners('participant_icon_clicked')
      HealthCareManager.removeAllListeners('call_ended')
      HealthCareManager.removeAllListeners('call_joined')
      HealthCareManager.removeAllListeners('local_mic_updated')
      HealthCareManager.removeAllListeners('local_video_updated')
      HealthCareManager.removeAllListeners('remote_user_joined')
      HealthCareManager.removeAllListeners('remote_user_left')
      HealthCareManager.removeAllListeners('remote_user_mic_updated')
      HealthCareManager.removeAllListeners('remote_user_video_updated')
      HealthCareManager.removeAllListeners('failed_to_join_call')
      HealthCareManager.removeAllListeners('error_occurred')
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
          HealthCareManager.launchMeetingHealthCareTemplateUI(meetingId, password, name);
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
