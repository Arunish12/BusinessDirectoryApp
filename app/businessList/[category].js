import { View, Text,StyleSheet, FlatList, ActivityIndicator, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';




export default function BusinessListByCategory() {
   
    const navigation = useNavigation();
    const {category} = useLocalSearchParams();
    
    const [businessList,setBusnessList] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
       navigation.setOptions({
        headerShown:true,
        headerTitle:category,
        
        
       });
       getBusinessList();
    },[])
    
    /*
    * used to get business list by category *
    */
    const getBusinessList = async () => {
      setLoading(true);
      setBusnessList([]);  // Clear the business list before fetching new data
      const q = query(collection(db, 'BusinessList'), where("category", '==', category));
      const querySnapshot = await getDocs(q);
    
      let newBusinessList = [];
      querySnapshot.forEach((doc) => {
        newBusinessList.push({id:doc?.id,...doc.data()});
      });
    
      setBusnessList(newBusinessList);  
      setLoading(false);
    };    

    return (
    <View >
       {businessList?.length>0&&loading==false? 
         <FlatList 
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({item,index})=>(
            <BusinessListCard 
              business={item}
              key={index}
            />
          )}
        />:
        loading?<ActivityIndicator 
        style={{
          marginTop:'60%'
        }}
          size={'large'}
          color={Colors.PRIMARY}
        />:
        <Text style={{
          fontSize:20,
          fontFamily:'outfit-bold',
          color:Colors.GRAY,
          textAlign:'center',
          marginTop:'50%'
        }}>No Business Found</Text>
        }
       
    </View>
  )
}



