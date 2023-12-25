import { getServerSession } from 'next-auth'

export const session = async (param = {}) => {
  try {
    const { session, token } = param
    session.user.id = token.id
    return session
  } catch (error) {
    console.log(error)
  }
}

export const getUserSession = async () => {
  try {
    const authUserSession = await getServerSession({
      callbacks: {
        session,
      },
    })
    if (!authUserSession) return null
    return authUserSession?.user
  } catch (error) {
    return null
  }
}
