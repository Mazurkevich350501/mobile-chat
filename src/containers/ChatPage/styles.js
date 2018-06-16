import { StyleSheet } from 'react-native'
import { WHITE, GREY, LIGHT_GREY, DARK_GREY, PURPLE } from '../../constants/colors'

export default StyleSheet.create({
  header: {
    backgroundColor: WHITE
  },
  headerTitle: {
    color: DARK_GREY,
    fontSize: 30,
    fontFamily: 'Quicksand-Bold'
  },
  contentContainer: {
    flex: 1,
    backgroundColor: LIGHT_GREY
  },
  sendContainer: {
    marginRight: 10,
    marginBottom: 8
  },
  sendIcon: {
    color: DARK_GREY
  },
  bubbleTextLeft: {
    color: DARK_GREY
  },
  bubbleWrapperLeft: {
    backgroundColor: WHITE
  },
  bubbleWrapperRight: {
    backgroundColor: PURPLE
  },
  input: {
    borderTopWidth: 0
  }
})