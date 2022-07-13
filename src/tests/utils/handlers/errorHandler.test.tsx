import { AxiosError } from 'axios'
import { ReactElement } from 'react'
import {
  formatErrorMessage,
  getErrorMessage
} from '../../../utils/handlers/errorHandler'

describe('errorHandler', () => {
  describe('function formatErrorMessage ', () => {
    it('should return error message when it is string', () => {
      const errorMessage = 'Mensagem de erro'
      const response = formatErrorMessage(errorMessage)
      expect(response).toBe(errorMessage)
    })

    it('should return generic error when error message is a empty array', () => {
      const errorMessage: string[] = []
      const response = formatErrorMessage(errorMessage)
      expect(response).toBe('Erro genérico')
    })

    it('should return first item in array when error message is an array', () => {
      const errorMessage: string[] = ['Mensagem de erro']
      const response = formatErrorMessage(errorMessage)
      expect(response).toBe(errorMessage[0])
    })
  })
})
