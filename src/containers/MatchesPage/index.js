
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from '../../utils/firebase'
import * as matchesActions from '../../components/Matches/actions'

import { StyleSheet, Image } from 'react-native'
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
  List,
  ListItem,
  Thumbnail
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

import {
  PINK,
  PURPLE,
  GREY,
  DARK_PINK,
  ORANGE
} from '../../constants/colors'
import styles from './styles'

class MatchesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ref: null
    }
  }

  componentWillMount() {
    this.props.matchesActions.deleteAllMatches()
    const ref = this.props.matchesActions.fetchMatches(this.props.account.id)
    this.setState({ ref })
  }

  componentWillUnmount() {
    this.state.ref.off()
  }

  render() {
    return (
      <Container>
        <Header noShadow={true} style={styles.header} androidStatusBarColor={GREY}>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>Matches</Title>
          </Body>
        </Header>
        <Content>
          <List dataArray={this.props.matches} renderRow={(item) =>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: item[`photo_${this.props.account.id}`] }} />
                </Left>
                <Body>
                  <Text style={styles.matchName}>{item[`title_${this.props.account.id}`]}</Text>
                  <Text note style={styles.matchText}>{item.lastMessage}</Text>
                </Body>
                <Right style={styles.viewButtonContainer}>
                  <Text style={styles.matchText} onPress={() => this.props.history.push(`/chat/${item.id}`) } >View</Text>
                </Right>
              </ListItem>
            }
          />
        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <Button onPress={() => this.props.history.push('/account')}>
              <Icon name="ios-happy-outline" style={styles.footerIcon}/>
            </Button>
            <Button onPress={() => this.props.history.push('/discover')}>
              <Icon name="ios-swap" style={styles.footerIcon}/>
            </Button>
            <Button onPress={() => this.props.history.push('/matches')}>
              <Icon name="ios-chatbubbles-outline" style={styles.footerIconActive}/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  matches: state.matches
})
const mapDispatchToProps = (dispatch) => ({ matchesActions: bindActionCreators(matchesActions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage)
