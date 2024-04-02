import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import WithProtected from '@/hoc/withProtected'
import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <Container>
      <PageHeading title="Certificate">
          <Link className='btn !px-2 !py-0' href="/certificate/create"><i className='text-xl bx bx-list-plus'></i> Create</Link>
      </PageHeading>
    </Container>
  )
}

export default WithProtected(index)