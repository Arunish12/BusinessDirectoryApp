import { View, Text, Image,StyleSheet,TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function Intro({business}) {
  
  const router = useRouter();
  const {user}=useUser();

  const onDelete=()=>{
    Alert.alert('Do you to Delete?','Do really want to Delete this businesss',[
      {
      text:'Cancel',
      style:'cancel',
      },
      {
        text:'Delete',
        style:'destructive',
        onPress:()=>deleteBusiness()
      }
    ]);
    
  }

  const deleteBusiness=async()=>{
     console.log("Delete Business");
     await deleteDoc(doc(db,'BusinessList',business?.id));
     router.back();
     ToastAndroid.show('Bisiness Deleted!',ToastAndroid.LONG);
  }

  return (
    <View>
    
      <View style={styles.subcontainer}>
        <TouchableOpacity onPress={()=>router.back()} >
            <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
      
       <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image source={{uri:business?.imageUrl}} 
       style={styles.image}
      />
      <View style = {styles.DeleteIcon}>
      <View style={styles.addressname}>
         <Text style={styles.nameText}>{business.name}</Text>
         <Text style={styles.addressText}>{business.address}</Text>
      </View>
      {user?.primaryEmailAddress?.emailAddress==business?.userEmail&& <TouchableOpacity onPress={()=>onDelete()}>
        <Ionicons name='trash' size={24} color="red" />
      </TouchableOpacity>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
 
  image:{
        width:'100%',
        height:340,
    },
    subcontainer:{
        position:'absolute',
        zIndex:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        padding:20,
    },
    addressname:{
      padding:20,
      marginTop:-20,
      backgroundColor:'#fff',
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
    },
    nameText:{
      fontFamily:'outfit-bold',
      fontSize:25,
    },
    addressText:{
    fontFamily:'outfit',
    fontSize:18,
    },
    DeleteIcon:{
      display:'flex',
      flexDirection:'row',
      justifyContent:"space-between",
      padding:20,
      marginTop:-20,
      backgroundColor:'#fff',
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
    }

})