// /src/utils/transactionUtils.js
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

//  Add Transaction to Wallet
export const addTransaction = async (uid, walletId, txnData) => {
  const txnRef = await addDoc(
    collection(db, 'users', uid, 'wallets', walletId, 'transactions'),
    {
      ...txnData,
      createdAt: serverTimestamp(),
    }
  );
  return txnRef.id;
};

//  Get All Transactions (sorted by latest)
export const getTransactions = async (uid, walletId) => {
  const txnRef = collection(db, 'users', uid, 'wallets', walletId, 'transactions');
  const q = query(txnRef, orderBy('createdAt', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

//  Get Single Transaction
export const getTransactionById = async (uid, walletId, txnId) => {
  const txnRef = doc(db, 'users', uid, 'wallets', walletId, 'transactions', txnId);
  const snapshot = await getDoc(txnRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

//  Update Transaction
export const updateTransaction = async (uid, walletId, txnId, updatedData) => {
  const txnRef = doc(db, 'users', uid, 'wallets', walletId, 'transactions', txnId);
  await updateDoc(txnRef, updatedData);
};

// Delete Transaction
export const deleteTransaction = async (uid, walletId, txnId) => {
  const txnRef = doc(db, 'users', uid, 'wallets', walletId, 'transactions', txnId);
  await deleteDoc(txnRef);
};
