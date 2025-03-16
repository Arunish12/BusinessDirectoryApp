import { View, Text, StyleSheet, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from './../../Config/FirebaseConfig';
import PopularBusinessCard from './PopularBusinessCard';

export default function PopularBusiness() {

  const [businessList,setBusnessList]  = useState([]);
  useEffect(()=>{
    GetBusinessList();  
   },[])
  const GetBusinessList=async()=> {
    setBusnessList([]); 
    const q = query(collection(db,'BusinessList'),limit(10));
    const querySnapshot=await getDocs(q);
    
    querySnapshot.forEach((doc)=>{
        console.log(doc.data());
        setBusnessList(prev=>[...prev,{id:doc.id,...doc.data()}])
    })
  }

  return (
    <View>
         <View style={styles.container}>
            <Text style={styles.CategoryText}>Popular Business</Text>
            <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-medium'}}>View All</Text>
         </View>
        
        <FlatList 
            data={businessList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
               <PopularBusinessCard 
                key={index}
                business={item}    
               />
            )}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
        marginBottom:10,
        

   },
   CategoryText:{
      fontFamily:'outfit-bold',
      fontSize:20, 
   },
})