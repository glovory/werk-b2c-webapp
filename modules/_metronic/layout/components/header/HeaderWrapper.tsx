/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'
import {DefaultTitle} from './page-title/DefaultTitle'
import {Topbar} from './Topbar'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()
  const {header} = config
  const [offset, setOffset] = useState<string>(`{default: '200px', lg: '300px'}`)
  useEffect(() => {
    let newString = `{default: '200px', lg: '300px'}`
    if (header.fixed.desktop) {
      if (!header.fixed.tabletAndMobile) {
        newString = `{lg: '300px'}`
      }
    } else {
      newString = `{default: '200px', lg: false}`
    }

    setOffset(newString)
  }, [header.fixed])

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '))}
      {...attributes.headerMenu}
      data-kt-sticky='true'
      data-kt-sticky-name='header'
      data-kt-sticky-offset={offset}
    >
      {/* begin::Container */}
      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-center justify-content-between'
        )}
        id='kt_header_container'
      >
        <DefaultTitle />
        {/* begin::Wrapper */}
        <div className={'d-flex d-lg-none align-items-center ms-n2 me-2'}>
          {/* begin::Aside mobile toggle */}
          <div className='btn btn-icon btn-active-icon-primary aside-toggle' id='kt_aside_toggle'>
            <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-1' />
          </div>

          {/* begin::Logo */}
          <Link to='/dashboard' className='d-flex align-items-center'>
            <img alt='Logo' src={toAbsoluteUrl('/media/logos/demo7.svg')} className='h-30px' />
          </Link>
          {/* end::Logo */}
        </div>
        {/* end::Wrapper */}
        <Topbar />
      </div>
      {/* end::Container */}
    </div>
  )
}
