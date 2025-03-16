import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import Intro from '../../components/BusinessDetail/intro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from '../../components/BusinessDetail/Reviews';

export default function BusinessDetail() {
  
  const {businessId} = useLocalSearchParams();
  const [business, setBusiness] = useState([]);
  const [loading,setLoading] = useState(false);
  
  useEffect(()=>{
    getBusinessDetailById();
  },[])
  

  const getBusinessDetailById=async()=>{
    setLoading(true)
    const docRef = doc(db,'BusinessList',businessId)
    const docSnap = await getDoc(docRef);
     if(docSnap.exists()){
        console.log("Document Data: ",docSnap.data());
        setBusiness({id:docSnap.id,...docSnap.data()});
        setLoading(false)
     }
     else{
      console.log("No such Document");
      setLoading(false)
     }
      
  }

  return (
    <ScrollView>
      {loading?
        <ActivityIndicator 
         style={{marginTop:'70%'}}
          size={'large'}
          color={Colors.PRIMARY}
        />:
         <View>
          {/* intro */ }
           <Intro business={business}/>
          {/* Action Buttons */}
           <ActionButton business={business} />
          {/* About Section */}

           <About business={business} />

           {/* Reviews Section */}
          
          <Reviews business={business} />

         </View>
       }

    </ScrollView>
  )
} 