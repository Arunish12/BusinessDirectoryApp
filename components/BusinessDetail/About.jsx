import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>About</Text>
      <Text style={styles.LabelText}>{business.about}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:'#fff',
        
    },
    HeaderText:{
        fontFamily:'outfit-bold',
        fontSize:20,
    },
    LabelText:{
        fontFamily:'outfit',
        lineHeight:25,

    }

})  