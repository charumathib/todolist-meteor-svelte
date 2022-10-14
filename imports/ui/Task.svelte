<!-- Svelte allows you to write JavaScript and HTML code -->
<script>
  export let task;

  // calls our internal setIsChecked API endpoint to toggle the checked state
  const toggleChecked = () =>
    Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);

  // calls our internal remove API endpoint to toggle the remove state
  const deleteThisTask = () => Meteor.call('tasks.remove', task._id);
</script>

<li>
    <input
            type="checkbox"
           readonly
           checked={!!task.isChecked}
           on:click={toggleChecked}
    />
    <span>{ task.text }</span>
    <button class="delete" on:click={deleteThisTask}>&times;</button>
</li>
