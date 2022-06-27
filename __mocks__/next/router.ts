const router = {
  push: jest.fn(),
  useRouter: () => ({ push: jest.fn() })
}

export default router
