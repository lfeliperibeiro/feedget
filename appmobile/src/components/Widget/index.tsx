import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'

import { styles } from './styles'
import { theme } from '../../theme'
import { Options } from '../Options'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Form } from '../Form'
import { Success } from '../Success'

export type FeedbackType = keyof typeof feedbackTypes

export const Widget = () => {
  const [feedbackType, setFeedBackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleRestartFeedback() {
    setFeedBackType(null)
    setFeedbackSend(false)
  }

  function handleFeedbackSend() {
    setFeedbackSend(true)
  }
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight={'bold'}
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSend ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackCancelled={handleRestartFeedback}
                onFeedBackSend={handleFeedbackSend}
              />
            ) : (
              <Options onFeedBackTypeChanged={setFeedBackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  )
}
