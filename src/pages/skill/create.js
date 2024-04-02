import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import WithProtected from '@/hoc/withProtected'
import Link from 'next/link'
import React from 'react'

const create = () => {
  return (
    <Container>
      <PageHeading title="Create Skill">
      </PageHeading>
    </Container>
  )
}

export default WithProtected(create);
