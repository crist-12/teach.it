import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native'


import LottieView from 'lottie-react-native'

import CreditCardForm, { Button } from 'rn-credit-card'

const CreditCard = () => {

  const formMethods = useForm({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  })
  const { handleSubmit, formState } = formMethods

  function onSubmit() {
    Alert.alert('Success: ' + JSON.stringify(model, null, 2))
  }

  return (
    <FormProvider {...formMethods}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.avoider}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <CreditCardForm
            LottieView={LottieView}
            horizontalStart
            overrides={{
              labelText: {
                marginTop: 16,
              },
            }}
            translations={{
                cardNumber: 'Número de tarjeta',
                cardHolderName: 'Nombre',
                nameSurname: 'Apellido',
                mmYY: 'MM/YY',
                expiration: 'Expiración',
                securityCode: 'Código de Seguridad',
                next: 'Siguiente',
                done: 'Terminado',
                cardNumberRequired: 'El número de tarjeta es obligatorio',
                cardNumberInvalid: 'Número de tarjeta invalido',
                cardHolderNameRequired: 'El nombre es obligatorio',
                cardHolderNameInvalid: 'Nombre inválido',
                expirationRequired: 'La fecha de expiración es obligatoria',
                expirationInvalid: 'La fecha de expiración es inválida',
                securityCodeRequired: 'El código de seguridad es obligatorio',
                securityCodeInvalid: 'El código de seguridad es inválido',
              }}
          />
        </KeyboardAvoidingView>
        {formState.isValid && (
          <Button
            style={styles.button}
            title={'CONFIRM PAYMENT'}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </SafeAreaView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
})

export default CreditCard