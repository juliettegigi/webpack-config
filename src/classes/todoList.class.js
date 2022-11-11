import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
       this.cargarLocalStorage();
    }
    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }
    eliminarTodo(id){
       this.todos=this.todos.filter(todo=>todo.id!=id);
        console.log(id);
        console.log("----------------------------");
        for(let todo of this.todos)
          console.log(todo);
          console.log("----------------------------");
        this.guardarLocalStorage();
    }
    marcarCompletado(id){
       for(const todo of this.todos){
        if(todo.id==id){
           todo.completado=!todo.completado;
           break;
        }
       }
       this.guardarLocalStorage();
    }
    eliminarCompletados(){
        this.todos=this.todos.filter(todo=>!todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
           localStorage.setItem("todo",JSON.stringify(this.todos));
    }
   
    cargarLocalStorage(){
        this.todos=(localStorage.getItem('todo'))?
            JSON.parse(localStorage.getItem('todo'))://localStorage.getItem('todo') eso es unn string
            [];
        //hasta acá mi arreglo es de Object y quiero q sea de Todo    
        //this.todos=this.todos.map(obj=>Todo.fromJson(obj));// el map es unn método de todos los arreglos y retorna un arreglo con cada uno de sus elementos mutados    
        this.todos=this.todos.map(Todo.fromJson);                                
    }
    
}