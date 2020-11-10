// select elements
const input = document.querySelector(".inputItem");
const add = document.getElementById("add");
const list = document.querySelector('.todo-list');
const clear = document.getElementById('clear');

let LIST;
let id; 

//Add todo
const addToDo = (toDo, done, id) => {
    const LINE = done ? `class="completed"`: '';
    const CHECK = done ? `checked=""` : '';
    const item = `<li ${LINE}>
                    <div class="actions">
                      <label class="form-check-label">
                        <input class="checkbox" type="checkbox" job="check" ${CHECK} id="${id}"> ${toDo}
                        <i class="input-helper"></i>
                      </label>
                    </div>
                    <i class="remove fas fa-times" job="delete" id="${id}"></i>
                 </li>`;
   const position = 'afterBegin';
   list.insertAdjacentHTML(position, item);
   input.value = '';
};

const loadData = () => {
  for(item of LIST){
    addToDo(item.name, item.done, item.id);
  }
};

const data = localStorage.getItem('TODO');
if (data) { 
 LIST = JSON.parse(data);
 id = LIST.length;
 loadData();
}else { 
 LIST = [];
 id = 0; 
}
    
const validate = () => {
 const todo = input.value;
 if(todo === ''){
   alert('Enter a value');
   return; 
 }
  
 LIST.push({name: todo, id: id, done: false});
 localStorage.setItem('TODO', JSON.stringify(LIST));
 addToDo(todo, false, id);
 id++;
};

//Event Listeners
document.addEventListener('keydown', function(event){
  if(event.keyCode === 13) {
   validate();
  }
});

 add.addEventListener('click', function (){
   validate();
 });

 clear.addEventListener('click', function (){
   localStorage.clear();
   location.reload();
 });

 list.addEventListener('click', function (event) {
   const element = event.target;
   const elementJob = element.attributes.job.value;

  if (elementJob === 'check') {
    completeToDo(element);
  } else if(elementJob === 'delete'){
    removeToDo(element);
  } 

   localStorage.setItem('TODO', JSON.stringify(LIST));
 });

//Complete to do
const completeToDo = (element) => {
 element.parentNode.parentNode.parentNode.classList.toggle('completed');
 LIST[element.id].done = LIST[element.id].done ? false : true;
};

//Remove to do
const removeToDo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST.splice(element.id, 1);
};