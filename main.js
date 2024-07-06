const tasksSectionButton = document.querySelector('.tasks__section__button');
const tasksList = document.querySelector('.tasks__list');

const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.modal__form');
const modalOverlay = document.querySelector('.modal__overlay');
const modalCloseButton= document.querySelector('.modal__close-icon');

const titleField = document.getElementById('title');
const descriptionField = document.getElementById('description');

async function getTasks() {
  await fetch('http://localhost:3000/tasks')
    .then(res => res.json())
    .then(res => createTask(res));
}

function createTask(tasks) {  
  if (tasks.length > 0) {
    tasksList.innerHTML = '';

    tasks.map(task => {
      tasksList.innerHTML += `
        <li class="task">
          <h5 class="task__title">${task.title}</h5>
          <p class="task__description">${task.description}</p>
          <i 
            class='task__delete-icon bx bx-trash'
            onclick="deleteTask('${task.id}')"
          ></i>
        </li>
      `;
    });
  } else {
    tasksList.innerHTML = `
      <span class="tasks__section__span">
        Nenhuma tarefa registrada
      </span>
    `;

  }
}

async function addTask() {
  event.preventDefault();
  
  let task = {
    title: titleField.value,
    description: descriptionField.value
  };

  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })

  await getTasks();
  closeModal();
}

async function deleteTask(id) {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE'
  });

  await getTasks();
}

function openModal() {
  modalOverlay.classList.add('active');
  modal.classList.add('active');
}

function closeModal() {
  modalOverlay.classList.remove('active');
  modal.classList.remove('active');
}

tasksSectionButton.addEventListener('click', () => openModal());
modalCloseButton.addEventListener('click', () => closeModal());
modalOverlay.addEventListener('click', () => closeModal());
modalForm.addEventListener('submit', () => addTask());

getTasks();
