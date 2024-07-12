# React Native JioMeetHealthCare Template Plugin

## Table of Contents -

1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
   - [Install package](#install-the-package)
   - [Android](#for-android)
   - [iOS](#ios-project-settings)

4. [Setup](#setup)
5. [Usage](#usage-launch-core-template-screen)
6. [Example](#example)

## Introduction

In this documentation, we'll guide you through the process of installation, enabling you to enhance your React Native app with JioMeet HealthCare plugin swiftly and efficiently. Let's get started on your journey to creating seamless communication experiences with React Native plugin!

---

## Features

In this Plugin , you'll find a range of powerful features designed to enhance your application's communication and collaboration capabilities. These features include:

**Voice and Video Calling**:Enjoy high-quality, real-time audio and video calls with your contacts.


## Prerequisites

Before you begin, ensure you have met the following requirements:

#### Install the package:

Using `npm`:

```
npm install @jiomeet/healthcare-template-react-native
```

Using `Yarn`:

```
yarn add @jiomeet/healthcare-template-react-native
```

#### Automatic Linking (if necessary)

If you're using a React Native version that doesn't automatically link native modules and assets (React Native 0.59 and later usually do this automatically), you might need to perform these additional steps:

#### For Android

1. Open a terminal and navigate to your project's root directory.

2. Run the following command to link the `@jiomeet/healthcare-template-react-native` library:

```bash
   npx react-native link @jiomeet/healthcare-template-react-native
```

#### Kotlin:

To set up Kotlin in your flutter project, follow these steps:

1. First, add this below line of code to your project’s root build.gradle file (**android/build.gradle**)

```gradle
  dependencies {
    ...
    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.7.20")
  }
```

2. Add the Kotlin dependencies to the app-level build.gradle(**android/app/build.gradle**)

```gradle
  ...
  apply plugin: 'kotlin-kapt'
  apply plugin: 'kotlin-android'

  ...
  // Allow references to generated code
  kapt {
    correctErrorTypes true
  }
```

3. Add the below code for PIP config to your android's manifest file

```xml
  <manifest
    ...other manifest level config
    xmlns:tools="http://schemas.android.com/tools">
    ...
  <application
    ... other application level config
    android:supportsRtl="true"
    android:usesCleartextTraffic="true"
    android:requestLegacyExternalStorage="true"
    tools:replace="android:name">
```

#### Adding `credentials.properties` File in the `android` Folder

To securely add your GitHub credentials, follow these steps to create a `credentials.properties` file in your project's `android` folder and update the build configuration accordingly.

##### Create `credentials.properties` File

1. Navigate to the `android` folder in the root of your React Native project.
2. Create a new file named `credentials.properties`.
3. Open the `credentials.properties` file and add your GitHub credentials:

   ```properties
   github_username=your-github-username
   github_password=your-github-token-or-password

#### iOS Project Settings

You need to make below changes to iOS Project. Go to iOS Folder. Open `YOUR_PROJECT_NAME.xcworkspace` and make below changes.

##### Info.plist Changes

Please add below permissions keys to your `Info.plist` file with proper description.

```swift
<key>NSCameraUsageDescription</key>
<string>Allow access to camera for meetings</string>
<key>NSMicrophoneUsageDescription</key>
<string>Allow access to mic for meetings</string>
```

##### Enable Background Mode

Please enable `Background Modes` in your project `Signing & Capibilities` tab. After enabling please check box with option `Audio, Airplay, and Pictures in Pictures`. If you don't enables this setting, your mic will be muted when your app goes to background.

##### Enable Audio Video Permissons

Before joining the meeting please check audio video permissons are enabled or not. If not please throw an error to enable both audio and video permissons

##### Orientation

Currently SDK support portarait orientation. If your app supports multiple orientation, please lock down orientation when you show the SDK View.


## Setup

##### Register on JioMeet Platform:

You need to first register on Jiomeet platform.[Click here to sign up](https://platform.jiomeet.com/login/signUp)

##### Get your application keys:

Create a new app. Please follow the steps provided in the [Documentation guide](https://dev.jiomeet.com/docs/quick-start/introduction) to create apps before you proceed.

###### Get your JioMeet meeting id and pin

Use the [create meeting api](https://dev.jiomeet.com/docs/JioMeet%20Platform%20Server%20APIs/create-a-dynamic-meeting) to get your room id and password

### Usage: Launch Core Template Screen

```tsx
import HealthCareManager from '@jiomeet/healthcare-template-react-native';

// ...

HealthCareManager.launchMeetingHealthCareTemplateUI(meetingId, password, name);
```

To join a meeting, enter meeting details in the function and directly call the function as mentioned above

//create a table with meetingId, meetingPin, displayName as columns

| Parameter     | Type     | Description                                                     |
|:--------------|:---------|:----------------------------------------------------------------|
| `meetingId`   | `string` | **Required**. The meeting ID of the meeting to be joined.       |
| `meetingPin`  | `string` | **Required**. The meeting PIN of the meeting to be joined.      |
| `displayName` | `string` | **Required**. The display name of the user joining the meeting. |


### Receive a callback from SDK
```tsx
import { DeviceEventEmitter } from 'react-native';

// ...

useEffect(() => {
  
  HealthCareManager.addListener('participant_icon_clicked', (data) => {
      console.log('Received event participant_icon_clicked');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('call_ended', (data) => {
      console.log('Received event call_ended');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('call_joined', (data) => {
      console.log('Received event call_joined');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('local_mic_updated', (data) => {
      console.log('Received event local_mic_updated');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('local_video_updated', (data) => {
      console.log('Received event local_video_updated');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('remote_user_joined', (data) => {
      console.log('Received event remote_user_joined');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('remote_user_left', (data) => {
      console.log('Received event remote_user_left');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('remote_user_mic_updated', (data) => {
      console.log('Received event remote_user_mic_updated');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('remote_user_video_updated', (data) => {
      console.log('Received event remote_user_video_updated');
      console.log('Message Data:', data)
    });

    HealthCareManager.addListener('failed_to_join_call', (data) => {
      console.log('Received event failed_to_join_call');
      console.log('Message Data:', data)
    });
    
    HealthCareManager.addListener('error_occurred', (data) => {
      console.log('Received event error_occurred');
      console.log('Message Data:', data)
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
```
The above callback will be triggered when the Call is ended, you can handle this callback as per your need, the default message that is received is "Call Ended"

### Example
```tsx
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


```

---

## Troubleshooting

- Facing any issues while integrating or installing the JioMeet Template UI Kit please connect with us via real time support present in jiomeet.support@jio.com or https://jiomeetpro.jio.com/contact-us

---
