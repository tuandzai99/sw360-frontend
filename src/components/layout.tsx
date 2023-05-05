// Copyright (C) TOSHIBA CORPORATION, 2023. Part of the SW360 Frontend Project.
// Copyright (C) Toshiba Software Development (Vietnam) Co., Ltd., 2023. Part of the SW360 Frontend Project.

// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/

// SPDX-License-Identifier: EPL-2.0
// License-Filename: LICENSE

import { ReactNode } from 'react';
import PageHeader from './header'
import PageFooter from './footer'
import { SessionProvider } from "next-auth/react"

interface IProps {
  children: ReactNode,
  session: any
}

export default function Layout({ children, session }: IProps) {
  return (
    <SessionProvider session={session}>
      <PageHeader />
      <main>{children}</main>
      <PageFooter />
    </ SessionProvider>
  )
}