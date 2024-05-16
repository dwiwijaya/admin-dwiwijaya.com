import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import AboutForm from '@/components/views/about/AboutForm'
import WithProtected from '@/hoc/withProtected'
import Link from 'next/link'
import React from 'react'

const create = () => {
  return (
    <Container>
      <PageHeading title="Create About">
      </PageHeading>
      <AboutForm action="create"/>
    </Container>
  )
}

export default WithProtected(create);
