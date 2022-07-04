import React, {useRef, useState} from 'react';
import {Animated, Dimensions, Image, StyleSheet, View} from 'react-native';
import useInterval from '../utils/useInteraval';

const Carrousel: any = ({imagens}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const animation = useRef(new Animated.Value(0));
  useInterval(() => handleAnimation(), 4000);

  const handleAnimation = () => {
    let newCurrentImagem = currentImage + 1;

    if (newCurrentImagem >= imagens.length) {
      newCurrentImagem = 0;
    }

    Animated.spring(animation.current, {
      toValue: -(Dimensions.get('window').width * newCurrentImagem),
      useNativeDriver: true,
    }).start();

    setCurrentImage(newCurrentImagem);
  };

  return (
    <React.Fragment>
      <View>
        <Animated.View
          style={[
            styles.container,
            {transform: [{translateX: animation.current}]},
          ]}>
          {imagens.map(imagem => (
              <View key={imagem}>
                {/* <Text style={{color: 'white'}}>1</Text> */}
                <Image source={{uri: imagem}} style={styles.image} />
              </View>
          ))}
        </Animated.View>
        {/* <View style={styles.indicadorContainer}>
          {imagens.map((item, indice) => (
            <View
              key={`${item}_${indice}`}
              style={[
                styles.indicador,
                indice === currentImage ? styles.activeIndicador : undefined,
              ]}
            />
          ))}
        </View> */}
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    height: 220,
    borderRadius:1,
  },
  // containerImagem:{
  //   borderRadius:
  // },
  // indicadorContainer: {
  //   position: 'absolute',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: Dimensions.get('window').width,
  //   bottom: 10,
  //   zIndex: 2,
  // },
  // indicador: {
  //   width: 15,
  //   height: 15,
  //   borderRadius: 7.5,
  //   borderColor: 'white',
  //   borderWidth: 1,
  //   marginHorizontal: 10,
  //   marginBottom: 10,
  //   borderColor: "#333",
  //   borderWidth: 1,
  // },
  // activeIndicador: {
  //   backgroundColor: '#e5e5e5',
  // },
});

export default Carrousel;
