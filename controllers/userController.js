import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'
import Job from '../models/JobModel.js'
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJSON()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()
  res.status(StatusCodes.OK).json({ users, jobs })
}
export const updateUser = async (req, res) => {
  const newUser = { ...req.body }
  delete newUser.password

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path)
    await fs.unlink(req.file.path)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser)

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }

  res.status(StatusCodes.OK).json({ msg: 'update user' })
}
// Helper function to convert Turkish date string to Date object
function convertToDate(dateString) {
  const months = {
    Ocak: 0,
    Şubat: 1,
    Mart: 2,
    Nisan: 3,
    Mayıs: 4,
    Haziran: 5,
    Temmuz: 6,
    Ağustos: 7,
    Eylül: 8,
    Ekim: 9,
    Kasım: 10,
    Aralık: 11,
  }

  const parts = dateString.split(' ')
  const day = parseInt(parts[0], 10)
  const month = months[parts[1]]
  const year = new Date().getFullYear()
  return new Date(year, month, day)
}

// Nöbet atamak için root
export const nobetAta = async (req, res) => {
  const jobs = await Job.find()
  const users = await User.find()

  const filteredJobs = jobs
    .map((job) => ({
      id: job._id,
      jobDate: job.jobDate,
      jobAssignTo: job.jobAssignTo,
    }))
    .sort((a, b) => {
      const dateA = convertToDate(a.jobDate)
      const dateB = convertToDate(b.jobDate)
      return dateA - dateB
    })

  // Only consider users with role "user"
  const userUsers = users.filter((user) => user.role === 'user')

  // Job assignment logic
  const assignJobs = async () => {
    for (const job of filteredJobs) {
      if (job.jobAssignTo === 'none') {
        for (const user of userUsers) {
          // Check if the user doesn't have a job on the same date
          const userHasJobOnDate = filteredJobs.some(
            (j) => j.jobAssignTo === user._id && j.jobDate === job.jobDate
          )
          if (!userHasJobOnDate) {
            // Update job assignment in the filteredJobs array
            job.jobAssignTo = user._id
            job.jobStatus = 'interview'

            // Update job assignment in the jobs collection
            await Job.findByIdAndUpdate(job.id, {
              jobAssignTo: user._id,
              jobStatus: 'interview',
            })

            break
          }
        }
      }
    }
  }

  await assignJobs()

  res
    .status(StatusCodes.OK)
    .json({ jobs, users, filteredJobs, msg: 'denemeee' })
}
