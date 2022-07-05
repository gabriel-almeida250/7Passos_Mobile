import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Image} from 'react-native-elements';

export function SplashScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D6EFD'
      }}>
      <View 
          style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://cdn.discordapp.com/attachments/972547744516415540/992879079575519272/Frame.png',
          }}
        />
      </View>
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <LottieView
        source={require('../../assets/passos.json')}
        autoPlay
        loop={false}
        autoSize
        onAnimationFinish={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer:{
    top: 100,
  },
  logo: {
    height: 65,
    width: 249,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D6EFD',
  },
});
