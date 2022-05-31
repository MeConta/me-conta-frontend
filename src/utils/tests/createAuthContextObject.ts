const createAuthContextObject = (
  isLoggedIn: boolean = false,
  userType: string = '0',
  completeProfile: boolean = false
) => {
  return {
    isLoggedIn,
    authService: { validarHash: jest.fn(), logout: jest.fn() },
    session: {
      name: 'teste',
      type: userType,
      completeProfile,
      token: '',
      refreshToken: ''
    },
    setCompleteProfile: jest.fn(),
    handleLogin: jest.fn(),
    handleLogout: jest.fn()
  }
}

export default createAuthContextObject
