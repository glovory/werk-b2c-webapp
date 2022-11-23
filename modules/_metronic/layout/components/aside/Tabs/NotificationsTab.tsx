import {Link} from 'react-router-dom'
import {KTSVG} from '../../../../helpers'

const notifications: ReadonlyArray<{
  color: string
  icon: string
  title: string
  text: string
  number: string
}> = [
  {
    color: 'warning',
    icon: 'icons/duotune/abstract/abs027.svg',
    title: 'Group lunch celebration',
    text: 'Due in 29 Days',
    number: '+28%',
  },

  {
    color: 'success',
    icon: 'icons/duotune/files/fil008.svg',
    title: 'Navigation optimization',
    text: 'Due in 2 Days',
    number: '+50%',
  },

  {
    color: 'danger',
    icon: 'icons/duotune/communication/com012.svg',
    title: 'Humbert Bresnen',
    text: 'Due in 5 Days',
    number: '-27%',
  },

  {
    color: 'info',
    icon: 'icons/duotune/finance/fin006.svg',
    title: 'Air B & B - Real Estate',
    text: 'Due in 8 Days',
    number: '+21%',
  },

  {
    color: 'primary',
    icon: 'icons/duotune/arrows/arr031.svg',
    title: 'B & Q - Food Company',
    text: 'Due in 6 Days',
    number: '+12%',
  },

  {
    color: 'danger',
    icon: 'icons/duotune/art/art005.svg',
    title: 'Nexa - Next generation',
    text: 'Due in 4 Days',
    number: '+34%',
  },
]

const NotificationsTab = () => (
  <div className='mx-5'>
    {/*begin::Header*/}
    <h3 className='fw-bolder text-dark mb-10 mx-0'>Notifications</h3>
    {/*end::Header*/}

    {/*begin::Body*/}
    <div className='mb-12'>
      {notifications.map((n) => (
        <div
          key={n.text}
          className={`d-flex align-items-center bg-light-${n.color} rounded p-5 mb-7`}
        >
          <KTSVG
            path={n.icon}
            className={`svg-icon-${n.color} me-5`}
            svgClassName={`svg-icon-1 svg-icon-${n.color}`}
          />

          {/*begin::Title*/}
          <div className='flex-grow-1 me-2'>
            <Link
              to='/crafted/widgets/lists'
              className='fw-bolder text-gray-800 text-hover-primary fs-6'
            >
              {n.title}
            </Link>

            <span className='text-muted fw-bold d-block'>{n.text}</span>
          </div>
          {/*end::Title*/}

          {/*begin::Lable*/}
          <span className={`fw-bolder text-${n.color} py-1`}>{n.number}</span>
          {/*end::Lable*/}
        </div>
      ))}
    </div>
    {/*end::Body*/}
  </div>
)

export {NotificationsTab}
