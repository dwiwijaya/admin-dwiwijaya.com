import { Table } from 'flowbite-react'
import React from 'react'

const DetailSkill = ({ id, name, icon, type, order }) => {
  return (
    <div className='card'>
      <Table hoverable>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 max-w-[30%]">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              ID
            </Table.Cell>
            <Table.Cell>{id}</Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Name
            </Table.Cell>
            <Table.Cell className='flex gap-2 items-center'> <i
              className="text-xl"
              dangerouslySetInnerHTML={{ __html: icon }}
            /> {name}</Table.Cell>

          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Type</Table.Cell>
            <Table.Cell>{type}</Table.Cell>

          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Order</Table.Cell>
            <Table.Cell>
              {order}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default DetailSkill