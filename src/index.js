import './styles.css';
import {Todo,TodoList} from "./classes";// no pongo index porq esto ya busca el nombbre index por defecto
import {crearTodoHtml} from "./js/componentes";



export const listaTodo=new TodoList();


   listaTodo.todos.forEach(crearTodoHtml);
   for(let elemento of listaTodo.todos)
          console.log(elemento);

//todoList.todos.forEach(crearTodoHtml)// el 1er argumento del callback,, llama al crearTi con el el elemento del arr
// for(let todo of listaTodo.todos)
//    crearTodoHtml(todo);

/*


const tarea1=new Todo("aprender java");
export const listaTodo=new TodoList();
listaTodo.nuevoTodo(tarea1);
crearTodoHtml(tarea1);


////////session y local storage
 
localStorage.setItem("mi-key","abc123");//key string y valor q queremos guardar
sessionStorage.setItem("mi-key","123");

setTimeout(()=>{
  localStorage.removeItem("mi-key");
},1500);// esto dispara el callback en 1 segundo y medio



*/