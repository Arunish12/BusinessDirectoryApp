import { View, Text,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function PopularBusinessCard({business}) {
   const router = useRouter();
  return (
    <TouchableOpacity style={styles.container}
     onPress={()=>router.push("/businessdetail/"+business?.id)}
    >
       <Image source={{uri:business?.imageUrl}} 
        style={styles.imagestyle}
       />
       
       <View style={{marginTop:7, gap:5}}>
          <Text style={styles.labelText}>{business.name}</Text>
          <Text style={styles.adressText}>{business.address}</Text>
          
          <View style={styles.CategoryContainer}>
            <View style={styles.subcontainer}>
                <Image source={require('./../../assets/images/star.png')}
                    style={{
                        width:15,
                        height:15,
                    }}
                />
                <Text style={{fontFamily:'outfit'}}>4.5</Text>
            </View>
               <Text style={styles.categoryText}>{business.category}</Text>
          </View>
       </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        marginLeft:20,
        padding:10,
        backgroundColor:'#fff',
        borderRadius: 15,
     },
    imagestyle:{
        width: 200,
        height: 130,
        borderRadius: 15,
    },
    labelText:{
       fontFamily:'outfit-bold',
       fontSize:17,
    },
    adressText:{
       fontFamily:'outfit',
       fontSize:13,
       color:Colors.GRAY
    },
    subcontainer:{
        display:'flex',
        flexDirection:'row',
        gap:5,
    },
    categoryText:{
       fontFamily:'outfit',
       backgroundColor:Colors.PRIMARY,
       color:'#fff',
       padding:3,
       fontSize:10,
       borderRadius:5,
    },
    CategoryContainer:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',

    },
})