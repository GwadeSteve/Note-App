import React from 'react'
import DateComponent from './DateComponent'
import { Link } from 'react-router-dom'

const ListItem = ({note}) => {
  return (
      <div className="Note">
          <Link to={`/notes/${note.id}`}>
          <DateComponent date={note?.updated_at}/>
          <h3>{note?.title}</h3>
          <p>{note?.content}</p>
        </Link>
      </div>
  )
}

export default ListItem
