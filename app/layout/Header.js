import React from 'react'
import {View,Image,StyleSheet,Text} from 'react-native';
// import {Icon} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
function Header() {
  const myIcon = <Icon name="bars" size={30} color="#fff" />;

    return (
        <View>
        <View style={styles.headerContainer}>
          {/* <Image style={styles.logo} source={require('../src/image/A6.png')}  /> */}
          <Text style={styles.ScreenTitle}>N O W  P L A Y I N G</Text>
          {/* <Text style={styles.textLabels}>R E C O R D  L A B E L S</Text> */}
          {/* <View style={styles.menuIcon}>
            {myIcon}
          </View> */}
        </View>
      </View>
    )
}

export default Header


const styles = StyleSheet.create({
    headerContainer: {
        // flexDirection:'row',
        // justifyContent:'space-between', 
        alignItems: 'center',
        alignContent:'center',
        // backgroundColor:'red',
        marginTop:16,
        marginRight:16,
        marginLeft:16
    },
    logo: {
      width:60,
      height:60,
        // top: 30,
        // left:20,
        // width: 60,
        // height: 60,
      },
    textLabels: {
        width:180,
        top:30,
        color:'#9e9b9b'
    },

    menuIcon: {
        top:30,
    },

    ScreenTitle: {
      color: '#fff',
      textAlign: 'center',
      // alignContent:'center',
      paddingTop: 8,
      fontSize: 12,
      borderRadius: 50,
      // borderWidth: 2,
      borderColor: '#fff',
      backgroundColor: 'rgb(248, 74, 107)',
      // bottom: 300,
      width: 150,
      height: 30,
      shadowColor: "#fff",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.22,
  
      elevation: 6,
    },
})