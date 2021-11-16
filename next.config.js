module.exports = {
  /*reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL
  }*/
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:3000'}/:path*`
      }
    ]
  }
}
// console.log(process.env.API_URL)
