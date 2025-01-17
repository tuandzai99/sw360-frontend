// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

'use client'
import { useEffect, useState, useCallback } from 'react'

import CommonTabIds from '@/object-types/enums/CommonTabsIds'
import ApiUtils from '@/utils/api/api.util'
import { Session } from '@/object-types/Session'
import HttpStatus from '@/object-types/enums/HttpStatus'
import { signOut } from 'next-auth/react'
import { notFound, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { COMMON_NAMESPACE } from '@/object-types/Constants'
import { SideBar, PageButtonHeader } from '@/components/sw360'
import DocumentTypes from '@/object-types/enums/DocumentTypes'
import Releases from './Releases'
import EditAttachments from '@/components/Attachments/EditAttachments'
import ComponentPayload from '@/object-types/ComponentPayLoad'
import DeleteComponentDialog from '../../../components/DeleteComponentDialog'
import CommonUtils from '@/utils/common.utils'
import AttachmentDetail from '@/object-types/AttachmentDetail'
import ActionType from '@/object-types/enums/ActionType'
import ComponentEditSummary from './ComponentEditSummary'
import { ToastContainer } from 'react-bootstrap'
import ToastMessage from '@/components/sw360/ToastContainer/Toast'
import ToastData from '@/object-types/ToastData'
import Component from '@/object-types/Component'
import EmbeddedAttachments from '@/object-types/EmbeddedAttachments'
import Attachment from '@/object-types/Attachment'

interface Props {
    session?: Session
    componentId?: string
}

const tabList = [
    {
        id: CommonTabIds.SUMMARY,
        name: 'Summary',
    },
    {
        id: CommonTabIds.RELEASES,
        name: 'Release',
    },
    {
        id: CommonTabIds.ATTACHMENTS,
        name: 'Attachments',
    },
]

const EditComponent = ({ session, componentId }: Props) => {
    const t = useTranslations(COMMON_NAMESPACE)
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState<string>(CommonTabIds.SUMMARY)
    const [component, setComponent] = useState<Component>()
    const [attachmentData, setAttachmentData] = useState<AttachmentDetail[]>([])
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [componentPayload, setComponentPayload] = useState<ComponentPayload>({
        name: '',
        createBy: '',
        description: '',
        componentType: '',
        moderators: null,
        modifiedBy: '',
        modifiedOn: '',
        componentOwner: '',
        ownerAccountingUnit: '',
        ownerGroup: '',
        ownerCountry: '',
        roles: null,
        externalIds: null,
        additionalData: null,
        defaultVendorId: '',
        categories: null,
        homepage: '',
        mailinglist: '',
        wiki: '',
        blog: '',
        attachmentDTOs: null,
    })

    const [toastData, setToastData] = useState<ToastData>({
        show: false,
        type: '',
        message: '',
        contextual: '',
    })

    const alert = (show_data: boolean, status_type: string, message: string, contextual: string) => {
        setToastData({
            show: show_data,
            type: status_type,
            message: message,
            contextual: contextual,
        })
    }

    const fetchData = useCallback(
        async (url: string) => {
            const response = await ApiUtils.GET(url, session.user.access_token)
            if (response.status == HttpStatus.OK) {
                const data = (await response.json()) as Component & EmbeddedAttachments
                return data
            } else if (response.status == HttpStatus.UNAUTHORIZED) {
                return signOut()
            } else {
                notFound()
            }
        },
        [session.user.access_token]
    )

    useEffect(() => {
        void fetchData(`components/${componentId}`).then((component: Component) => {
            setComponent(component)
        })
        void fetchData(`components/${componentId}/attachments`).then((attachments: EmbeddedAttachments) => {
            if (
                !CommonUtils.isNullOrUndefined(attachments._embedded) &&
                !CommonUtils.isNullOrUndefined(attachments._embedded['sw360:attachmentDTOes'])
            ) {
                const attachmentDetails: AttachmentDetail[] = []
                attachments._embedded['sw360:attachmentDTOes'].forEach((item: Attachment) => {
                    attachmentDetails.push(item)
                })
                setAttachmentData(attachmentDetails)
            }
        })
    }, [componentId, fetchData])

    const submit = async () => {
        const response = await ApiUtils.PATCH(`components/${componentId}`, componentPayload, session.user.access_token)
        if (response.status == HttpStatus.OK) {
            alert(true, 'Success', `Success:Component ${componentPayload.name}  updated successfully!`, 'success')
            router.push('/components/detail/' + componentId)
        } else {
            alert(true, 'Duplicate', t('Edit Component Fail'), 'danger')
        }
    }

    const handleDeleteComponent = () => {
        setDeleteDialogOpen(true)
    }

    const headerButtons = {
        'Update Component': { link: '/components/edit/' + componentId, type: 'primary', onClick: submit },
        'Delete Component': {
            link: '/components/edit/' + componentId,
            type: 'danger',
            onClick: handleDeleteComponent,
        },
        Cancel: { link: '/components/detail/' + componentId, type: 'secondary' },
    }

    return (
        component && (
            <div className='container' style={{ maxWidth: '98vw', marginTop: '10px' }}>
                <div className='row'>
                    <DeleteComponentDialog
                        componentId={componentId}
                        show={deleteDialogOpen}
                        setShow={setDeleteDialogOpen}
                        actionType={ActionType.EDIT}
                    />
                    <div className='col-2 sidebar'>
                        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabList={tabList} />
                    </div>
                    <div className='col'>
                        <div className='row' style={{ marginBottom: '20px' }}>
                            <PageButtonHeader title={component.name} buttons={headerButtons}></PageButtonHeader>
                        </div>
                        <div className='row' hidden={selectedTab !== CommonTabIds.SUMMARY ? true : false}>
                            <ToastContainer position='top-start'>
                                <ToastMessage
                                    show={toastData.show}
                                    type={toastData.type}
                                    message={toastData.message}
                                    contextual={toastData.contextual}
                                    onClose={() => setToastData({ ...toastData, show: false })}
                                    setShowToast={setToastData}
                                />
                            </ToastContainer>
                            <ComponentEditSummary
                                attachmentData={attachmentData}
                                session={session}
                                componentId={componentId}
                                componentPayload={componentPayload}
                                setComponentPayload={setComponentPayload}
                            />
                        </div>
                        <div className='row' hidden={selectedTab !== CommonTabIds.RELEASES ? true : false}>
                            <Releases componentId={componentId} session={session} />
                        </div>
                        <div className='row' hidden={selectedTab != CommonTabIds.ATTACHMENTS ? true : false}>
                            <EditAttachments
                                session={session}
                                documentId={componentId}
                                documentType={DocumentTypes.COMPONENT}
                                componentPayload={componentPayload}
                                setComponentPayload={setComponentPayload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default EditComponent
