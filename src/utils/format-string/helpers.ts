// Rever tipagem
export const formatPhoneNumber = (value: string): any => {
  const str = value.replace(/^(\d{2})(\d{4,5})(\d{4})$/g, '($1) $2-$3')

  console.log(str)

  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
}
export const removePhoneMask = (value: string) => value.replace(/\D/g, '')
