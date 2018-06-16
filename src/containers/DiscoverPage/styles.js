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
  cardImageItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardImage: {
    height: 300,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardTextItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cardText: {
    fontFamily: 'Quicksand-Bold'
  },
  actionsWrapper: {
    flexDirection: 'row',
    flex: 1, left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  action: {
    borderRadius: 50,
    padding: 20,
    margin: 10
  },
  actionIcon: {
    color: WHITE,
    fontSize: 35,
    width: 35,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center'
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
  },
  noUsersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noUserText: {
    color: PURPLE,
    fontSize: 30,
    fontFamily: 'Quicksand-Bold'
  },
  modalContainer: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    color: WHITE,
    marginBottom: 20,
    fontSize: 40,
    fontFamily: 'Quicksand-Bold'
  },
  modalButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})