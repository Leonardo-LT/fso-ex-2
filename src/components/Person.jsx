import DeletePersonButton from "./DeletePersonButton"

const Person = ({person, handleDelete}) => {
    return (
        <>
            <p>{person.name} {person.number}</p>
            <DeletePersonButton handleDelete={handleDelete} id={person._id}/>
        </>
    )
}

export default Person