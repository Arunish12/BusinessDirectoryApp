import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'
import { ScrollView } from 'react-native'

export default function home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
       {/* Header */}
        <Header />
       {/* Slider */}
        <Slider />
       {/* Category */}
        <Category/>
       {/* Popular Business List */}
       <PopularBusiness />
     
     {/* <View style={{height:50}}></View> */}
   
    </ScrollView>
  )
}