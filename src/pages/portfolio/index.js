import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import PortfolioTable from '@/components/views/portfolio/Table'
import WithProtected from '@/hoc/withProtected'
import getCollecction from '@/services/firebase/crud/getCollecction'
import Link from 'next/link'
import React from 'react'
import { SWRConfig } from 'swr'

const index = ({fallback}) => {

  return (
    <SWRConfig value={{ fallback }}>
      <Container>
        <PageHeading title="Portfolio">
          <Link className='btn !px-2 !py-0' href="/portfolio/create"><i className='text-xl bx bx-list-plus'></i> Create</Link>
        </PageHeading>
        <PortfolioTable />
      </Container>
    </SWRConfig>
  )
}

export default WithProtected(index);
export const getServerSideProps = async () => {

  const { result } = await getCollecction("portfolio");
    return {
    props: {
      fallback: {
        '/api/portfolio': result
      }
    }
  }
};
