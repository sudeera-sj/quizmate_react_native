import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  properties: {
    id: 'int',
    name: 'string',
    status: 'string?',
  },
  primaryKey: 'id',
};

const realmConfig: Realm.Configuration = {
  path: 'appDatabase',
  schema: [TaskSchema],
};

export default realmConfig;
