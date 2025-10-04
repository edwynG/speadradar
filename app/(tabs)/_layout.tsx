import TabsCustom from '@/components/compose/TabsCustom'
import { Tabs } from 'expo-router'
import React from 'react'

function tabsLayout() {
  return (
    <Tabs tabBar={props => <TabsCustom {...props}/>}/>
  )
}

export default tabsLayout