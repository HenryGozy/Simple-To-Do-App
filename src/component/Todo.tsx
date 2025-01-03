import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { nanoid } from "nanoid";
import TodoContent from "./TotoContent";

export default function TodoApp() {
    const [TodoList, setTodolist] = useState<{ task: string; completed: boolean, id: string }[]>([])
    const [clickedID, setClickId] = useState<string | null>(null)
    const [watchValue, setWatchValue] = useState<{ task: string; completed: boolean, id: string }>()
    const [wfu, setWfu] = useState<boolean>(false)
    const [updateValue, setUpdatedValue] = useState<string>("")
    const InputElement = useRef<HTMLInputElement>(null)
    function SubmitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (InputElement.current) {
            const inputTask = InputElement.current.value
            if (inputTask) {
                setTodolist(prev => [...prev, { task: inputTask, completed: false, id: nanoid() }])
                setClickId(null)
            }
            InputElement.current.value = ""
        }

    }
    function checkActive(ind: string) {
        setClickId(ind)
    }
    function removeTask(ind: string) {
        setTodolist(prev => prev.filter(item => item.id !== ind))
        setClickId(null)
    }

    function completedTask(value: string) {
        setTodolist(prev => prev.map(item => item.id === value ? { ...item, completed: !item.completed } : item))
    }
    const updvalue = useRef<HTMLInputElement>(null)

    function UpdateTask(e: FormEvent) {
        e.preventDefault()
        if(watchValue){
        setTodolist(prev => prev.map(item => item.id === watchValue.id ? { ...item, task: updateValue } : item))

        }

        if (updvalue.current)
            updvalue.current.value = ""
        setWfu(false)

    }

    function getValue(id: string) {
        const data = TodoList.find(item => item.id === id)
        setWatchValue(data)
        if (!wfu) {
            setWfu(true)
            setUpdatedValue(data.task)
        }

    }

    function change(e: ChangeEvent) {
        const data = e.target as HTMLInputElement
        setUpdatedValue(data.value)
    }

    const taskList = TodoList.map((todo) =>
        <TodoContent
            id={todo.id}
            task={todo.task}
            completed={todo.completed}
            clickedID={clickedID}
            checkActive={checkActive}
            removeTask={removeTask}
            completedTask={completedTask}
            getValue={getValue}
        />)

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const target = e.target as HTMLElement
            if (!target.closest(".tdot") && !target.closest(".edit")) {
                setClickId(null)
            }
        }


        document.addEventListener("click", handleClick)

        return () => {
            removeEventListener("click", handleClick)
        }
    }, [])

    return (
        <>
            <section className="Tcont">
                <div className="ToodHeader">
                    <h1>Todo App</h1>
                </div>
                <div className="Tsont">
                    <form action="" onSubmit={SubmitForm}>
                        <input type="text" placeholder="eg Sleep early today" name="task" ref={InputElement} />
                        <button type="submit">Add Task</button>
                    </form>
                    <div className="list-container">
                        <ul className="ulTAsk">
                            {taskList}
                        </ul>
                    </div>
                </div>
            </section>
            {wfu && <section className="fromDisplay">
                <form action="" onSubmit={UpdateTask} >
                    <button className="cancel"><i className="fa-solid fa-xmark"></i></button>
                    <div className="Anne">
                        <textarea name=""onChange={change} value={updateValue} id="updateTextArea"></textarea>
                        {/* <input type="text" placeholder="update" name="updateInput"/> */}
                        <button type="submit">
                            update
                        </button>
                    </div>
                </form>
            </section>}
        </>

    )
}