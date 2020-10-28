import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const IndexPage =  ({ navigation }) => {
  const toIndex = () => {
    navigation.navigate('Login')
  }
  return (
    <View>
      <Text>首页</Text>
      <Button title="返回" color="#393939" style={style.buttonNoram} onPress={toIndex}></Button>
    </View>
  )
}

const style = StyleSheet.create({
  buttonNoram: {
    color: '#393939'
  }
})
export default IndexPage