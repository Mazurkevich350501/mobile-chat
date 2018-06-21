
import React, { Component } from 'react'
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

const account = {
    name: 'Emilia Clarke',
    age: 21,
    image: { uri: 'https://vignette.wikia.nocookie.net/starwars/images/5/52/Emilia_Clarke.png/revision/latest?cb=20161119014350' },
    profession: 'Queen',
    jobPlace: 'Seven Kingdoms'
}

class UserPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Content style={styles.contentContainer}>
          <Image style={{
            height: 300,
            flex: 1
          }} source={account.image} />
          <View style={{
            padding: 10
          }}>
            <Text style={styles.accountName}>{`${account.name}, ${account.age}`}</Text>
            <Text note>{account.profession}</Text>
            <Text note>{account.jobPlace}</Text>
            <LinearGradient colors={ [PINK, PURPLE] } style={styles.gradientButton}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} >
              <Icon name='ios-settings' style={styles.buttonIcon} />
            </LinearGradient>
            <LinearGradient colors={ [PINK, PURPLE] } style={styles.gradientButton}
              start={{x: 0, y: 0}} end={{x: 1, y: 1}} >
              <Icon name='ios-chatbubbles' style={styles.buttonIcon} />
            </LinearGradient>
          </View>
        </Content>
      </Container>
    )
  }
}

export default UserPage
