import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
const App = () => {
  const [inputTask, setInputTask] = useState('')
  const [dropDownTag, setDropDownTag] = useState('HEALTH')
  const [list, setList] = useState([])
  const [intList, setIntList] = useState([])
  const [filterValue, setFilerValue] = useState('')

  const changeEvent = e => {
    setInputTask(e.target.value)
  }

  const changeDropDown = e => {
    setDropDownTag(e.target.value)
  }

  const callAddTask = () => {
    const obj = {task: inputTask, optionSelected: dropDownTag, id: uuidv4()}
    setIntList(prevState => [...prevState, obj])
    setList(prevState => [...prevState, obj])
    setInputTask('')
    setDropDownTag('HEALTH')
  }

  const selectedFilter = passedId => {
    if (filterValue === passedId) {
      console.log('filter same', list)
      setList(intList)
    } else {
      const filteredArray = intList.filter(a => a.optionSelected === passedId)
      setFilerValue(passedId)
      setList(filteredArray)
      console.log('filter', filteredArray)
    }
  }

  return (
    <div>
      <div>
        <h1>Create a task!</h1>
        <form onSubmit={callAddTask}>
          <div>
            <label htmlFor="task">Task</label>
            <input
              id="task"
              placeholder="Enter the task here"
              value={inputTask}
              onChange={changeEvent}
            />
          </div>
          <div>
            <label htmlFor="tags">Tags</label>
            <select id="tags" value={dropDownTag} onChange={changeDropDown}>
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Add Task</button>
          </div>{' '}
        </form>
      </div>
      <div>
        <h1>Tags</h1>
        <div>
          <ul>
            {tagsList.map(eachButton => (
              <li key={eachButton.optionId}>
                <button
                  type="button"
                  key={eachButton.optionId}
                  onClick={() => selectedFilter(eachButton.optionId)}
                >
                  {eachButton.displayText}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <h1>Tasks</h1>
        {list.length ? (
          <ul>
            {list.map(eachTask => (
              <li key={eachTask.id}>
                <p>{eachTask.task}</p>
                <p>{eachTask.optionSelected}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Tasks Added Yet</p>
        )}
      </div>
    </div>
  )
}

export default App
