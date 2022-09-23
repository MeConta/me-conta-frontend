// Rever tipagem
export const formatPhoneNumber = (value: string): any =>
  value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2')

export const removePhoneMask = (value: string) => value.replace(/\D/g, '')
export const capitalizeFirstLetter = (value: string) =>
  value[0].toUpperCase() + value.slice(1)
