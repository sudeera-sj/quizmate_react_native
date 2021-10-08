import Realm from 'realm';
import realmConfig from '../../../src/database/config';
import TaskDao from '../../../src/database/dao/task-dao';
import Task from '../../../src/models/Task';

describe('Task DAO Test', () => {
  // @ts-ignore
  const config: Realm.Configuration = {...realmConfig, inMemory: true};

  const sampleTask: Task = {
    id: 1,
    name: 'Go grocery shopping',
    status: 'Open',
  };

  test('Save Task test', async () => {
    const realm = await Realm.open(config);
    const dao: TaskDao = new TaskDao(realm);

    expect(dao.getTaskById(1)).toBeFalsy();
    dao.saveTask(sampleTask);
    expect(dao.getTaskById(1)).toBeTruthy();

    realm.write(() => {
      realm.deleteAll();
    });

    realm.close();
  });

  test('Update Task test', async () => {
    const realm = await Realm.open(config);
    const dao: TaskDao = new TaskDao(realm);

    dao.saveTask(sampleTask);

    dao.updateTask({...sampleTask, id: 2, name: 'Clean the room'});
    expect(dao.getTaskById(1)!!.name).toBe('Go grocery shopping');

    dao.updateTask({...sampleTask, id: 1, name: 'Clean the room'});
    expect(dao.getTaskById(1)!!.name).toBe('Clean the room');

    realm.write(() => {
      realm.deleteAll();
    });

    realm.close();
  });

  test('Delete Task test', async () => {
    const realm = await Realm.open(config);
    const dao: TaskDao = new TaskDao(realm);

    dao.saveTask(sampleTask);
    expect(dao.getTaskById(1)).toBeTruthy();
    dao.deleteTask(1);
    expect(dao.getTaskById(1)).toBeFalsy();

    realm.write(() => {
      realm.deleteAll();
    });

    realm.close();
  });

  test('Get Task by ID test', async () => {
    const realm = await Realm.open(config);
    const dao: TaskDao = new TaskDao(realm);

    dao.saveTask(sampleTask);
    expect(dao.getTaskById(1)).toBeTruthy();
    expect(dao.getTaskById(2)).toBeFalsy();

    realm.write(() => {
      realm.deleteAll();
    });

    realm.close();
  });

  test('Get all Tasks test', async () => {
    const realm = await Realm.open(config);
    const dao: TaskDao = new TaskDao(realm);

    dao.saveTask(sampleTask);
    expect(dao.getAllTasks().length).toBe(1);

    dao.saveTask({...sampleTask, id: 2, name: 'Clean the room'});
    expect(dao.getAllTasks().length).toBe(2);

    realm.write(() => {
      realm.deleteAll();
    });

    realm.close();
  });
});
