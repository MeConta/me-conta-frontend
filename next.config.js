// require('dotenv').config({ path: `./.env.${process.env.ENVIRONMENT}` })

console.log('API_URL', process.env.API_URL)
console.log('NEXT_PUBLIC_API_URL', process.env.NEXT_PUBLIC_API_URL)
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL
  }
}
