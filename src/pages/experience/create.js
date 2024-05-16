import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import ExperienceForm from '@/components/views/experience/ExperienceForm'
import WithProtected from '@/hoc/withProtected'
import Link from 'next/link'
import React from 'react'

const create = () => {
  return (
    <Container>
      <PageHeading title="Create Experience">
      </PageHeading>
      <ExperienceForm action="create"/>
    </Container>
  )
}

export default WithProtected(create);
