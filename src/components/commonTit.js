import * as React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { globalStyle } from '../globalStyle'

export default CommonTit = ({ navigation, title, showBackBtn }) => {
  return (
    <View style={[globalStyle.flexRow, globalStyle.flexJstBtw, globalStyle.flexAliCenter]}>
      <View style={globalStyle.flex1}>
        <TouchableHighlight onPress={this._onPressButton}>
          <Image
            source={require('../assets/images/backBtn.png')}
            style={{width: 15, height: 25}}
          />
        </TouchableHighlight>
      </View>
    </View>
  )
}