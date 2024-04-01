import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <Container>
      <PageHeading title="Skill">
          <Link className='btn !px-2 !py-0' href="/skill/create"><i className='text-xl bx bx-list-plus'></i> Create</Link>
      </PageHeading>
    </Container>
  )
}

export default index