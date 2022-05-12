import React, { useState } from 'react'
import { styles } from './styles'
import { Image, TouchableOpacity, View, Text, TextInput } from 'react-native'
import { ArrowLeft } from 'phosphor-react-native'
import { theme } from '../../theme'
import { FeedbackType } from '../Widget'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Screenshot } from '../Screenshot'
import { Button } from '../Button'
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'
import { api } from '../../lib/api'

interface Props {
  feedbackType: FeedbackType
  onFeedbackCancelled: () => void
  onFeedBackSend: () => void
}

export const Form = ({
  feedbackType,
  onFeedbackCancelled,
  onFeedBackSend,
}: Props) => {
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const [comment, setComment] = useState('')
  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((err) => console.log(err))
  }

  function handleScreenshotRemove() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return
    }
    setIsSendingFeedback(true)

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }))

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment,
      })
      onFeedBackSend()
    } catch (err) {
      console.log(err)
      setIsSendingFeedback(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCancelled}>
          <ArrowLeft
            size={24}
            weight={'bold'}
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
        onChangeText={setComment}
        multiline
        autoCorrect={false}
        style={styles.input}
        placeholder={
          'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...'
        }
        placeholderTextColor={theme.colors.text_secondary}
      />
      <View style={styles.footer}>
        <Screenshot
          screenshot={screenshot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
        />
        <Button isLoading={isSendingFeedback} onPress={handleSendFeedback} />
      </View>
    </View>
  )
}
