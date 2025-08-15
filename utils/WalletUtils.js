import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

//  Create Wallet
export const createWallet = async (uid, walletData) => {
  const walletRef = await addDoc(collection(db, 'users', uid, 'wallets'), {
    ...walletData,
    createdAt: serverTimestamp(),
  });
  return walletRef.id;
};

// Get All Wallets
export const getWallets = async (uid) => {
  const snapshot = await getDocs(collection(db, 'users', uid, 'wallets'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

//  Get Single Wallet by ID
export const getWalletById = async (uid, walletId) => {
  const walletRef = doc(db, 'users', uid, 'wallets', walletId);
  const snapshot = await getDoc(walletRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

//  Update Wallet
export const updateWallet = async (uid, walletId, updatedData) => {
  const walletRef = doc(db, 'users', uid, 'wallets', walletId);
  await updateDoc(walletRef, updatedData);
};

//  Delete Wallet
export const deleteWallet = async (uid, walletId) => {
  const walletRef = doc(db, 'users', uid, 'wallets', walletId);
  await deleteDoc(walletRef);
};


export const getFirstWalletId = async (uid) => {
  const walletRef = collection(db, 'users', uid, 'wallets');
  const snapshot = await getDocs(walletRef);
  return snapshot.docs.length > 0 ? snapshot.docs[0].id : null;
};

