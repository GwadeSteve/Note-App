import React from 'react'
import DateComponent from './DateComponent'

const ListItem = ({note}) => {
  return (
    <div>
      <>
        <DateComponent date={note.updated_at}/>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </>
    </div>
  )
}

export default ListItem
