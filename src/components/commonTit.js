import * as React from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import { globalStyle } from '../globalStyle'

export default CommonTit = ({ navigation, title, showBackBtn }) => {
  return (
    <View style={[globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter, globalStyle.paSm, globalStyle.bgWhite]}>
      <View style={globalStyle.flex1}>
        {showBackBtn ?
          <TouchableHighlight onPress={() => navigation.goBack()} underlayColor={'transparent'}>
            <Image
              source={require('../assets/images/backBtn.png')}
              style={{ width: 12, height: 20 }}
            />
          </TouchableHighlight>
          : null}
      </View>
      <View style={[globalStyle.flex3, globalStyle.flexRow, globalStyle.flexJstCenter]}>
        <Text style={globalStyle.titFont}>{title}</Text>
      </View>
      <View style={[globalStyle.flex1]}></View>
    </View>
  )
}