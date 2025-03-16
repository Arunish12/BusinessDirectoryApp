import { View, Text, Image ,StyleSheet , TextInput} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Header() {
  
  const {user} = useUser();
 
  return (
    <View style={styles.container}>
      <View style={styles.userdetail}>
        <Image source={{uri:user?.imageUrl}}
          style={styles.userImage} 
        />
        <View>
            <Text style={{ color:'#fff'}} >Welcome,</Text>
            <Text style={styles.usertext}>{user?.fullName}</Text>
        </View>
      </View>
          {/* searchBar */}
       <View style={styles.searchbar}>
       <Ionicons name="search" size={24} color={Colors.PRIMARY} />
       <TextInput placeholder='search...' 
               style={{
                fontFamily:'outfit',
                fontSize:16,
               }}
       />
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        paddingTop:40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    userdetail:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap: 10,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99, 
    },
    usertext:{
        fontSize: 19,
        fontFamily: 'outfit-medium',
        color: '#fff',

    },
    searchbar:{
       display:'flex',
       flexDirection:'row',
       gap:10,
       alignItems:'center',
       backgroundColor:'#fff',
       padding:10,
       marginVertical: 10,
       marginTop:15,
       borderRadius: 8,
       
    },

})