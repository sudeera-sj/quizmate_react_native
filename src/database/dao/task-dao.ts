import Realm from 'realm';
import Task from '../../models/Task';

export default class TaskDao {
  private readonly realm: Realm;

  constructor(realm: Realm) {
    this.realm = realm;
  }

  saveTask(task: Task) {
    this.realm.write(() => {
      this.realm.create<Task>('Task', task);
    });
  }

  updateTask(task: Task) {
    const tasks = this.realm.objects<Task>('Task');
    const taskResults = tasks.filtered(`id = ${task.id}`);

    taskResults.forEach(value => {
      this.realm.write(() => {
        value.name = task.name;
        value.status = task.status;
      });
    });
  }

  deleteTask(id: number) {
    const tasks = this.realm.objects<Task>('Task');
    const taskResults = tasks.filtered(`id = ${id}`);

    taskResults.forEach(value => {
      this.realm.write(() => {
        this.realm.delete(value);
      });
    });
  }

  getTaskById(id: number) {
    const tasks = this.realm.objects<Task>('Task');
    const taskResults = tasks.filtered(`id = ${id}`);

    return !taskResults.isEmpty() ? tasks[0] : null;
  }

  getAllTasks() {
    return this.realm.objects<Task>('Task').sorted('name');
  }
}
