import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    // insert a new document with the task description text and created at date into TasksCollection
    TasksCollection.insert({
      text,
      createdAt: new Date(),
    });
  },

   // find and delete task from TasksCollection
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = TasksCollection.findOne({ _id: taskId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },

   // find and toggle check (via the $set call) for task in TasksCollection
  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    const task = TasksCollection.findOne({ _id: taskId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
