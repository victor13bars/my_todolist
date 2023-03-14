import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../store/todolists-reducer";
import {tasksReducer} from "../../store/tasks-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: v1(),addedDate:'18.02.2023',title:"New TODO",order:10,filter:"all"},
        {id: v1(), addedDate:'18.02.2023',title:"New TODO-2",order:10,filter:"all"}
    ],
    tasks: {
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
}
type initialGlobalStateType = typeof initialGlobalState
export const storyBookStore = createStore(rootReducer, initialGlobalState as any)



export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}