import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import DetailPortfolio from '@/components/views/portfolio/DetailPortfolio'
import getDocument from '@/services/firebase/crud/getDocument'
import { getDoc } from 'firebase/firestore'
import React from 'react'

const view = ({ data }) => {
  return (
    <Container>
      <PageHeading title="View Portfolio">
      </PageHeading>
      <DetailPortfolio data={data} />
    </Container>
  )
}

export default view
export const getServerSideProps = async ({ params }) => {
  const {result:data} = await getDocument("portfolio", params?.id, true, 'thumbnail')
  return { props: { data } }
}