const DeletePersonButton = ({handleDelete, id}) => {
    const onDelete = () => {
        handleDelete(id)
    }
    
    return (
        <button onClick={onDelete}>
            Delete
        </button>
    )
}

export default DeletePersonButton