const Filter = ({ searchName, handleSearchChange}) => {
    return (
        <div>
            Search: <input value={searchName} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter