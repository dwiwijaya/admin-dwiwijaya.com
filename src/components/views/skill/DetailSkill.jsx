import React from 'react'

const DetailSkill = ({id,name,icon,type}) => {
  return (
    <div className='card'>
      {id} {name} {icon} {type}
    </div>
  )
}

export default DetailSkill