import { View, Text ,Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {
 
  const router = useRouter();
   
  return (
    <TouchableOpacity style={styles.container}
    onPress={()=>router.push('/businessdetail/'+business?.id)}
    >
       <Image source={{uri:business?.imageUrl}} 
        style={styles.ImageDetail}
        />
        <View style={styles.subcontainer}>
            <Text style={styles.BusinessName}>{business?.name}</Text>
            <Text style={styles.BusinessAddress}>{business?.address}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginTop:15,

    },
    ImageDetail:{
       width:'100%',
       height:150,
       borderTopLeftRadius:15,
       borderTopRightRadius:15,
    },
    subcontainer:{
        padding:10,
    },
    BusinessName:{
        fontFamily:'outfit-bold',
        fontSize:20,
    },
    BusinessAddress:{
       color:Colors.GRAY 
    },
})