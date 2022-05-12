import 'react-native-gesture-handler'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { theme } from './src/theme'
import { Widget } from './src/components/Widget'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({ Inter_400Regular, Inter_500Medium })

        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" backgroundColor={'transparent'} translucent />
      <Widget />
    </View>
  )
}
