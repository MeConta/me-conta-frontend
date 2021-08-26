// Rever tipagem
export const formatPhoneNumber = (value: string): any =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)$/, '$1')

export const removePhoneMask = (value: string) =>
  value.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')
