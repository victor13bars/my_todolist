
import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from "./tasks-reducer";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                todoListId: "todolistId1",
                title: 'React',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            },
            {
                id: '2',
                todoListId: "todolistId1",
                title: 'CSS',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            },
            {
                id: '3',
                todoListId: "todolistId1",
                title: 'JS',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                todoListId: "todolistId2",
                title: 'React',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            },
            {
                id: '2',
                todoListId: "todolistId2",
                title: 'CSS',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            },
            {
                id: '3',
                todoListId: "todolistId2",
                title: 'JS',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(2)
})

test('correct task should be added to correct array', () => {
    const newTask =  {
            id: '4',
            todoListId: "todolistId2",
            title: 'React',
            description: 'Viktor',
            status: 0,
            priority: 3,
            startDate: '10.02.2022',
            deadline: 'tomorrow',
            order: 9,
            addedDate: ''
        }
    const action = addTaskAC(newTask)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    // expect(endState['todolistId2'][4].id).toBeDefined()
    expect(endState['todolistId2'][0].description).toBe('Viktor')
    expect(endState['todolistId2'][0].priority).toBe(3)
})

test('title of task should be changed', () => {

    const action = updateTaskAC(
        '2',
        { title:'for me',description: 'it is true'},
        'todolistId2'
    )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('for me')
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                todoListId: "todolistId1",
                title: 'React',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            },
            {
                id: '2',
                todoListId: "todolistId1",
                title: 'CSS',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            },
            {
                id: '3',
                todoListId: "todolistId1",
                title: 'JS',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                todoListId: "todolistId2",
                title: 'React',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            },
            {
                id: '2',
                todoListId: "todolistId2",
                title: 'for me',
                description: 'it is true',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            },
            {
                id: '3',
                todoListId: "todolistId2",
                title: 'JS',
                description: 'some task',
                status: 0,
                priority: 1,
                startDate: '10.02.2022',
                deadline: 'tomorrow',
                order: 9,
                addedDate: ''
            }
        ]
    })
})


