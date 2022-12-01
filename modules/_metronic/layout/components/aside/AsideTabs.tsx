/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import clsx from 'clsx'
import {FC, Dispatch, SetStateAction} from 'react'
import {KTSVG} from '../../../helpers'

const tabs: ReadonlyArray<{link: string; icon: string; tooltip: string}> = [
  {
    link: 'projects',
    icon: '/media/icons/duotune/general/gen025.svg',
    tooltip: 'Projects',
  },
  {
    link: 'menu',
    icon: '/media/icons/duotune/finance/fin006.svg',
    tooltip: 'Menu',
  },
  {
    link: 'subscription',
    icon: '/media/icons/duotune/general/gen032.svg',
    tooltip: 'Subscription',
  },
  {
    link: 'tasks',
    icon: '/media/icons/duotune/general/gen048.svg',
    tooltip: 'Tasks',
  },
  {
    link: 'notifications',
    icon: '/media/icons/duotune/abstract/abs027.svg',
    tooltip: 'Notifications',
  },
  {
    link: 'authors',
    icon: '/media/icons/duotune/files/fil005.svg',
    tooltip: 'Authors',
  },
]

type Props = {
  link: string
  setLink: Dispatch<SetStateAction<string>>
}

const AsideTabs: FC<Props> = ({link, setLink}) => (
  <div
    className='hover-scroll-y mb-10'
    data-kt-scroll='true'
    data-kt-scroll-activate='{default: false, lg: true}'
    data-kt-scroll-height='auto'
    data-kt-scroll-wrappers='#kt_aside_nav'
    data-kt-scroll-dependencies='#kt_aside_logo, #kt_aside_footer'
    data-kt-scroll-offset='0px'
  >
    {/* begin::Nav */}
    <ul className='nav flex-column' id='kt_aside_nav_tabs'>
      {/* begin::Nav item */}
      {tabs.map((t) => (
        <li key={t.link}>
          {/* begin::Nav link */}
          <a
            className={clsx(
              'nav-link btn btn-icon btn-active-color-primary btn-color-gray-400 btn-active-light',
              {active: t.link === link}
            )}
            onClick={() => setLink(t.link)}
          >
            <KTSVG path={t.icon} className='svg-icon-2x' />
          </a>
          {/* end::Nav link */}
        </li>
      ))}
      {/* end::Nav link */}
    </ul>
    {/* end::Tabs */}
  </div>
)

export {AsideTabs}
