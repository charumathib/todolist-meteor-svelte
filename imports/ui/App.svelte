<script>
  import { TasksCollection } from '../db/TasksCollection';
  import { Meteor } from 'meteor/meteor';
  import Task from './Task.svelte';
  import TaskForm from './TaskForm.svelte';

  let hideCompleted = false;
  const hideCompletedFilter = { isChecked: { $ne: true } };


  let incompleteCount;
  let pendingTasksTitle = '';
  let tasks = [];
  let isLoading = true;

  // subscribe to task database in Mongo
  const handler = Meteor.subscribe('tasks');
  $m: {

    isLoading = !handler.ready();

    // once the handler is ready get tasks from the database with no filters or a completed filter
    tasks = TasksCollection.find(
        hideCompleted ? hideCompletedFilter : {},
            // sort by creation time
            { sort: { createdAt: -1 } }
        ).fetch();

    // count the number of pending tasks
    incompleteCount = TasksCollection.find(hideCompletedFilter).count();

    pendingTasksTitle = `${
        incompleteCount ? ` (${incompleteCount})` : ''
    }`;
  }

  // setter function on hideCompleted
  const setHideCompleted = value => {
    hideCompleted = value;
  };

</script>

<div class="app">
  <header>
    <div class="app-bar">
      <div class="app-header">
        <h1>📝️ To Do List {pendingTasksTitle}</h1>
      </div>
    </div>
  </header>
  <div class="main">
    <!-- task input component -->
    <TaskForm />
    <!-- filter button -->
    <div class="filter">
      <button on:click={() => setHideCompleted(!hideCompleted)}>
        {hideCompleted ? 'Show All' : 'Hide Completed'}
      </button>
    </div>

    <!-- if tasks are still being fetched, print a loading message -->
    {#if isLoading}
      <div class="loading">loading...</div>
    {/if}

    <!-- display all tasks using Svelte's for each syntax -->
    <ul class="tasks">
      {#each tasks as task (task._id)}
        <Task {task} />
      {/each}
    </ul>
  </div>
</div>
