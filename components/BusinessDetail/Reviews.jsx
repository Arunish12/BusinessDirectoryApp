import { View, Text ,StyleSheet,TextInput, TouchableOpacity, ToastAndroid, Image} from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings';
import { Colors } from '../../constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';


export default function Reviews({business}) {
   
    const [rating,setRating] = useState(4);
    const [userInput,setUserInput] = useState();
    const {user} = useUser();

    const onSubmit=async()=>{
       const docRef =doc(db,'BusinessList',business?.id)
       await updateDoc (docRef,{
         reviews: arrayUnion({
            rating:rating,
            Comment:userInput,
            userName:user?.fullName,
            userImage:user?.imageUrl,
            userEmail:user?.primaryEmailAddress?.emailAddress
         })
       })

       ToastAndroid.show('Comment Added Successfully !', ToastAndroid.BOTTOM)
    }

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Reviews</Text>

      <View>
        <Rating
            showRating={false}
            imageSize={20}
            onFinishRating={(rating)=>setRating(rating)}
            style={{ paddingVertical: 10 }}
        />
        <TextInput style={styles.ReviewText}
            placeholder='Write Your Comment'
            numberOfLines={4}
            onChangeText={(value)=>setUserInput(value)}
        />   
        <TouchableOpacity style={styles.SubmitBtn}
          disabled={!userInput}
          onPress={()=>onSubmit()}
        >
             <Text style={styles.ButtonText}>Submit</Text>
        </TouchableOpacity>

      </View>  
    
      {/* DIsplay Previos Reviews */}
      <View>
        {business?.reviews?.map((item,index)=>(
           
           <View style={styles.UserDetail}>
            <Image source={{uri:item.userImage}}
                 style={styles.userImg}
            />
            <View style={{display:'flex'}}>
               <Text>{item.userName}</Text>
               <Rating 
                 imageSize={20}
                 ratingCount={item.rating}
                 style={{alignItems:'flex-start'}}
               />
               <Text>{item.Comment}</Text>
               </View>
           </View>

        ))}
      </View>
 
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
    ReviewText:{
        borderWidth:1,
        padding:10,
        borderRadius:10,
        borderColor:Colors.GRAY,
        textAlignVertical:'top',
    },
    SubmitBtn:{
        padding:10,
        backgroundColor:Colors.PRIMARY,
        borderRadius:6,
        marginTop:10,
    },
    ButtonText:{
        fontFamily:'outfit',
        color:'#fff',
        textAlign:'center',

    },
    userImg:{
        height:40,
        width:40,
        borderRadius:90,
        marginTop:5,
        padding:20

    },
    UserDetail:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        padding:10,
        borderWidth:1,
        borderColor:Colors.GRAY,
        marginTop:10,
        borderRadius:15,
    }
})