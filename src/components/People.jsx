import Person from "./Person"

const People = ({people, handleDelete}) => {
  return (
    <div>
      {people.map(person => <Person key={person._id} person={person} handleDelete={handleDelete}/>)}
    </div>
  )
}

export default People