import { db } from '../service/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export const initGet = async (uid) => {
  const q = query(
    collection(db, 'todo'),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  );

  const snapShot = await getDocs(q);
  let todos = [];
  snapShot.forEach((doc) => {
    todos.push({
      id: doc.id,
      content: doc.data().content,
      isComplete: doc.data().isComplete,
    });
  });
  return todos;
};

export const addTodo = async (content, uid) => {
  try {
    await addDoc(collection(db, 'todo'), {
      content: content,
      uid: uid,
      isComplete: false,
      createdAt: new Date(),
    });
    console.log('Document successfully added!');
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const todoDelete = async (id) => {
  try {
    await deleteDoc(doc(db, 'todo', id));
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};


