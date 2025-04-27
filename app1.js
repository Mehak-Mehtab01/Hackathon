// import { 
//     initializeApp 
//   } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  
//   import { 
//     getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc 
//   } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
  
//   // Firebase config 🔥
//   const firebaseConfig = {
//     apiKey: "AIzaSyDUQg49r7OnycwvbA_Px77ZAWYsYRnpD3c",
//     authDomain: "practice-7c36e.firebaseapp.com",
//     projectId: "practice-7c36e",
//     storageBucket: "practice-7c36e",
//     messagingSenderId: "121704920161",
//     appId: "1:121704920161:web:7f07782d40d96c1cfca620",
//     measurementId: "G-KQ2J7HQPHN"
//   };
  
//   // Initialize Firebase 🚀
//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore(app);
  
//   // DOM Elements
//   const createTaskBtn = document.getElementById('create-task-btn');
//   const taskModal = document.getElementById('task-modal');
//   const closeModalBtn = document.getElementById('close-modal-btn');
//   const saveTaskBtn = document.getElementById('save-task-btn');
//   const todoColumn = document.getElementById('todo-tasks');
//   const inProgressColumn = document.getElementById('in-progress-tasks');
//   const doneColumn = document.getElementById('done-tasks');
  
//   let currentEditId = null; // Track if we're editing
  
  
//   // Open modal for creating task
//   createTaskBtn.addEventListener('click', () => {
//     currentEditId = null;
//     clearModalInputs();
//     taskModal.style.display = 'flex';
//   });
  
//   // Close modal
//   closeModalBtn.addEventListener('click', () => {
//     taskModal.style.display = 'none';
//   });
  
//   // Save task (Create or Update)
//   saveTaskBtn.addEventListener('click', async () => {
//     const title = document.getElementById('task-title').value.trim();
//     const description = document.getElementById('task-description').value.trim();
//     const assignedTo = document.getElementById('task-assigned').value.trim();
  
//     if (!title) {
//       alert('Task Title is required!');
//       return;
//     }
  
//     try {
//       if (currentEditId) {
//         // Update existing task
//         const taskRef = doc(db, "tasks", currentEditId);
//         await updateDoc(taskRef, {
//           title,
//           description,
//           assignedTo
//         });
//         console.log("Task updated:", currentEditId);
//       } else {
//         // Create new task
//         await addDoc(collection(db, "tasks"), {
//           title,
//           description,
//           assignedTo,
//           status: "To Do",
//         });
//         console.log("Task created.");
//       }
  
//       taskModal.style.display = 'none';
//       loadTasks();
//     } catch (e) {
//       console.error("Error saving task: ", e);
//     }
//   });
  
//   // Load all tasks
//   async function loadTasks() {
//     const querySnapshot = await getDocs(collection(db, "tasks"));
//     todoColumn.innerHTML = '';
//     inProgressColumn.innerHTML = '';
//     doneColumn.innerHTML = '';
  
//     querySnapshot.forEach(docSnap => {
//       const task = docSnap.data();
//       const taskCard = createTaskCard(task, docSnap.id);
//       if (task.status === 'To Do') {
//         todoColumn.appendChild(taskCard);
//       } else if (task.status === 'In Progress') {
//         inProgressColumn.appendChild(taskCard);
//       } else {
//         doneColumn.appendChild(taskCard);
//       }
//     });
//   }
  
//   // Create task card
//   function createTaskCard(task, id) {
//     const card = document.createElement('div');
//     card.classList.add('task-card');
  
//     const title = document.createElement('h4');
//     title.textContent = task.title;
  
//     const description = document.createElement('p');
//     description.textContent = task.description;
  
//     const assigned = document.createElement('p');
//     assigned.textContent = `Assigned to: ${task.assignedTo}`;
  
//     const moveToInProgressBtn = document.createElement('button');
//     moveToInProgressBtn.textContent = 'Move to In Progress';
//     moveToInProgressBtn.addEventListener('click', () => moveTask(id, 'In Progress'));
  
//     const moveToDoneBtn = document.createElement('button');
//     moveToDoneBtn.textContent = 'Move to Done';
//     moveToDoneBtn.addEventListener('click', () => moveTask(id, 'Done'));
  
//     const editBtn = document.createElement('button');
//     editBtn.textContent = 'Edit';
//     editBtn.style.backgroundColor = '#f39c12';
//     editBtn.addEventListener('click', () => openEditModal(id, task));
  
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.style.backgroundColor = '#e74c3c';
//     deleteBtn.addEventListener('click', () => deleteTask(id));
  
//     card.appendChild(title);
//     card.appendChild(description);
//     card.appendChild(assigned);
//     card.appendChild(moveToInProgressBtn);
//     card.appendChild(moveToDoneBtn);
//     card.appendChild(editBtn);
//     card.appendChild(deleteBtn);
  
//     return card;
//   }
  
