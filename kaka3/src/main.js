new Vue({
    el: '#app',
    data: {
        plannedTasks: [],
        inProgressTasks: [],
        testingTasks: [],
        completedTasks: [],
        newTaskTitle: '',
        newTaskDescription: '',
        newTaskDeadline: '',
        editingTask: null,
        editedTask: { title: '', description: '', deadline: '' }
    },
    methods: {
        editTaskForm(column, index) {
            this.editingTask = { column, index };
            let task;
            if (column === 'planned') {
                task = this.plannedTasks[index];
            } else if (column === 'inProgress') {
                task = this.inProgressTasks[index];
            } else if (column === 'testing') {
                task = this.testingTasks[index];
            } else if (column === 'completed') {
                task = this.completedTasks[index];
            }
            this.editedTask = {
                title: task.title,
                description: task.description,
                deadline: task.deadline
            };
        },

        saveEditedTask() {
            if (this.editingTask !== null) {
                let task;
                const { column, index } = this.editingTask;
                if (column === 'planned') {
                    task = this.plannedTasks[index];
                } else if (column === 'inProgress') {
                    task = this.inProgressTasks[index];
                } else if (column === 'testing') {
                    task = this.testingTasks[index];
                } else if (column === 'completed') {
                    task = this.completedTasks[index];
                }

                task.title = this.editedTask.title;
                task.description = this.editedTask.description;
                task.deadline = this.editedTask.deadline;
                task.lastEdited = new Date().toLocaleString();
            }
            this.editingTask = null;
        },


        cancelEditTask() {
            this.editingTask = null;
        },

        addTask(column) {
            if (this.newTaskTitle.trim() === '') return;
            const task = {
                title: this.newTaskTitle,
                description: this.newTaskDescription,
                created: new Date().toLocaleString(),
                deadline: this.newTaskDeadline,
                lastEdited: new Date().toLocaleString()
            };
            if (column === 'planned') {
                this.plannedTasks.push(task);
            }
            this.clearForm();
        },
        deleteTask(column, index) {
            if (column === 'planned') {
                this.plannedTasks.splice(index, 1);
            } else if (column === 'inProgress') {
                this.inProgressTasks.splice(index, 1);
            } else if (column === 'testing') {
                this.testingTasks.splice(index, 1);
            } else if (column === 'completed') {
                this.completedTasks.splice(index, 1);
            }
        },
        moveTask(task) {
            const index = this.plannedTasks.indexOf(task);
            if (index !== -1) {
                this.plannedTasks.splice(index, 1);
                this.inProgressTasks.push(task);
                return;
            }

            const index1 = this.inProgressTasks.indexOf(task);
            if (index1 !== -1) {
                this.inProgressTasks.splice(index1, 1);
                this.testingTasks.push(task);
                return;
            }

            const index2 = this.testingTasks.indexOf(task);
            if (index2 !== -1) {
                this.testingTasks.splice(index2, 1);
                const currentDate = new Date();
                const taskDeadline = new Date(task.deadline);
                task.deadlineNoPassed = currentDate > taskDeadline;
                this.completedTasks.push(task);
                return;
            }
        },

        removeTask(task) {
            const index4 = this.completedTasks.indexOf(task);
            if (index4 !== -1) {
                this.completedTasks.splice(index4, 1);
                this.testingTasks.push(task);
                return;
            }
            const index3 = this.testingTasks.indexOf(task);
            if (index3 !== -1 && task.returnReason) {
                this.testingTasks.splice(index3, 1);
                this.inProgressTasks.push(task);
                return;
            }
        },

        clearForm() {
            this.newTaskTitle = '';
            this.newTaskDescription = '';
            this.newTaskDeadline = '';
        },
        onDragStart(task, index) {
            this.isDragging = true;
            event.dataTransfer.setData('text/plain', index);
            event.dataTransfer.effectAllowed = 'move';
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(column) {
            event.preventDefault();
            const index = event.dataTransfer.getData('text/plain');
            const task = this.plannedTasks[index];
            const task1 = this.inProgressTasks[index];
            const task2 = this.testingTasks[index];
            const task3 = this.completedTasks[index];

            // Проверяем, что карточка не перемещается в текущий столбец
            if (column !== 'planned') {
                this.moveTask(task, column);
            }
            if (column !== 'inProgress') {
                this.moveTask(task1, column);
            }
            if (column !== 'testing') {
                this.moveTask(task2, column);
            }
            if (column !== 'completed') {
                this.moveTask(task3, column);
            }},

        onDragStart(task, index) {
            this.isDragging = true;
            event.dataTransfer.setData('text/plain', index);
            event.dataTransfer.effectAllowed = 'move';

            // Добавление класса dragging к элементу, который перетаскиваем
            event.target.classList.add('dragging');
        },
        onDragEnd() {
            this.isDragging = false;

            // Удаление класса dragging у всех элементов .task-card
            const cards = document.querySelectorAll('.task-card');
            cards.forEach(card => {
                card.classList.remove('dragging');
            });
        },

    }
});

