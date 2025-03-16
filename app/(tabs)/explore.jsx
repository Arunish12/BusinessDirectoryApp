import { View, Text ,StyleSheet,TextInput} from 'react-native'
import React, { useState } from 'react'
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function explore() {
 
  const [businessList, setBusnessList] = useState([]);
  const GetBusinessByCategory=async(Category)=>{
    setBusnessList([]); 
    const q = query(collection(db,'BusinessList'),where('category','==',Category));
    const querySnapshot= await getDocs(q);
    
    querySnapshot.forEach((doc)=>{   
      console.log(doc.data());
      setBusnessList(prev=>[...prev,{id:doc.id,...doc.data()}])  

    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.HeaderText}>Explore More</Text>

      {/* search Bar */}
      <View style={styles.searchbar}>
       <Ionicons name="search" size={24} color={Colors.PRIMARY} />
       <TextInput placeholder='search...' 
               style={{
                fontFamily:'outfit',
                fontSize:16,
               }}
       />
       </View>
      {/* Category  */}
        <Category
        explore={true}
        onCategorySelect={(Category)=>GetBusinessByCategory(Category)}
        />
      {/* Business List */}
      <ExploreBusinessList  businessList={businessList}/>

    </View>
     

  )
}
const styles = StyleSheet.create({
   container:{
      padding:20,
   },
   HeaderText:{
       fontFamily:'outfit-bold',
       fontSize:30,
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
    borderWidth:1,
    borderColor:Colors.PRIMARY,
 },

})