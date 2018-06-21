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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE
  },
  accountName: {
    margin: 10
  },
  gradientButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 180,
    margin: 10
  },
  buttonIcon: {
    color: WHITE,
    margin: 5
  },
  buttonText: {
    color: WHITE,
    margin: 10,
    flex: 1,
    textAlign: 'center'
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