import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator  } from 'react-native';
import { Header, Icon, Left, Card, CardItem, Thumbnail, Body, Button, Right, Footer, FooterTab, Badge } from 'native-base'
import ImageF from '../Images/fondoHeader.jpg'
import HeaderEntry from '../Components/Header'
import FooterVertical from '../Components/Footer'
import moment from 'moment'

class News extends Component {
    constructor(props){
      super(props);
      this.state ={ 
        data: '',
        isLoading: true
      }
    }
    static navigationOptions = {
        drawerIcon : ({tintColor}) =>(
            <Icon name='paper'  style={{
                fontSize:24, color: tintColor
            }}/>
        )
    }
    componentDidMount = async () => {
      return fetch('http://192.168.88.8:8003/api/news/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson.reverse()
        })
      }).catch((error) =>{
        console.error(error);
      });
    }
  render() {
    const { data, isLoading } = this.state
    if(isLoading){
      return(
        <View style={{flex: 1, padding: 50}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <HeaderEntry />
        <Header style={{display: 'flex', alignItems:'center', backgroundColor: '#0F385A'}}>
          <View style={{flex: 1}}>
          <Icon name='menu' style={{color:'white'}} onPress={()=>this.props.navigation.openDrawer()} />
          </View>
          <View style={{flex: 2}}>
            <Text style={{color: 'white'}}> Noticias </Text>
          </View>
        </Header>
        <ScrollView>
        {data.map((item, i) => (
            <View key={i}>
                <Card style={{flex: 0}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={require('../../assets/logoPoli.png')} style={{resizeMode: 'contain'}} />
                    <Body>
                      <Text>{item.name}</Text>
                      <Text note>{moment(item.created_at).format("YYYY-MM-DD")}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body style={{display: 'flex', alignItems:'center' }}>
                    <Image source={{uri: item.imagenUrl !== "" ? item.imagenUrl : 'https://www.poli.edu.co/sites/default/files/logos/logo-poli-politecnico-grancolombiano2018.png' }} style={{ justifyContent: 'center',
                      alignItems: 'center', height: 240, width: 320, flex: 1, resizeMode: 'contain'}}
                    />
                    <Text>
                      {item.short_description}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Right style={{flex: 1}}>
                    <Button style={{backgroundColor: '#0F385A', width: 100, justifyContent: 'center'}} onPress = {() => this.props.navigation.navigate('Perfil',{ info: item })}>
                      <Text style={{color: 'white'}}>Ver más</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            </View>
          ))}
        </ScrollView> 
        <Footer style={{display: 'flex', alignItems:'center', backgroundColor: '#0F385A'}}>
        <FooterTab>
            <Button vertical active
              onPress = {() => this.props.navigation.navigate('Noticias')}
              style={{backgroundColor: '#0F385A'}}
            >
               <Badge ><Text>{data.length >= 0 ? data.length : ''}</Text></Badge>
              <Icon active name="paper" />
              <Text style={{color: 'white'}}>Noticias</Text>
            </Button>
            <Button vertical
              onPress = {() => this.props.navigation.navigate('Eventos')}
              style={{backgroundColor: '#0F385A'}}
            >
              <Icon name="calendar" />
              <Text style={{color: 'white'}}>Eventos</Text>
            </Button>
          </FooterTab>
        </Footer> 
      </View>
    );
  }
}
export default News

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
