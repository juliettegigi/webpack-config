import { listaTodo } from "..";
import {Todo} from "../classes"

////////////////////////////////////////////////////referencias html
const padreLi=document.querySelector(".todo-list");
const input1=document.querySelector(".new-todo");
const ulFiltros=document.querySelector(".filters");
///////////////////////////////////////////////////
export const crearTodoHtml=(todo)=>{
    const nuevoLi=`<li class="${todo.completado?"completed":""}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.completado?"checked":""}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>`;
   
const divLi=document.createElement("div");
divLi.innerHTML=nuevoLi;
padreLi.append(divLi.firstElementChild);
return divLi.firstElementChild;
}


///////////////////////////////////////////////eventos
input1.addEventListener("keyup",(event)=>{
    
      if(event.keyCode===13 && input1.value[0]!=" "){        
        const nuevoTodo=new Todo(input1.value);
        crearTodoHtml(nuevoTodo);
        
        input1.value="";
        listaTodo.nuevoTodo(nuevoTodo);
      }
})


//////////////////////////////////////////////

padreLi.addEventListener('click',(event)=>{
   
  
    const nombreElemento=event.target.localName;// el label,input o button
    const todoElemento=event.target.parentElement.parentElement;
    const todoId=todoElemento.getAttribute("data-id");
    console.log("id antes de eliminnar");   
    console.log(todoId);
    if(nombreElemento.includes("input")){
        listaTodo.marcarCompletado(todoId);//
        todoElemento.classList.toggle("completed");
    } else if(nombreElemento.includes("button")){
        listaTodo.eliminarTodo(todoId);
      
        padreLi.removeChild(todoElemento);
        
    }
})

//////////////////////////////////////////////
const btnEliminarComp=document.querySelector(".clear-completed");

btnEliminarComp.addEventListener("click",()=>{
    
    listaTodo.eliminarCompletados();
    for (let i=padreLi.children.length-1;i>=0;i--){
        const elemento=padreLi.children[i];
        if(elemento.classList.contains('completed')){
            padreLi.removeChild(elemento);
        }
    }
    
})

ulFiltros.addEventListener("click",(event)=>{
  console.log(event.target.text);
  const a=event.target.text;//esto retorna Todos,Completados,Pendientes undefined
  if(!a) // cuando es undefined retorna false
      return;

   for(const li of padreLi.children){ //recorremos cada li de la forma<li class='completes' data-id="123">
        li.classList.remove('hidden');
        const completado=li.classList.contains('completed');
        switch(a){
            case "Pendientes": 
                     if(completado)
                        li.classList.add('hidden');
                    //li.classList.add('selected');    
                    break;
            case "Completados":
                if(!completado)
                   li.classList.add('hidden');            
        }

        const anchorfiltros=document.querySelectorAll(".filtro");
        anchorfiltros.forEach(elem=>elem.classList.remove('selected'));// le saco a todos los <a> el selected
        event.target.classList.add("selected");// event. target hace referencia al <a> q clickeo
   }
}
);