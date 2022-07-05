import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export function SplashScreen({navigation}) {

  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar 
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
        />
        <LottieView source={require('../../assets/passos.json')} 
        autoPlay 
        loop={false} 
        autoSize
        onAnimationFinish={() => navigation.navigate('LoginScreen')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'blue'
    }
})