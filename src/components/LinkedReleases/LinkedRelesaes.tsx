// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'

import TitleLinkedReleases from './TitleLinkedReleases/TitleLinkedReleases'
import styles from './LinkedReases.module.css'
import TableLinkedReleases from './TableLinkedReleases/TableLinkedReleases'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import { useCallback, useEffect, useState } from 'react'
import { Session } from '@/object-types/Session'
import LinkedRelease from '@/object-types/LinkedRelease'
import LinkedReleasesDialog from '../sw360/SearchLinkedReleases/LinkedReleasesDialog'
import ReleasePayload from '@/object-types/ReleasePayload'
import ActionType from '@/object-types/enums/ActionType'
import CommonUtils from '@/utils/common.utils'

interface Props {
    session?: Session
    release?: any
    actionType?: string
    releasePayload?: ReleasePayload
    setReleasePayload?: React.Dispatch<React.SetStateAction<ReleasePayload>>
}

const LinkedReleases = ({ session, release, actionType, releasePayload, setReleasePayload }: Props) => {
    const t = useTranslations(COMMON_NAMESPACE)
    const [reRender, setReRender] = useState(false)
    const [releaseLinks, setReleaseLinks] = useState<LinkedRelease[]>([])
    const handleReRender = () => {
        setReRender(!reRender)
    }
    const [linkedReleasesDiaglog, setLinkedReleasesDiaglog] = useState(false)
    const handleClickSelectLinkedReleases = useCallback(() => setLinkedReleasesDiaglog(true), [])

    const setReleaseIdToRelationshipsToReleasePayLoad = (releaseIdToRelationships: Map<string, string>) => {
        const obj = Object.fromEntries(releaseIdToRelationships)
        setReleasePayload({
            ...releasePayload,
            releaseIdToRelationship: obj,
        })
    }

    useEffect(() => {
        if (actionType === ActionType.EDIT) {
            if (
                !CommonUtils.isNullOrUndefined(release['_embedded']) &&
                !CommonUtils.isNullOrUndefined(release['_embedded']['sw360:releaseLinks'])
            ) {
                const linkedReleases: LinkedRelease[] = []
                release['_embedded']['sw360:releaseLinks'].map((item: any) => [linkedReleases.push(item)])
                setReleaseLinks(linkedReleases)
            }
        }
    }, [actionType, release])

    return (
        <>
            <div className='col' style={{ fontSize: '0.875rem' }}>
                <LinkedReleasesDialog
                    session={session}
                    show={linkedReleasesDiaglog}
                    releaseLinks={releaseLinks}
                    setReleaseLinks={setReleaseLinks}
                    setShow={setLinkedReleasesDiaglog}
                    onReRender={handleReRender}
                    releasePayload={releasePayload}
                    setReleasePayload={setReleasePayload}
                />
                <div
                    className={`row ${styles['attachment-table']}`}
                    style={{ padding: '25px', fontSize: '0.875rem', paddingTop: '1px' }}
                >
                    <TitleLinkedReleases />
                    <TableLinkedReleases
                        releaseLinks={releaseLinks}
                        setReleaseLinks={setReleaseLinks}
                        setReleaseIdToRelationshipsToReleasePayLoad={setReleaseIdToRelationshipsToReleasePayLoad}
                    />
                </div>
                <div>
                    <button
                        type='button'
                        className={`fw-bold btn btn-secondary`}
                        onClick={handleClickSelectLinkedReleases}
                    >
                        {t('Click to add Releases')}
                    </button>
                </div>
            </div>
        </>
    )
}

export default LinkedReleases
