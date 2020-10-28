import * as React from 'react'
import { View, Text } from 'react-native'
import { globalStyle } from '../../globalStyle'

export default HeadBar = (props) => {
  return (
    <View style={[globalStyle.flexRow, globalStyle.flexJstCenter,globalStyle.flexAliCenter, globalStyle.paLg]}>
      <Text style={globalStyle.titFont}>登录</Text>
    </View>
  )
}