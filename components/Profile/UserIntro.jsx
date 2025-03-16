import { View, Text, Image,StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function UserIntro() {
    const {user} = useUser();
  return (
    <View style={styles.container}>
    <Image source={{uri:user?.imageUrl}} 
    style={styles.Userimage}
    />
    <Text style={styles.UserName}>{user?.fullName}</Text>
    <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
    },
    Userimage:{
       height:100,
       width:100,
       borderRadius:99,
    },
    UserName:{
       fontFamily:'outfit-bold',
       fontSize:20,

    },
    userEmail:{
        fontFamily:'outfit',
        fontSize:16,
    },
})