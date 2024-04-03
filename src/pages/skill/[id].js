import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import DetailSkill from '@/components/views/skill/DetailSkill'
import getDocument from '@/services/firebase/crud/getDocument'
import { getDoc } from 'firebase/firestore'
import React from 'react'

const view = ({ data }) => {
  return (
    <Container>
      <PageHeading title="View Skill">
      </PageHeading>
      <DetailSkill {...data} />
    </Container>
  )
}

export default view
export const getServerSideProps = async ({ params }) => {
  const {result:data} = await getDocument("skills", params?.id)
  return { props: { data } }
}