
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import firebase from '../../utils/firebase'
import * as accountActions from '../../components/Account/actions'

import { StyleSheet, Image, Modal, TouchableOpacity } from 'react-native'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Text,
  View,
  Footer,
  FooterTab,
  Icon,
  DeckSwiper,
  Card,
  CardItem,
} from 'native-base'

import {
  PINK,
  PURPLE,
  GREY,
  DARK_PINK,
  ORANGE,
  WHITE
} from '../../constants/colors'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { firebaseHelper } from './firebaseHelper'

class DiscoverPage extends Component {
  constructor(props) {
    super(props)
    this.state = { users: [], matchVisible: false }
    this.swipeRight = this.swipeRight.bind(this)
    this.swipeLeft = this.swipeLeft.bind(this)
    this.renderCard = this.renderCard.bind(this)
    this.renderMatchModal = this.renderMatchModal.bind(this)
    this.renderActions = this.renderActions.bind(this)
    this.addUserToList = this.addUserToList.bind(this)
  }

  componentWillMount() {
    this.props.accountActions.fetchAccount(this.props.account.id)
  }

  addUserToList(data) {
    const users = this.state.users
    users.push({ ...data.val(), id: data.key })
    this.setState({ users })
  }

  componentDidMount() {
    const account = this.props.account
    firebaseHelper.onNewUser(firebase, account, this.addUserToList);
  }

  swipeRight(user) {
    const account = this.props.account;
    firebaseHelper.acceptMatch(firebase, account, user);

    const userMatcheRef = firebase.database().ref(`matches/${user.id}/${account.id}`);
    userMatcheRef.once('value').then((data) => {
      if(data.val() && data.val().isMatched) {
        firebaseHelper.createCouple(firebase, account, user);
        this.setMatchVisible(true);        
      }
    });
  }

  swipeLeft(user) {
    const account = this.props.account
    firebaseHelper.rejectMatch(firebase, account, user);
  }

  renderCard(item) {
    return (
      <View>
        <CardItem style={styles.cardImageItem} cardBody>
          <Image style={styles.cardImage} source={{ uri: item.photoUrl }} />
        </CardItem>
        <CardItem style={styles.cardTextItem}>
          <Text style={styles.cardText}>{`${item.displayName}, ${item.age}`}</Text>
        </CardItem>
      </View>
    )
  }

  setMatchVisible(matchVisible) {
    this.setState({ matchVisible })
  }

  renderDeskSwiper() {
    if (this.state.users.length > 0) {
      return (
        <View>
          <DeckSwiper
            ref={ (c) => this._deckSwiper = c }
            dataSource={this.state.users}
            looping = {false}
            renderItem={this.renderCard}
            onSwipeRight={this.swipeRight}
            onSwipeLeft={this.swipeLeft}
          />
        </View>
      )
    }
    return (
      <View style={styles.noUsersContainer}>
        <Text style={styles.noUserText}>There are no users</Text>
      </View>
    )
  }
  
  renderActions() {
    if (this.state.users.length > 0) {
      return (
        <View style={styles.actionsWrapper}>
          <TouchableOpacity onPress={() => this._deckSwiper._root.swipeLeft()}>
            <LinearGradient colors={[DARK_PINK, ORANGE]} style={styles.action}>
              <Icon name="md-close" style={styles.actionIcon} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._deckSwiper._root.swipeRight()}>
            <LinearGradient colors={[PINK, PURPLE]} style={styles.action}>
              <Icon name="md-heart" style={styles.actionIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )
    }
    return false
  }

  renderMatchModal() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.matchVisible}
        onRequestClose={ () => false }>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>It's a Match!</Text>
          <View style={styles.modalButtonWrapper}>
            <Button bordered light rounded large onPress={() => {
              this.setMatchVisible(false)
            }}>
              <Text>Cool</Text>
            </Button>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={GREY}>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>Discover</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.contentContainer}>
          {this.renderMatchModal()}
          {this.renderDeskSwiper()}
        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <Button onPress={() => this.props.history.push('/account')}>
              <Icon name="ios-happy-outline" style={styles.footerIcon}/>
            </Button>
            <Button onPress={() => this.props.history.push('/discover')}>
              <Icon name="ios-swap" style={styles.footerIconActive}/>
            </Button>
            <Button onPress={() => this.props.history.push('/couples')}>
              <Icon name="ios-chatbubbles-outline" style={styles.footerIcon}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({ account: state.account })
const mapDispatchToProps = (dispatch) => ({ accountActions: bindActionCreators(accountActions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage)
