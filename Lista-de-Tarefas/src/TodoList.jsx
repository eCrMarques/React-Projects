import React, {useState, useEffect} from "react"
import './TodoList.css'

function TodoList(){
    const listaStorage = localStorage.getItem('lista')

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem]= useState("")

        useEffect(()=>{
            localStorage.setItem('lista', JSON.stringify(lista))
        },[lista])

    function adicionaItem(form){
        form.preventDefault();
        if (!novoItem){
            return;
        }else{
            setLista([...lista, {text: novoItem, isCompleted: false}])
            setNovoItem("")
            document.getElementById('input-entrada').focus();
        }
    }

    function adicionar(index){
        const listAux= [...lista];
        listAux[index].isCompleted= !listAux[index].isCompleted;
        setLista(listAux);
    }

    function deletar(index){
        console.log(index)
        if(index!='all'){
        const listAux=[...lista]
        listAux.splice(index,1)
        setLista(listAux);}
        else{
            setLista([])
        }

    }

    return (
        <div>
        <h1>Lista de Tarefas</h1>
        <form onSubmit={adicionaItem}>
            <input type="text"
            id="input-entrada"
            value={novoItem}
            onChange={(e)=>{setNovoItem(e.target.value)}}
            placeholder="Adicione uma tarefa" />
            <button className="Add" type="submit">Add</button>
        </form>
        <div className="listaTarefas">
            <div style={{textAlign:'center'}}>
                {
                    lista.length<1
                    ?
                    <img className="iconCentral" src='https://cdn-icons-png.flaticon.com/512/5541/5541963.png' />
                    :
                    lista.map((item,index)=>(
                        <div key={index} className={item.isCompleted? "item completo": "item"}>
                        <span style={{textAlign:"start"}}
                        onClick={()=>{adicionar(index)}}>{item.text}</span>
                        <button className="del"
                        onClick={()=>{deletar(index)}}
                        >Deletar</button>
                    </div> 
                    ))
                }
            </div>{          
            lista.length>0 &&
            <button onClick={()=>{deletar('all')}}
             className="delAll">Deletar Todos</button>
             }
        </div>
        </div>
    )
}

export default TodoList