import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
// import { Image } from 'react-native-elements';
import { globalStyle } from '../../globalStyle'

export default MenuItem = ({navigation, title, imgSrc, target}) => {
  const toPage = () => {
    if (target) {
      navigation.navigate(target)
    }
  }
  return (
    <TouchableHighlight onPress={() => toPage()} style={{width: '31%', marginLeft: '1%', marginRight: '1%', backgroundColor: 'transparent'}} underlayColor={'transparent'}>
      <View style={[globalStyle.paSm, globalStyle.flexJstBtw, globalStyle.flexAliCenter]}>
        <Image source={imgSrc} style={{width: 20, height: 20}} resizeMethod={'resize'}></Image>
        <Text style={{fontSize: 14, marginTop: 5, color: '#333333'}}>{title}</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({})