//   // Move task between columns
//   async function moveTask(id, newStatus) {
//     try {
//       const taskRef = doc(db, "tasks", id);
//       await updateDoc(taskRef, { status: newStatus });
//       loadTasks();
//     } catch (e) {
//       console.error("Error moving task: ", e);
//     }
//   }
  
//   // Delete task
//   async function deleteTask(id) {
//     if (confirm('Are you sure you want to delete this task?')) {
//       try {
//         await deleteDoc(doc(db, "tasks", id));
//         console.log("Task deleted:", id);
//         loadTasks();
//       } catch (e) {
//         console.error("Error deleting task: ", e);
//       }
//     }
//   }
  
//   // Open Edit Modal
//   function openEditModal(id, task) {
//     currentEditId = id;
//     document.getElementById('task-title').value = task.title;
//     document.getElementById('task-description').value = task.description;
//     document.getElementById('task-assigned').value = task.assignedTo;
//     taskModal.style.display = 'flex';
//   }
  
//   // Clear modal inputs
//   function clearModalInputs() {
//     document.getElementById('task-title').value = '';
//     document.getElementById('task-description').value = '';
//     document.getElementById('task-assigned').value = '';
//   }
  
//   // Initial load
//   loadTasks();
//   // Logout function
//   window.logout = function() {
//     signOut(auth)
//       .then(() => {
//         alert("Logout successful!");
//         window.location.href = "index.html"; // Redirect back to signup page after logout
//       })
//       .catch((error) => {
//         alert(error.message); // Show error message
//       });
//   } 

         



//   // Wait for the DOM to load
// document.addEventListener('DOMContentLoaded', function () {

//   // Get references to elements
//   const searchButton = document.getElementById('search-button');
//   const searchInput = document.getElementById('search-input');
//   const todoColumn = document.getElementById('todo-tasks');
//   const inProgressColumn = document.getElementById('in-progress-tasks');
//   const doneColumn = document.getElementById('done-tasks');

//   // Function to load tasks from Firebase (and you can call it after search)
//   async function loadTasks() {
//     const querySnapshot = await getDocs(collection(db, "tasks"));
//     todoColumn.innerHTML = '';  // Clear previous tasks
//     inProgressColumn.innerHTML = '';
//     doneColumn.innerHTML = '';

//     querySnapshot.forEach(docSnap => {
//       const task = docSnap.data();
//       const taskCard = createTaskCard(task, docSnap.id); // Assuming you have a function to create task cards
//       if (task.status === 'To Do') {
//         todoColumn.appendChild(taskCard);
//       } else if (task.status === 'In Progress') {
//         inProgressColumn.appendChild(taskCard);
//       } else {
//         doneColumn.appendChild(taskCard);
//       }
//     });
//   }

//   // Add event listener to the search button
//   searchButton.addEventListener('click', async function() {
//     const searchTerm = searchInput.value.trim().toLowerCase();  // Get the search term

//     // If search term is empty, reload all tasks
//     if (!searchTerm) {
//       loadTasks();  // Load all tasks again if search input is empty
//       return;
//     }

//     // Clear current tasks in the columns
//     todoColumn.innerHTML = '';
//     inProgressColumn.innerHTML = '';
//     doneColumn.innerHTML = '';

//     // Filter tasks based on the search term (case-insensitive)
//     const querySnapshot = await getDocs(collection(db, "tasks"));

//     querySnapshot.forEach(docSnap => {
//       const task = docSnap.data();
//       const taskId = docSnap.id;
//       const taskTitle = task.title.toLowerCase();
//       const taskDescription = task.description.toLowerCase();

//       // If the task title or description includes the search term
//       if (taskTitle.includes(searchTerm) || taskDescription.includes(searchTerm)) {
//         const taskCard = createTaskCard(task, taskId);  // Create task card
//         if (task.status === 'To Do') {
//           todoColumn.appendChild(taskCard);
//         } else if (task.status === 'In Progress') {
//           inProgressColumn.appendChild(taskCard);
//         } else {
//           doneColumn.appendChild(taskCard);
//         }
//       }
//     });
//   });
// });
    



































