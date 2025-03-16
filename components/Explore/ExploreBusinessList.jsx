import { View, Text, FlatList } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'
import { ScrollView } from 'react-native';

export default function ExploreBusinessList({businessList}) {
  return (
    <ScrollView>
      <FlatList 
       data={businessList}
       
       showsVerticalScrollIndicator={false}
       renderItem={({item,index})=>( 
          <BusinessListCard 
          key={index}
          business={item}
         />
       )}
      />
      <View style={{height:200}}>

      </View>
    </ScrollView>
  )
}