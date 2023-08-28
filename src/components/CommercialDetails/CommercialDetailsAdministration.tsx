// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useTranslations } from 'next-intl'
import styles from './CommercialDetails.module.css'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import ComponentOwnerDiaglog from '@/components/sw360/SearchComponentOwner/ComponentOwnerDialog'
import { useCallback, useState } from 'react'
import ComponentOwner from '@/object-types/ComponentOwner'
import { Session } from '@/object-types/Session'

interface Props {
    session?: Session
}
const CommercialDetailsAdministration = ({ session }: Props) => {
    const t = useTranslations(COMMON_NAMESPACE)
    const [dialogOpenComponentOwner, setDialogOpenComponentOwner] = useState(false)
    const handleClickSearchComponentOwner = useCallback(() => setDialogOpenComponentOwner(true), [])

    const setCotsResponsibleUser = (cotsResponsible: ComponentOwner) => {
        const cotsResponsibleUser: ComponentOwner = {
            email: cotsResponsible.email,
            fullName: cotsResponsible.fullName,
        }
    }

    return (
        <>
            <div className='col' style={{ padding: '0px 12px' }}>
                <div className='row mb-4'>
                    <div className={`${styles['header']} mb-2`}>
                        <p className='fw-bold mt-3'>{t('Commercial Details Administration')}</p>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <div className='form-check'>
                                <input
                                    id='usageRightAvailable'
                                    type='checkbox'
                                    className='form-check-input'
                                    name='usageRightAvailable'
                                />
                                <label className='form-label fw-bold' htmlFor='usageRightAvailable'>
                                    {t('Usage Right Available')}
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='COTS_responsible' className='form-label fw-bold'>
                                {t('COTS Responsible')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Click to edit'
                                id='COTS_responsible'
                                aria-describedby='COTS_responsible'
                                onClick={handleClickSearchComponentOwner}
                                readOnly={true}
                                name='COTS_responsible'
                            />
                            <ComponentOwnerDiaglog
                                show={dialogOpenComponentOwner}
                                setShow={setDialogOpenComponentOwner}
                                session={session}
                                selectComponentOwner={setCotsResponsibleUser}
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='clearingDeadline' className='form-label fw-bold'>
                                {t('COTS Clearing Deadline')}
                            </label>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Enter material index number'
                                id='clearingDeadline'
                                aria-describedby='clearingDeadline'
                                name='clearingDeadline'
                            />
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <label htmlFor='licenseClearingReportURL' className='form-label fw-bold'>
                                {t('COTS Clearing Report URL')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter URL'
                                id='licenseClearingReportURL'
                                aria-describedby='licenseClearingReportURL'
                                name='licenseClearingReportURL'
                            />
                        </div>
                    </div>
                    <hr className='my-2' />
                </div>
            </div>
        </>
    )
}

export default CommercialDetailsAdministration