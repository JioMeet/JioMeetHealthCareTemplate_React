# React Native JioMeetHealthCare Template Plugin

## Table of Contents -

1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
- [Install package](#install-the-package)
- [Android](#for-android)
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

## Setup

##### Register on JioMeet Platform:

You need to first register on Jiomeet platform.[Click here to sign up](https://platform.jiomeet.com/login/signUp)

##### Get your application keys:

Create a new app. Please follow the steps provided in the [Documentation guide](https://dev.jiomeet.com/docs/quick-start/introduction) to create apps before you proceed.

###### Get your JioMeet meeting id and pin

Use the [create meeting api](https://dev.jiomeet.com/docs/JioMeet%20Platform%20Server%20APIs/create-a-dynamic-meeting) to get your room id and password

### Usage: Launch Core Template Screen

```tsx
import { launchMeetingHealthCareTemplateUI } from '@jiomeet/healthcare-template-react-native';

// ...

launchMeetingHealthCareTemplateUI(meetingId, meetingPin, displayName);
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
  DeviceEventEmitter.addListener('call_ended', (message) => {
    // Handle the message as needed
  });
  return ()=>{
    DeviceEventEmitter.removeAllListeners('call_ended')
  }
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
import {launchMeetingHealthCareTemplateUI} from '@jiomeet/healthcare-template-react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useEffect, useState } from 'react';

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
    DeviceEventEmitter.addListener('call_ended', (message) => {
      console.log('Received message from Kotlin:', message);
      setCallStatus(message);
      // Handle the message as needed
    });
    return ()=>{
      DeviceEventEmitter.removeAllListeners('call_ended')
    }
  }, []);
  return (
    <SafeAreaView style={backgroundStyle.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.container.backgroundColor}
      />
      <TextInput
        value={meetingId}
        onChange={()=>setCallStatus('Not Started')}
        style={styles.textInput}
        placeholder={'Meeting ID'}
        onChangeText={setMeetingId}
        inputMode={'numeric'}
      />
      <TextInput
        value={password}
        onChange={()=>setCallStatus('Not Started')}
        style={styles.textInput}
        placeholder={'Password'}
        onChangeText={setPassword}
      />
      <TextInput
        value={name}
        onChange={()=>setCallStatus('Not Started')}
        style={styles.textInput}
        placeholder={'Name Visible'}
        onChangeText={setName}
      />
      <Button
        disabled={
          name.length < 3 || meetingId.length < 9 || password.length < 5
        }
        title={'Join Call'}
        onPress={() => {
          launchMeetingHealthCareTemplateUI(meetingId, password, name);
        }}
      />
      <Text style={{margin: 16}}>Call status: {callStatus}</Text>
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
  },
});

```

---

## Troubleshooting

- Facing any issues while integrating or installing the JioMeet Template UI Kit please connect with us via real time support present in jiomeet.support@jio.com or https://jiomeetpro.jio.com/contact-us

---
