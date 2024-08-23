import { useState, useEffect } from 'react'
import axios from 'axios'
import People from './components/People'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import Error from './components/Error'

const baseUrl = "/api/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState(null)
  const [newName, setNewName] = useState('')
  const [searchName, setSearchName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const alreadyExists = () => {
    let id = null
    persons.forEach((person, i) => {
      if (person.name === newName) {
        id = person._id
      }
    })

    return id
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    let duplicated = alreadyExists()

    if (duplicated) {
      axios.put(`${baseUrl}/${duplicated}`, nameObject)
      .then((result) => {
        setPersons(persons.toSpliced(duplicated, 1, result.data))
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
    } else {
      let request = axios.post(baseUrl, nameObject)
      request.then((response) => {
        setPersons(persons.concat(response.data))
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
    }
  }

  const handleDelete = id => {
    axios.delete(`${baseUrl}/${id}`)
    .then((response) => {
      let deletePersonIdx = persons.findIndex((person) => person._id === id)
      let newPersons = persons.toSpliced(deletePersonIdx, 1)
      setPersons(newPersons)
    })
    .catch(error => {
      setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    let updatedSearchName = event.target.value
    setSearchName(updatedSearchName)
    if (updatedSearchName === "") {
      setFilteredPersons([])
    } else {
      let filtered = persons.filter(person => person.name.includes(updatedSearchName))
      setFilteredPersons(filtered)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>
      <Error message={errorMessage}/>
      <People people={filteredPersons} handleDelete={handleDelete}/>
      
      <h2>Add a new</h2>

      <AddPerson name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={addPerson}/>
      
      <h2>Numbers</h2>
      <People people={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
