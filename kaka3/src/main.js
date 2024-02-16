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
        editedTask: { title: '', description: '', deadline: '' } // Объект для временного хранения отредактированных данных
    },
    methods: {
        editTaskForm(index) {
            this.editingTask = index;
            const task = this.plannedTasks[index] || this.inProgressTasks[index] || this.testingTasks[index];
            this.editedTask = {
                title: task.title,
                description: task.description,
                deadline: task.deadline
            };
        },

        saveEditedTask() {
            let task;
            if (this.editingTask !== null) {
                if (this.editingTask < this.plannedTasks.length) {
                    task = this.plannedTasks[this.editingTask];
                } else if (this.editingTask < this.plannedTasks.length + this.inProgressTasks.length) {
                    task = this.inProgressTasks[this.editingTask - this.plannedTasks.length];
                } else if (this.editingTask < this.plannedTasks.length + this.inProgressTasks.length + this.testingTasks.length) {
                    task = this.testingTasks[this.editingTask - this.plannedTasks.length - this.inProgressTasks.length];
                } else {
                    task = this.completedTasks[this.editingTask - this.plannedTasks.length - this.inProgressTasks.length - this.testingTasks.length];
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

    }
});
