import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { globalStyle } from '../../globalStyle'
import { Image } from 'react-native'

export default HeadBar = (props) => {
  return (
    <View style={[globalStyle.flexJstCenter,globalStyle.flexAliCenter, globalStyle.paLg, style.headMa]}>
      <Image source={require('../../assets/images/logo.png')} style={{width: 100, height: 80}}></Image>
    </View>
  )
}

const style = StyleSheet.create({
  headMa: {
    marginTop: 20,
    marginBottom: 30
  }
})