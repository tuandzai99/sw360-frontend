// Copyright (C) Siemens AG, 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import { Dispatch, SetStateAction } from 'react'

import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'

import { VulnerabilityData, VendorAdvisory } from '@/object-types/VulnerabilityPayload'

import { FaTrashAlt } from 'react-icons/fa'

export default function AddVendorAdvisory({
    payload,
    setPayload,
}: {
    payload: VulnerabilityData
    setPayload: Dispatch<SetStateAction<VulnerabilityData>>
}) {
    const t = useTranslations(COMMON_NAMESPACE)

    const addAdvisory = () => {
        setPayload((prev: VulnerabilityData) => {
            return { ...prev, vendorAdvisories: [...prev.vendorAdvisories, { vendor: '', name: '', url: '' }] }
        })
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
        i: number
    ) => {
        setPayload((prev: VulnerabilityData) => {
            const refs = prev.vendorAdvisories
            refs[i][e.target.name as keyof VendorAdvisory] = e.target.value
            return { ...prev, vendorAdvisories: refs }
        })
    }

    const deleteAdvisory = (i: number) => {
        setPayload((prev: VulnerabilityData) => {
            const refs = prev.vendorAdvisories.slice()
            refs.splice(i, 1)
            return { ...prev, vendorAdvisories: refs }
        })
    }

    return (
        <>
            <div className='row mb-4 mx-0'>
                <div className='row header mb-2 pb-2 px-2'>
                    <h6>{t('Vendor Advisories')}</h6>
                </div>
                {payload.vendorAdvisories.map((elem, i) => (
                    <div className='row mb-2' key={i}>
                        <div className='col-lg-3'>
                            <label
                                htmlFor='vulnerabilityDetail.vendorAdvisories.vendor'
                                className='form-label fw-medium'
                            >
                                {t('Advisory Vendor')}{' '}
                                <span className='text-red' style={{ color: '#F7941E' }}>
                                    *
                                </span>
                            </label>
                            <input
                                type='text'
                                id='vulnerabilityDetail.vendorAdvisories.vendor'
                                name='vendor'
                                value={elem.vendor}
                                onChange={(e) => {
                                    handleChange(e, i)
                                }}
                                className='form-control'
                                placeholder={t('Enter Advisory Vendor')}
                                required
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='vulnerabilityDetail.vendorAdvisories.name' className='form-label fw-medium'>
                                {t('Advisory Name')}{' '}
                                <span className='text-red' style={{ color: '#F7941E' }}>
                                    *
                                </span>
                            </label>
                            <input
                                type='text'
                                id='vulnerabilityDetail.vendorAdvisories.name'
                                name='name'
                                value={elem.name}
                                onChange={(e) => {
                                    handleChange(e, i)
                                }}
                                className='form-control'
                                placeholder={t('Enter Advisory Name')}
                                required
                            />
                        </div>
                        <div className='col-lg-4'>
                            <label htmlFor='vulnerabilityDetail.vendorAdvisories.url' className='form-label fw-medium'>
                                {t('Advisory Url')}{' '}
                                <span className='text-red' style={{ color: '#F7941E' }}>
                                    *
                                </span>
                            </label>
                            <input
                                type='text'
                                id='vulnerabilityDetail.vendorAdvisories.url'
                                name='url'
                                value={elem.url}
                                onChange={(e) => {
                                    handleChange(e, i)
                                }}
                                className='form-control'
                                placeholder={t('Enter Advisory Url')}
                                required
                            />
                        </div>
                        <div className='col-lg-1 d-flex align-items-end pb-2'>
                            <FaTrashAlt className='btn-icon' size={22} onClick={() => deleteAdvisory(i)} />
                        </div>
                    </div>
                ))}
                <div className='col-lg-4 mt-2'>
                    <button type='button' onClick={addAdvisory} className={`fw-bold btn btn-secondary`}>
                        {t('Click to add Vendor Advisory')}
                    </button>
                </div>
            </div>
        </>
    )
}
