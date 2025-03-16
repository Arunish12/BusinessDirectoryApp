import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {
  
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.container}
       onPress={()=>router.push('/businessdetail/'+business.id)}
        >
      <Image source={{uri:business?.imageUrl}}
        style={styles.imagestyle}  
       />
       <View style={styles.subcontainer}>
          <Text style={styles.BusinessName}>{business.name}</Text>
          <Text style={styles.address}>{business.address}</Text>
          <View style={styles.Star}>
                <Image source={require('./../../assets/images/star.png')}
                    style={{
                        width:15,
                        height:15,
                    }}
                />
                <Text style={{fontFamily:'outfit'}}>4.5</Text>
            </View>
       </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    imagestyle:{
        width: 120,
        height: 120,
        borderRadius: 15,
    },
    container:{
        padding:10,
        margin:10,
        borderRadius:15,
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        gap:10,
    },
    Star:{
      display:'flex',
      flexDirection:'row',
      gap:5,
   },
   BusinessName:{
      fontFamily:'outfit-bold',
      fontSize:18
  },
  subcontainer:{
    flex:1,
    gap:7,
  },
  address:{
    fontFamily:'outfit',
    color:Colors.GRAY,
    fontSize:15
  }
})