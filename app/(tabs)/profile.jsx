import { View, Text ,StyleSheet, } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>profile</Text>
      
      {/* user info */}
      <UserIntro />

      {/* Menu List  */}
      <MenuList />

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      padding:20,
    },
    HeaderText:{
       fontFamily:'outfit-bold',
       fontSize:35,
    },
})