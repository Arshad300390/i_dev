import socketService from './src/utils/socketService';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    socketService.initializeSocket();
  }, []);

  useEffect(() => {
    const handleMessage = (message) => {
      console.log('Received message:', message);
      setData((prevData) => [...prevData, message]); // ✅ Function-based update
    };

    socketService.on('receive_message', handleMessage);

    return () => {
      socketService.removeListener('rml'); // ✅ Cleanup listener
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socketService.emit('send_message', message);
      setMessage('');
    } else {
      Alert.alert('Please enter a message');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={{ padding: 10 }}>
            <Text style={{ fontSize: 20 }}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.container}>
        <View style={{ flex: 0.85 }}>
          <TextInput
            placeholder="Enter your message"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
        </View>
        <View style={{ flex: 0.15 }}>
          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={{ color: 'white' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4169E1',
    padding: 10.5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default App;
