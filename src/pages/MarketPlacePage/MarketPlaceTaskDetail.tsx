import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeartIcon from '/icons/heart-icon.svg'
import ProjectCardModal from '@/src/components/Modals/ProjectCardModal/ProjectCardModal'
import { getJobDetailsByJobId } from '@/src/utils/Firebase'
import Tag from '@/src/components/Tag/Tag'
import Button from '@/src/components/SeButton/SeButton'
import TaskPosterCard from '@/src/pages/MarketPlacePage/components/TaskPosterCard/TaskPosterCard'
import './MarketPlaceTaskDetail.scss'
import { Job } from '@/src/interfaces/types'

function MarketplaceTaskDetail() {
  const { id } = useParams()
  const [jobDetail, setJobDetail] = useState<Job | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isProjectCardModalOpen, setIsProjectCardModalOpen] =
    useState<boolean>(false)

  // Fetch job details from Firebase when component mounts or ID changes
  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const jobData = await getJobDetailsByJobId(id) // Fetch job details from Firebase
        setJobDetail(jobData)
      } catch (error) {
        setError('Failed to fetch job details.')
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }
  if (!jobDetail) {
    return <div>Job not found</div>
  }
  console.log(jobDetail)
  return (
    <div className="task__detail">
      <div className="task__detail-header">
        <div className="task__detail-header__info">
          <>
            <h1 className="task__title">{jobDetail.title}</h1>
            <p className="task__description">{jobDetail.description}</p>
          </>

          <div className="task__tags">
            {jobDetail.categories?.map((category, index) => (
              <Tag key={index} text={category} />
            ))}
          </div>
        </div>
        <div className="task__detail-header__buttons">
          <div className="task__detail-header__favorite">
            <img src={HeartIcon} alt="header__favorite-icon" />
          </div>
          <Button
            text="apply now"
            onClick={() => setIsProjectCardModalOpen(true)}
            colorScheme="#FFD22F"
          />
          <ProjectCardModal
            isProjectCardModalOpen={isProjectCardModalOpen}
            onClose={() => setIsProjectCardModalOpen(false)}
            taskTitle={jobDetail.name}
            onViewMoreProjects={() => {}}
            jobId={id}
          >
            <h1 className="pcmodal__maintitle">
              Application for {jobDetail.title}
            </h1>
            <h2 className="pcmodal__title">Questions</h2>
            <form className="pcmodal__form">
              <label
                className="pcmodal__form--label"
                htmlFor="yearsofexperience"
              >
                How many years of coding experience do you have?
              </label>
              <input
                className="pcmodal__form--input"
                placeholder="Enter your years of experience"
                type="text"
                name="yearsofexperience"
              />
              <Button
                text="apply now"
                onClick={() => {}}
                colorScheme="#FFD22F"
              />
            </form>
          </ProjectCardModal>
        </div>
      </div>
      <div className="task__detail-bottom">
        <article className="task__content">
          <div className="task__content-header">
            <h3 className="task__content-title">About the Project</h3>
            <p className="task__content">
              The Innovative Tech Solution is designed to address a specific
              technological need or challenge in the market. It involves the
              development of a cutting-edge application, platform, or system
              that leverages modern technologies to provide effective solutions.
              The project aims to enhance user experience, improve operational
              efficiency, and drive innovation in its target domain.
            </p>
          </div>
          <div className="task__content-bottom">
            <h5>Responsibilities</h5>
            <ul className="task__content-list">
              <li>
                Identify and address a critical problem or gap in the market
                through innovative technology.
              </li>
              <li>
                Develop a user-friendly solution that provides significant value
                and improves the overall user experience.
              </li>
              <li>
                Utilize the latest advancements in technology to ensure high
                performance, scalability, and security.
              </li>
              <li>
                Position the solution effectively in the market to gain a
                competitive edge and attract target users or customers.
              </li>
            </ul>
          </div>
        </article>
        <TaskPosterCard
          createdDate={jobDetail.createdAt}
          jobDetails={jobDetail}
        />
      </div>
    </div>
  )
}

export default MarketplaceTaskDetail
