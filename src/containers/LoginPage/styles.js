import { StyleSheet } from 'react-native'
import { WHITE, DARK_GREY } from '../../constants/colors'

export default StyleSheet.create({
  header: {
    height: 0
  },
  contentContainer: {
    flex: 1
  },
  gradientView: {
    flex: 1
  },
  swiperWrapper: {
    flex: 0.7
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  slideText: {
    color: WHITE,
    fontSize: 30,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center'
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'center',
    borderRadius: 50,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    elevation:0
  },
  buttonText: {
    fontFamily: 'Quicksand-Regular',
    color: DARK_GREY
  }
})