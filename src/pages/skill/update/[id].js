import PageHeading from '@/components/common/PageHeading'
import Container from '@/components/layout/Container'
import SkillForm from '@/components/views/skill/SkillForm'
import getDocument from '@/services/firebase/crud/getDocument'
import React from 'react'

const update = ({data}) => {
    return (
        <Container>
            <PageHeading title="View Skill">
            </PageHeading>
            <SkillForm action="update" initialData={data}/>
        </Container>
    )
}

export default update
export const getServerSideProps = async ({ params }) => {
    const { result: data } = await getDocument("skills", params?.id)
    return { props: { data } }
}