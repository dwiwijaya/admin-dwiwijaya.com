import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import SkillForm from '@/components/views/skill/SkillForm'
import WithProtected from '@/hoc/withProtected'
import Link from 'next/link'
import React from 'react'

const create = () => {
  return (
    <Container>
      <PageHeading title="Create Skill">
      </PageHeading>
      <SkillForm action="create"/>
    </Container>
  )
}

export default WithProtected(create);
