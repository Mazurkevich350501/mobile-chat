
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from '../../utils/firebase'
import * as messagesActions from '../../components/Messages/actions'

import { StyleSheet, Image } from 'react-native'
import {
  Container,
  Header,
  Content,
  Text,
  Left,
  Button,
  View,
  Body,
  Title,
  Icon,
  Spinner
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { GiftedChat, Send, Bubble, InputToolbar } from 'react-native-gifted-chat'

import {
  PINK,
  PURPLE,
  GREY,
  DARK_PINK,
  DARK_GREY,
  ORANGE,
  WHITE
} from '../../constants/colors'
import styles from './styles'

class ChatPage extends Component {
  constructor(props) {
    super(props)
    this.state = { ref: null }
    this.onSend = this.onSend.bind(this)
  }

  componentWillMount() {
    const ref = this.props.messagesActions.fetchMessages(this.props.chat.id)
    this.setState({ ref })
  }

  componentWillUnmount() {
    this.state.ref.off()
    this.props.messagesActions.deleteAllMessages()
  }

  onSend(messages = []) {
    this.props.messagesActions.sendMessage(this.props.chat.id, messages[0])
  }

  renderSend(props) {
    return (
      <Send {...props}>
          <View style={styles.sendContainer}>
            <Icon name='md-send' style={styles.sendIcon} />
          </View>
      </Send>
    )
  }

  renderBubble(props) {
    return (
      <Bubble {...props}
        textStyle={{ left: styles.bubbleText }}
        wrapperStyle={{
          left: styles.bubbleWrapperLeft,
          right: styles.bubbleWrapperRight
        }}
      />
    )
  }

  renderInputToolbar(props) {
    return <InputToolbar {...props} containerStyle={styles.input} />
  }

  render() {
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={GREY}>
          <Left>
            <Button transparent onPress={this.props.history.goBack}>
              <Icon name='arrow-back' style={styles.sendIcon}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTitle}>{this.props.chat[`title_${this.props.account.id}`]}</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.contentContainer}>
          <GiftedChat
            messages={this.props.messages}
            onSend={this.onSend}
            renderAvatar={null}
            renderSend={this.renderSend}
            renderBubble={this.renderBubble}
            renderInputToolbar={this.renderInputToolbar}
            renderLoading={() => <Spinner color={PURPLE} size='large' />}
            user={{ _id: this.props.account.id }}
          />
        </Content>
      </Container>
    )
  }
}


const mapStateToProps = (state, props) => ({
  account: state.account,
  chat: state.matches.find(el => el.id == props.match.params.id),
  messages: state.messages
})
const mapDispatchToProps = (dispatch) => ({ messagesActions: bindActionCreators(messagesActions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
