
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import firebase from '../../utils/firebase'
import * as couplesActions from '../../components/Couples/actions'

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

class CouplesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ref: null
    }
  }

  componentWillMount() {
    this.props.couplesActions.deleteAllCouples()
    const ref = this.props.couplesActions.fetchCouples(this.props.account.id)
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
            <Title style={styles.headerTitle}>Couples</Title>
          </Body>
        </Header>
        <Content>
          <List dataArray={this.props.couples} renderRow={(item) =>
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
            <Button onPress={() => this.props.history.push('/couples')}>
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
  couples: state.couples
})
const mapDispatchToProps = (dispatch) => ({ couplesActions: bindActionCreators(couplesActions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(CouplesPage)
