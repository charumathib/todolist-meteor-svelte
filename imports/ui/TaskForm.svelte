<script>
    let newTask = '';

    // if a new task has been inputted (value is bound to the input form) call the insert API function
    const handleSubmit = () => {
      if (!newTask) return;

      Meteor.call('tasks.insert', newTask);

      // clear form
      newTask = '';
    }
</script>

<!-- form where users can type new tasks -->
<form class="task-form" on:submit|preventDefault={handleSubmit}>
    <input
            type="text"
            name="text"
            placeholder="Type to add new tasks"
            bind:value={newTask}
    />
    <button type="submit">Add Task</button>
</form>
