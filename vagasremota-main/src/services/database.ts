import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  User,
  Company,
  Job,
  Application,
  Chat,
  Message,
  CandidateProfile,
  Subscription
} from '@/types/database';

// Users
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const userRef = await addDoc(collection(db, 'users'), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return userRef.id;
};

export const getUser = async (userId: string) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } as User : null;
};

// Companies
export const createCompany = async (companyData: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
  const companyRef = await addDoc(collection(db, 'companies'), {
    ...companyData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return companyRef.id;
};

export const getCompany = async (companyId: string) => {
  const companyDoc = await getDoc(doc(db, 'companies', companyId));
  return companyDoc.exists() ? { id: companyDoc.id, ...companyDoc.data() } as Company : null;
};

export const updateCompanyPlan = async (companyId: string, planData: Company['plan']) => {
  await updateDoc(doc(db, 'companies', companyId), {
    plan: planData,
    updatedAt: serverTimestamp()
  });
};

// Jobs
export async function createJob(job: Omit<Job, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'jobs'), {
    ...job,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function getJob(id: string): Promise<Job | null> {
  const docRef = doc(db, 'jobs', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Job : null;
}

export async function getJobs(
  filters: {
    companyId?: string;
    status?: 'active' | 'closed';
    limit?: number;
    lastDoc?: any;
  } = {}
): Promise<{ jobs: Job[]; lastDoc: any }> {
  let q = collection(db, 'jobs');
  
  if (filters.companyId) {
    q = query(q, where('companyId', '==', filters.companyId));
  }
  
  if (filters.status) {
    q = query(q, where('status', '==', filters.status));
  }
  
  q = query(q, orderBy('createdAt', 'desc'), limit(filters.limit || 10));
  
  if (filters.lastDoc) {
    q = query(q, startAfter(filters.lastDoc));
  }
  
  const querySnapshot = await getDocs(q);
  const jobs = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Job[];
  
  return {
    jobs,
    lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
  };
}

export async function updateJob(id: string, data: Partial<Job>): Promise<void> {
  const docRef = doc(db, 'jobs', id);
  await updateDoc(docRef, data);
}

export async function deleteJob(id: string): Promise<void> {
  const docRef = doc(db, 'jobs', id);
  await deleteDoc(docRef);
}

// Applications
export async function createApplication(application: Omit<Application, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'applications'), {
    ...application,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function getApplication(id: string): Promise<Application | null> {
  const docRef = doc(db, 'applications', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Application : null;
}

export async function getApplications(
  filters: {
    jobId?: string;
    candidateId?: string;
    status?: 'pending' | 'accepted' | 'rejected';
    limit?: number;
    lastDoc?: any;
  } = {}
): Promise<{ applications: Application[]; lastDoc: any }> {
  let q = collection(db, 'applications');
  
  if (filters.jobId) {
    q = query(q, where('jobId', '==', filters.jobId));
  }
  
  if (filters.candidateId) {
    q = query(q, where('candidateId', '==', filters.candidateId));
  }
  
  if (filters.status) {
    q = query(q, where('status', '==', filters.status));
  }
  
  q = query(q, orderBy('createdAt', 'desc'), limit(filters.limit || 10));
  
  if (filters.lastDoc) {
    q = query(q, startAfter(filters.lastDoc));
  }
  
  const querySnapshot = await getDocs(q);
  const applications = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Application[];
  
  return {
    applications,
    lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
  };
}

export async function updateApplication(id: string, data: Partial<Application>): Promise<void> {
  const docRef = doc(db, 'applications', id);
  await updateDoc(docRef, data);
}

// Chats
export const createChat = async (participants: string[]) => {
  const chatRef = await addDoc(collection(db, 'chats'), {
    participants,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return chatRef.id;
};

export const getChat = async (id: string) => {
  const chatDoc = await getDoc(doc(db, 'chats', id));
  return chatDoc.exists() ? { id: chatDoc.id, ...chatDoc.data() } as Chat : null;
};

export async function getChats(
  filters: {
    participantId: string;
    limit?: number;
    lastDoc?: any;
  }
): Promise<{ chats: Chat[]; lastDoc: any }> {
  let q = collection(db, 'chats');
  q = query(q, where('participants', 'array-contains', filters.participantId));
  q = query(q, orderBy('lastMessageAt', 'desc'), limit(filters.limit || 10));
  
  if (filters.lastDoc) {
    q = query(q, startAfter(filters.lastDoc));
  }
  
  const querySnapshot = await getDocs(q);
  const chats = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Chat[];
  
  return {
    chats,
    lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
  };
}

export async function sendMessage(chatId: string, message: Omit<Message, 'id' | 'createdAt' | 'chatId'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'messages'), {
    ...message,
    chatId,
    createdAt: serverTimestamp()
  });
  
  // Update chat's last message
  const chatRef = doc(db, 'chats', chatId);
  await updateDoc(chatRef, {
    lastMessage: message.content,
    lastMessageAt: serverTimestamp()
  });
  
  return docRef.id;
}

export function subscribeToMessages(chatId: string, callback: (messages: Message[]) => void) {
  const q = query(
    collection(db, 'messages'),
    where('chatId', '==', chatId),
    orderBy('createdAt', 'asc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
    callback(messages);
  });
}

// Candidate Profiles
export const createCandidateProfile = async (profileData: Omit<CandidateProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
  const profileRef = await addDoc(collection(db, 'candidateProfiles'), {
    ...profileData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return profileRef.id;
};

export async function getCandidateProfile(id: string): Promise<CandidateProfile | null> {
  const docRef = doc(db, 'candidateProfiles', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as CandidateProfile : null;
}

export async function updateCandidateProfile(id: string, data: Partial<CandidateProfile>): Promise<void> {
  const docRef = doc(db, 'candidateProfiles', id);
  await updateDoc(docRef, data);
}

// Plan Rules
export const checkPlanLimits = async (companyId: string) => {
  const company = await getCompany(companyId);
  if (!company) return false;

  const { type, status } = company.plan;
  if (status !== 'active') return false;

  const activeJobs = await getJobs({ companyId, status: 'active' });
  const jobCount = activeJobs.jobs.length;

  switch (type) {
    case 'basic':
      return jobCount < 5;
    case 'pro':
      return true; // Unlimited
    case 'enterprise':
      return true; // Unlimited
    default:
      return false;
  }
};

// Subscriptions
export async function getSubscription(id: string): Promise<Subscription | null> {
  const docRef = doc(db, 'subscriptions', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Subscription : null;
}

export async function updateSubscription(id: string, data: Partial<Subscription>): Promise<void> {
  const docRef = doc(db, 'subscriptions', id);
  await updateDoc(docRef, data);
}

export async function updateCompany(id: string, data: Partial<Company>): Promise<void> {
  const docRef = doc(db, 'companies', id);
  await updateDoc(docRef, data);
} 