// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Session } from '@/object-types/Session'
import ApiUtils from '@/utils/api/api.util'
import HttpStatus from '@/object-types/enums/HttpStatus'
import { useCallback, useEffect, useState } from 'react'
import CommonUtils from '@/utils/common.utils'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import Licenses from '@/object-types/Licenses'
import SelectTableMainLicenses from './SelectTableMainLicenses'
import { LicensesType } from '@/object-types/LicensesType'

interface Props {
    show?: boolean
    setShow?: React.Dispatch<React.SetStateAction<boolean>>
    session?: Session
    selectLicenses?: LicensesType
}

const MainLicensesDialog = ({ show, setShow, session, selectLicenses }: Props) => {
    const t = useTranslations(COMMON_NAMESPACE)
    const [data, setData] = useState([])
    const [licenses] = useState([])
    const [licensesResponse, setLicensesResponse] = useState<Licenses>()
    const [licenseDatas, setLicenseDatas] = useState([])

    const handleCloseDialog = () => {
        setShow(!show)
    }

    const searchVendor = () => {
        setLicenseDatas(data)
    }

    const fetchData: any = useCallback(async (url: string) => {
        const response = await ApiUtils.GET(url, session.user.access_token)
        if (response.status == HttpStatus.OK) {
            const data = await response.json()
            return data
        } else {
            return []
        }
    }, [session])

    useEffect(() => {
        fetchData(`licenses`).then((licenses: any) => {
            if (typeof licenses == 'undefined') {
                setData([])
                return
            }
            if (
                !CommonUtils.isNullOrUndefined(licenses['_embedded']) &&
                !CommonUtils.isNullOrUndefined(licenses['_embedded']['sw360:licenses'])
            ) {
                const data = licenses['_embedded']['sw360:licenses'].map((item: any) => [item, item.fullName])
                setData(data)
            }
        })
    }, [fetchData])

    const handleClickSelectModerators = () => {
        selectLicenses(licensesResponse)
        setShow(!show)
    }

    const getLicenses: LicensesType = useCallback((licenses: Licenses) => setLicensesResponse(licenses), [])

    return (
        <Modal show={show} onHide={handleCloseDialog} backdrop='static' centered size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{t('Search Licenses')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modal-body'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder={t('Enter search text')}
                                aria-describedby='Search Licenses'
                            />
                        </div>
                        <div className='col-lg-4'>
                            <button
                                type='button'
                                className={`fw-bold btn btn-light button-plain me-2`}
                                onClick={searchVendor}
                            >
                                {t('Search')}
                            </button>
                            <button type='button' className={`fw-bold btn btn-light button-plain me-2`}>
                                {t('Reset')}
                            </button>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <SelectTableMainLicenses
                            licenseDatas={licenseDatas}
                            setLicenses={getLicenses}
                            fullnames={licenses}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-end'>
                <Button
                    type='button'
                    data-bs-dismiss='modal'
                    className={`fw-bold btn btn-light button-plain me-2`}
                    onClick={handleCloseDialog}
                >
                    {t('Close')}
                </Button>
                <Button type='button' className={`btn btn-primary`} onClick={handleClickSelectModerators}>
                    {t('Select Licenses')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MainLicensesDialog
