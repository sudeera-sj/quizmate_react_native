import Realm from 'realm';
import realmConfig from './config';

export default async function openRealmAsync(): Promise<ProgressPromise> {
  return Realm.open(realmConfig);
}