import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import { 
  getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase config 🔥
const firebaseConfig = {
  apiKey: "AIzaSyDUQg49r7OnycwvbA_Px77ZAWYsYRnpD3c",
  authDomain: "practice-7c36e.firebaseapp.com",
  projectId: "practice-7c36e",
  storageBucket: "practice-7c36e",
  messagingSenderId: "121704920161",
  appId: "1:121704920161:web:7f07782d40d96c1cfca620",
  measurementId: "G-KQ2J7HQPHN"
};

// Initialize Firebase 🚀
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const createTaskBtn = document.getElementById('create-task-btn');
const taskModal = document.getElementById('task-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const saveTaskBtn = document.getElementById('save-task-btn');
const todoColumn = document.getElementById('todo-tasks');
const inProgressColumn = document.getElementById('in-progress-tasks');
const doneColumn = document.getElementById('done-tasks');

let currentEditId = null; // Track if we're editing

// Open modal for creating task
createTaskBtn.addEventListener('click', () => {
  currentEditId = null;
  clearModalInputs();
  taskModal.style.display = 'flex';
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  taskModal.style.display = 'none';
});

// Save task (Create or Update)
saveTaskBtn.addEventListener('click', async () => {
  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();
  const assignedTo = document.getElementById('task-assigned').value.trim();
  const priority = document.getElementById('task-priority').value; // Get selected priority

  if (!title) {
      alert('Task Title is required!');
      return;
  }

  try {
      if (currentEditId) {
          // Update existing task
          const taskRef = doc(db, "tasks", currentEditId);
          await updateDoc(taskRef, {
              title,
              description,
              assignedTo,
              priority
          });
          console.log("Task updated:", currentEditId);
      } else {
          // Create new task
          await addDoc(collection(db, "tasks"), {
              title,
              description,
              assignedTo,
              priority,
              status: "To Do",
          });
          console.log("Task created.");
      }

      taskModal.style.display = 'none';
      loadTasks();
  } catch (e) {
      console.error("Error saving task: ", e);
  }
});

// Load all tasks
async function loadTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  todoColumn.innerHTML = '';
  inProgressColumn.innerHTML = '';
  doneColumn.innerHTML = '';

  querySnapshot.forEach(docSnap => {
      const task = docSnap.data();
      const taskCard = createTaskCard(task, docSnap.id);
      if (task.status === 'To Do') {
          todoColumn.appendChild(taskCard);
      } else if (task.status === 'In Progress') {
          inProgressColumn.appendChild(taskCard);
      } else {
          doneColumn.appendChild(taskCard);
      }
  });
}

// Create task card
function createTaskCard(task, id) {
  const card = document.createElement('div');
  card.classList.add('task-card');

  const title = document.createElement('h4');
  title.textContent = task.title;

  const description = document.createElement('p');
  description.textContent = task.description;

  const assigned = document.createElement('p');
  assigned.textContent = `Assigned to: ${task.assignedTo}`;

  const priority = document.createElement('p');
  priority.textContent = `Priority: ${task.priority}`;

  const moveToInProgressBtn = document.createElement('button');
  moveToInProgressBtn.textContent = 'Move to In Progress';
  moveToInProgressBtn.addEventListener('click', () => moveTask(id, 'In Progress'));

  const moveToDoneBtn = document.createElement('button');
  moveToDoneBtn.textContent = 'Move to Done';
  moveToDoneBtn.addEventListener('click', () => moveTask(id, 'Done'));

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.style.backgroundColor = '#f39c12';
  editBtn.addEventListener('click', () => openEditModal(id, task));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.style.backgroundColor = '#e74c3c';
  deleteBtn.addEventListener('click', () => deleteTask(id));

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(assigned);
  card.appendChild(priority);
  card.appendChild(moveToInProgressBtn);
  card.appendChild(moveToDoneBtn);
  card.appendChild(editBtn);
  card.appendChild(deleteBtn);

  return card;
}

// Move task between columns
async function moveTask(id, newStatus) {
  try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, { status: newStatus });
      loadTasks();
  } catch (e) {
      console.error("Error moving task: ", e);
  }
}

// Delete task
async function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
      try {
          await deleteDoc(doc(db, "tasks", id));
          console.log("Task deleted:", id);
          loadTasks();
      } catch (e) {
          console.error("Error deleting task: ", e);
      }
  }
}

// Open Edit Modal
function openEditModal(id, task) {
  currentEditId = id;
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-description').value = task.description;
  document.getElementById('task-assigned').value = task.assignedTo;
  document.getElementById('task-priority').value = task.priority; // Set the priority
  taskModal.style.display = 'flex';
}

// Clear modal inputs
function clearModalInputs() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-assigned').value = '';
  document.getElementById('task-priority').value = ''; // Clear priority
}

// Search functionality
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

// Add event listener to the search button
searchButton.addEventListener('click', async function() {
  const searchTerm = searchInput.value.trim().toLowerCase();  // Get the search term

  // If search term is empty, reload all tasks
  if (!searchTerm) {
      loadTasks();  // Load all tasks again if search input is empty
      return;
  }

  // Clear current tasks in the columns
  todoColumn.innerHTML = '';
  inProgressColumn.innerHTML = '';
  doneColumn.innerHTML = '';

  // Filter tasks based on the search term (case-insensitive)
  const querySnapshot = await getDocs(collection(db, "tasks"));

  querySnapshot.forEach(docSnap => {
      const task = docSnap.data();
      const taskId = docSnap.id;
      const taskTitle = task.title.toLowerCase();
      const taskDescription = task.description.toLowerCase();

      // If the task title or description includes the search term
      if (taskTitle.includes(searchTerm) || taskDescription.includes(searchTerm)) {
          const taskCard = createTaskCard(task, taskId);  // Create task card
          if (task.status === 'To Do') {
              todoColumn.appendChild(taskCard);
          } else if (task.status === 'In Progress') {
              inProgressColumn.appendChild(taskCard);
          } else {
              doneColumn.appendChild(taskCard);
          }
      }
  });
});

// Initial load
loadTasks();
