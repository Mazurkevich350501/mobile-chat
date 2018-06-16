
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

const gendersMap = {
  male: 'female',
  female: 'male'
}

class DiscoverPage extends Component {
  constructor(props) {
    super(props)
    this.state = { users: [], matchVisible: false }
    this.swipeRight = this.swipeRight.bind(this)
    this.swipeLeft = this.swipeLeft.bind(this)
    this.renderCard = this.renderCard.bind(this)
    this.renderMatchModal = this.renderMatchModal.bind(this)
    this.renderActions = this.renderActions.bind(this)
  }

  componentWillMount() {
    this.props.accountActions.fetchAccount(this.props.account.id)
  }

  componentDidMount() {
    const account = this.props.account
    const usersRef = firebase.database().ref(gendersMap[account.gender])
                              .orderByChild(`show_${account.id}`)
                              .equalTo(true)
    usersRef.on('child_added', (data) => {
      const users = this.state.users
      users.push({ ...data.val(), id: data.key })
      this.setState({ users })
    })
  }

  swipeRight(user) {
    const account = this.props.account
    const updates = {}
    updates[`users/${user.id}/show_${account.id}`] = false
    updates[`users/${user.id}/liked_${account.id}`] = true
    if (account[`liked_${user.id}`]) {
      const key = firebase.database().ref().child('matches').push().key
      updates[`matches/${key}/member_${account.id}`] = true
      updates[`matches/${key}/member_${user.id}`] = true
      updates[`matches/${key}/title_${account.id}`] = user.displayName
      updates[`matches/${key}/title_${user.id}`] = account.displayName
      updates[`matches/${key}/photo_${account.id}`] = user.photoUrl
      updates[`matches/${key}/photo_${user.id}`] = account.photoUrl 
      this.setMatchVisible(true)
    }
    firebase.database().ref().update(updates)
  }

  swipeLeft(user) {
    const account = this.props.account
    const updates = {}
    updates[`users/${user.id}/show_${account.id}`] = false
    updates[`users/${account.id}/show_${user.id}`] = false
    firebase.database().ref().update(updates)
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
            <Button onPress={() => this.props.history.push('/matches')}>
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
