import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = (props:any) => {
  return (
    <View style={styles.containerLoader}>
      <ActivityIndicator size="large" color={props.cor} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default Loader;