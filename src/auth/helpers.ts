import prisma from '../server/db'

export const isAdmin = async (req, res, next) => {
  console.log('req.user ', req.user)
  const user = req.user
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const userFromDB = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })

  if (userFromDB.isAdmin) {
    return next()
  }
  return res.status(401).json({ message: 'Unauthorized' })
}

export const isAuth = async (req, res, next) => {
  console.log('req.user ', req.user)
  const user = req.user
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const userFromDB = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })

  if (userFromDB) {
    return next()
  }
  return res.status(401).json({ message: 'Unauthorized' })
}
