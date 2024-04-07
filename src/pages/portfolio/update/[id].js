import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import PortfolioForm from '@/components/views/portfolio/PortfolioForm'
import getCollecction from '@/services/firebase/crud/getCollecction'
import getDocument from '@/services/firebase/crud/getDocument'
import React from 'react'

const update = ({ data, skills }) => {
    return (
        <Container>
            <PageHeading title="Update Portfolio">
            </PageHeading>
            <PortfolioForm action="update" initialData={data} skills={skills} />
        </Container>
    )
}

export default update
export const getServerSideProps = async ({ params }) => {
    const { result: data } = await getDocument("portfolio", params?.id)
    const { result: skills } = await getCollecction('skills');
    return { props: { data, skills } }
}