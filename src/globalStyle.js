import { StyleSheet } from 'react-native'

const globalStyle = StyleSheet.create({
  // *
  fillScreen: {
    width: '100%',
    height: '100%'
  },
  bgWhite: {
    backgroundColor: '#ffffff'
  },
  // pa-ma
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
  // font
  titFont: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold'
  }
})

export { globalStyle }