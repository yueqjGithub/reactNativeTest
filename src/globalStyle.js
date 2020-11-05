import { StyleSheet } from 'react-native'

const globalStyle = StyleSheet.create({
  bgDebug: {
    backgroundColor: 'red'
  },
  bgDebug1: {
    backgroundColor: 'yellow'
  },
  bgWhite: {
    backgroundColor: '#ffffff'
  },
  bgLightGrey: {
    backgroundColor: '#f8f8f8'
  },
  // *
  fillScreen: {
    width: '100%',
    height: '100%'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  // pa-ma
  maSM: {
    margin: 10,
  },
  maColSm: {
    marginTop: 10,
    marginBottom: 10
  },
  maColMd: {
    marginTop: 20,
    marginBottom: 20
  },
  paMd: {
    padding: 20
  },
  paSm: {
    padding: 10
  },
  paLg: {
    padding: 30
  },
  paRowSm: {
    paddingLeft: 10,
    paddingRight: 10
  },
  paRowLg: {
    paddingLeft: 30,
    paddingRight: 30
  },
  paRowMd: {
    paddingLeft: 20,
    paddingRight: 20
  },
  paColSm: {
    paddingTop: 10,
    paddingBottom: 10
  },
  paColLg: {
    paddingTop: 30,
    paddingBottom: 30
  },
  paColMd: {
    paddingTop: 20,
    paddingBottom: 20
  },
  // flex
  flexWrap: {
    flexWrap: 'wrap'
  },
  flexNoWrap: {
    flexWrap: 'nowrap'
  },
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  flex3: {
    flex: 3
  },
  flex4: {
    flex: 4
  },
  flex5: {
    flex: 5
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexJstBtw: {
    justifyContent: 'space-between'
  },
  flexJstStart: {
    justifyContent: 'flex-start'
  },
  flexJstCenter: {
    justifyContent: 'center'
  },
  flexJstEnd: {
    justifyContent: 'flex-end'
  },
  flexJstArd: {
    justifyContent: 'space-around'
  },
  flexAliStart: {
    alignItems: 'flex-start'
  },
  flexAliEnd: {
    alignItems: 'flex-end'
  },
  flexAliCenter: {
    alignItems: 'center'
  },
  flexAliBase: {
    alignItems: 'baseline'
  },
  selfStretch: {
    alignSelf: 'stretch'
  },
  // font
  titFont: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold'
  }
})

export { globalStyle }