import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';
import { globalStyle } from '../../globalStyle'

export default CardItem = ({bankName, cardNumber}) => {

  const dealNumber = (val) => { 
    const len = String(val).length
    const endStr = String(val).substr(len-4, 4)
    const others = '**** **** **** ****'
    const result = `${others} ${endStr}`
    return <Text style={styles.cardNum}>{result}</Text>
  }

  return (
    <ImageBackground style={[globalStyle.fullHeight, globalStyle.fullWidth]} source={require('../../assets/images/bankbg.png')} resizeMethod="scale">
      <View style={[globalStyle.fullWidth, globalStyle.fullHeight, globalStyle.flexJstArd, globalStyle.flexAliStart, globalStyle.paMd]}>
        <Text style={styles.bankName}>{bankName}</Text>
        {
          dealNumber(cardNumber)
        }
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bankName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff'
  },
  cardNum: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ffffff'
  }
})