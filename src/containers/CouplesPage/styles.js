import { StyleSheet } from 'react-native'
import { WHITE, GREY, LIGHT_GREY, DARK_GREY, PURPLE } from '../../constants/colors'

export default StyleSheet.create({
  header: {
    backgroundColor: WHITE
  },
  headerBody: {
    paddingHorizontal: 20
  },
  headerTitle: {
    color: DARK_GREY,
    fontSize: 30,
    fontFamily: 'Quicksand-Bold'
  },
  contentContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: LIGHT_GREY
  },
  viewButtonContainer: {
    justifyContent: 'center'
  },
  matchName: {
    fontFamily: 'Quicksand-Bold'
  },
  matchText: {
    fontFamily: 'Quicksand-Regular'
  },
  footerTab: {
    backgroundColor: WHITE
  },
  footerIcon: {
    color: GREY,
    fontSize: 30
  },
  footerIconActive: {
    color: PURPLE,
    fontSize: 30
  }
})