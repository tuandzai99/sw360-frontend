// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { COMMON_NAMESPACE } from '@/object-types/Constants'
import { useTranslations } from 'next-intl'
import styles from '../EditRelease.module.css'
import ReleasePayload from '@/object-types/ReleasePayload'

interface Props {
    releasePayload?: ReleasePayload
    setReleasePayload?: React.Dispatch<React.SetStateAction<ReleasePayload>>
}

const RequestInformation = ({ releasePayload, setReleasePayload }: Props) => {
    const t = useTranslations(COMMON_NAMESPACE)

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReleasePayload({
            ...releasePayload,
            clearingInformation: {
                ...releasePayload.clearingInformation,
                [e.target.name]: e.target.value,
            },
        })
    }

    return (
        <>
            <div className='col' style={{ padding: '0px 12px' }}>
                <div className='row mb-4'>
                    <div className={`${styles['header']} mb-2`}>
                        <p className='fw-bold mt-3'>{t('Request Information')}</p>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4'>
                            <label htmlFor='request_id' className='form-label fw-bold'>
                                {t('Request ID')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter request ID'
                                id='request_id'
                                aria-describedby='version'
                                required
                                name='requestID'
                                value={releasePayload.clearingInformation?.requestID ?? ''}
                                onChange={updateField}
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='additional_request_info' className='form-label fw-bold'>
                                {t('Additional request Info')}
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter additional request Info'
                                id='additional_request_info'
                                aria-describedby='version'
                                required
                                name='additionalRequestInfo'
                                value={releasePayload.clearingInformation?.additionalRequestInfo ?? ''}
                                onChange={updateField}
                            />
                        </div>
                    </div>
                    <hr className='my-2' />
                    <div className='row'>
                        <div className='col-lg-4'>
                            <label htmlFor='evaluation_start' className='form-label fw-bold'>
                                {t('Evaluation Start')}
                            </label>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Enter ECC comment'
                                id='evaluation_start'
                                aria-describedby='version'
                                required
                                name='procStart'
                                value={releasePayload.clearingInformation?.procStart ?? ''}
                                onChange={updateField}
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='evaluation_end' className='form-label fw-bold'>
                                {t('Evaluation End')}
                            </label>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Enter ECC comment'
                                id='evaluation_end'
                                aria-describedby='version'
                                required
                                name='evaluated'
                                value={releasePayload.clearingInformation?.evaluated ?? ''}
                                onChange={updateField}
                            />
                        </div>
                    </div>
                    <hr className='my-2' />
                </div>
            </div>
        </>
    )
}

export default RequestInformation
