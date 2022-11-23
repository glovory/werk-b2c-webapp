import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../helpers'

const tasks: ReadonlyArray<{icon: string; color: string; title: string; description: string}> = [
  {
    icon: '/media/icons/duotune/abstract/abs027.svg',
    color: 'success',
    title: 'Project Briefing',
    description: 'Project Manager',
  },

  {
    icon: '/media/icons/duotune/art/art005.svg',
    color: 'warning',
    title: 'Concept Design',
    description: 'Art Director',
  },

  {
    icon: '/media/icons/duotune/communication/com012.svg',
    color: 'primary',
    title: 'Functional Logics',
    description: 'Lead Developer',
  },

  {
    icon: '/media/icons/duotune/coding/cod008.svg',
    color: 'danger',
    title: 'Development',
    description: 'DevOps',
  },

  {
    icon: '/media/icons/duotune/general/gen049.svg',
    color: 'info',
    title: 'Testing',
    description: 'QA Managers',
  },

  {
    icon: '/media/icons/duotune/finance/fin006.svg',
    color: 'success',
    title: 'HTML, CSS Coding',
    description: 'Art Director',
  },

  {
    icon: '/media/icons/duotune/graphs/gra008.svg',
    color: 'danger',
    title: 'ReactJS Developer',
    description: 'Web, UI/UX Design',
  },
]

const TasksTab = () => (
  <div className='mx-5'>
    {/*begin::Header*/}
    <h3 className='fw-bolder text-dark mb-10 mx-0'>Tasks Overview</h3>
    {/*end::Header*/}

    {/*begin::Body*/}
    <div className='mb-12'>
      {tasks.map((t) => (
        <div className='d-flex align-items-center mb-7' key={t.title}>
          {/*begin::Symbol*/}
          <div className='symbol symbol-50px me-5'>
            <span className={`symbol-label bg-light-${t.color}`}>
              <KTSVG path={t.icon} className={`svg-icon-2x svg-icon-${t.color}`} />
            </span>
          </div>
          {/*end::Symbol*/}

          {/*begin::Text*/}
          <div className='d-flex flex-column'>
            <Link
              to='/crafted/pages/profile/overview'
              className='text-gray-800 text-hover-primary fs-6 fw-bold'
            >
              {t.title}
            </Link>

            <span className='text-muted fw-bold'>{t.description}</span>
          </div>
          {/*end::Text*/}
        </div>
      ))}
    </div>
    {/*end::Body*/}
  </div>
)

export {TasksTab}
