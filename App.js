import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, Text, View, KeyboardAvoidingView, Image,
  TextInput, TouchableOpacity, Animated, Keyboard 
} from 'react-native';

export default function App() {

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 300, y: 300}));

  useEffect(() => {
    Animated.parallel([

      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true
      }),

      Animated.timing(opacity,{
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  });


  function keyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 150,
        duration:100,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 150,
        duration:100,
        useNativeDriver: false
      })
    ]).start();
  };

  function keyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 300,
        duration:100,
        useNativeDriver: false
      }),
      Animated.timing(logo.y, {
        toValue: 300,
        duration:100,
        useNativeDriver: false
      })
    ]).start();
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      
      <View style={styles.containerLogo}>
        <Animated.Image
          source={require('./src/assets/Logo.jpeg')}
          borderRadius={300}
          style={{
            height: logo.x, 
            width: logo.y, 
            marginTop: 50
          }}
        />
      </View>

      <Animated.View 
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [
              {translateY: offset.y }
            ]
          },
          ]
        }
      >
        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder= 'Email'
          onChangeText={() => {}}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder= 'Senha'
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar Conta</Text>
        </TouchableOpacity>
      </Animated.View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020'    
  },
  constainerLogo: {
    flex:1,
    justifyContent: 'center',
  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 20,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit: {
    backgroundColor: '#35AAff',
    width: '90%',
    height: 45,
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText: {
    fontSize: 20,
    color: '#fff'
  },
  btnRegister: {
    backgroundColor: '#1B4',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  registerText: {
    fontSize: 20,
    color: '#fff'
  }
});
