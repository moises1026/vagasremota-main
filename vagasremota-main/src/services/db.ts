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
  Timestamp
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Job, Application, CandidateProfile, Company, Message, Subscription } from '../types'

// Jobs
export async function getJobs(page = 1, pageSize = 10) {
  const jobsRef = collection(db, 'jobs')
  const q = query(
    jobsRef,
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  )

  const snapshot = await getDocs(q)
  const jobs = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Job[]

  return jobs
}

export async function getJobById(id: string) {
  const jobRef = doc(db, 'jobs', id)
  const jobDoc = await getDoc(jobRef)
  if (!jobDoc.exists()) return null
  return { id: jobDoc.id, ...jobDoc.data() } as Job
}

export async function createJob(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) {
  const jobsRef = collection(db, 'jobs')
  const now = Timestamp.now()
  const newJob = {
    ...job,
    createdAt: now,
    updatedAt: now
  }
  const docRef = await addDoc(jobsRef, newJob)
  return { id: docRef.id, ...newJob } as Job
}

export async function updateJob(id: string, job: Partial<Job>) {
  const jobRef = doc(db, 'jobs', id)
  const now = Timestamp.now()
  await updateDoc(jobRef, {
    ...job,
    updatedAt: now
  })
  return getJobById(id)
}

export async function deleteJob(id: string) {
  const jobRef = doc(db, 'jobs', id)
  await deleteDoc(jobRef)
}

// Applications
export async function getApplicationsByJob(jobId: string) {
  const applicationsRef = collection(db, 'applications')
  const q = query(
    applicationsRef,
    where('jobId', '==', jobId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Application[]
}

export async function getApplicationsByCandidate(candidateId: string) {
  const applicationsRef = collection(db, 'applications')
  const q = query(
    applicationsRef,
    where('candidateId', '==', candidateId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Application[]
}

export async function createApplication(application: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>) {
  const applicationsRef = collection(db, 'applications')
  const now = Timestamp.now()
  const newApplication = {
    ...application,
    createdAt: now,
    updatedAt: now
  }
  const docRef = await addDoc(applicationsRef, newApplication)
  return { id: docRef.id, ...newApplication } as Application
}

export async function updateApplication(id: string, application: Partial<Application>) {
  const applicationRef = doc(db, 'applications', id)
  const now = Timestamp.now()
  await updateDoc(applicationRef, {
    ...application,
    updatedAt: now
  })
  return getDoc(applicationRef).then(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Promise<Application>
}

// Candidate Profiles
export async function getCandidateProfile(userId: string) {
  const profilesRef = collection(db, 'candidateProfiles')
  const q = query(profilesRef, where('userId', '==', userId))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as CandidateProfile
}

export async function createCandidateProfile(profile: Omit<CandidateProfile, 'id' | 'createdAt' | 'updatedAt'>) {
  const profilesRef = collection(db, 'candidateProfiles')
  const now = Timestamp.now()
  const newProfile = {
    ...profile,
    createdAt: now,
    updatedAt: now
  }
  const docRef = await addDoc(profilesRef, newProfile)
  return { id: docRef.id, ...newProfile } as CandidateProfile
}

export async function updateCandidateProfile(id: string, profile: Partial<CandidateProfile>) {
  const profileRef = doc(db, 'candidateProfiles', id)
  const now = Timestamp.now()
  await updateDoc(profileRef, {
    ...profile,
    updatedAt: now
  })
  return getDoc(profileRef).then(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Promise<CandidateProfile>
}

// Companies
export async function getCompany(userId: string) {
  const companiesRef = collection(db, 'companies')
  const q = query(companiesRef, where('userId', '==', userId))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as Company
}

export async function createCompany(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) {
  const companiesRef = collection(db, 'companies')
  const now = Timestamp.now()
  const newCompany = {
    ...company,
    createdAt: now,
    updatedAt: now
  }
  const docRef = await addDoc(companiesRef, newCompany)
  return { id: docRef.id, ...newCompany } as Company
}

export async function updateCompany(id: string, company: Partial<Company>) {
  const companyRef = doc(db, 'companies', id)
  const now = Timestamp.now()
  await updateDoc(companyRef, {
    ...company,
    updatedAt: now
  })
  return getDoc(companyRef).then(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Promise<Company>
}

// Messages
export async function getMessages(userId: string) {
  const messagesRef = collection(db, 'messages')
  const q = query(
    messagesRef,
    where('receiverId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Message[]
}

export async function createMessage(message: Omit<Message, 'id' | 'createdAt'>) {
  const messagesRef = collection(db, 'messages')
  const now = Timestamp.now()
  const newMessage = {
    ...message,
    createdAt: now,
    read: false
  }
  const docRef = await addDoc(messagesRef, newMessage)
  return { id: docRef.id, ...newMessage } as Message
}

export async function markMessageAsRead(id: string) {
  const messageRef = doc(db, 'messages', id)
  await updateDoc(messageRef, { read: true })
}

// Subscriptions
export async function getSubscription(companyId: string) {
  const subscriptionsRef = collection(db, 'subscriptions')
  const q = query(
    subscriptionsRef,
    where('companyId', '==', companyId),
    where('status', '==', 'active')
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const doc = snapshot.docs[0]
  return { id: doc.id, ...doc.data() } as Subscription
}

export async function createSubscription(subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>) {
  const subscriptionsRef = collection(db, 'subscriptions')
  const now = Timestamp.now()
  const newSubscription = {
    ...subscription,
    createdAt: now,
    updatedAt: now
  }
  const docRef = await addDoc(subscriptionsRef, newSubscription)
  return { id: docRef.id, ...newSubscription } as Subscription
}

export async function updateSubscription(id: string, subscription: Partial<Subscription>) {
  const subscriptionRef = doc(db, 'subscriptions', id)
  const now = Timestamp.now()
  await updateDoc(subscriptionRef, {
    ...subscription,
    updatedAt: now
  })
  return getDoc(subscriptionRef).then(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Promise<Subscription>
} 