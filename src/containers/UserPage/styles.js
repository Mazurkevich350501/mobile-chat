import { StyleSheet } from 'react-native'
import { WHITE, GREY, LIGHT_GREY, DARK_GREY, PURPLE } from '../../constants/colors'

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: WHITE
  },
  accountName: {
    margin: 10,
    fontSize: 20,
    fontFamily: 'Quicksand-Bold'
  },
  gradientButton: {
    position: 'absolute',
    top: -50,
    right: 0,
    padding: 20,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 50,
    margin: 10
  },
  buttonIcon: {
    color: WHITE,
    fontSize: 35,
    width: 35,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})