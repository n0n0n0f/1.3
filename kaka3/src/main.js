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
    methods: {}
});
