type Prop ={
    id:string
    task:string
    completed:boolean
    clickedID:string| null
    checkActive:(ind:string) => void
    removeTask:(ind:string) => void
    completedTask:(value:string) => void
    getValue:(value:string) => void
}
export default function TodoContent({id,task,completed,checkActive,clickedID,removeTask,completedTask,getValue}:Prop){
    return(
        <>
        <li key={id} className="taskContent">{task}
                <p className={completed ? "statusComplete" : "statusPendig"}>{completed ? "completed" : "pending"}<i className="fa-regular fa-gem"></i></p>
                <button className="tdot" onClick={()=>checkActive(id)}>
                   <i className="fa-solid fa-ellipsis-vertical"></i>
                   </button>
           
                  { id === clickedID && <ul className="edit">
                       <li onClick={()=>removeTask(id)}>Remove</li>
                       <li onClick={()=>getValue(id)}>Edit</li>
                       <li onClick={()=> completedTask(id)}>
                        { !completed ? "completed" : "uncomplete"}
                        </li>
                   </ul> }
                   </li> 
        </>
    )
}