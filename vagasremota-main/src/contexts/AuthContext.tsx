import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, LogIn, Mail, User as LucideUser } from 'lucide-react';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { auth } from '@/lib/firebase';
import type { User } from '@/types/database';
import { db } from '@/lib/firebase';

// Define user types
export type UserRole = 'candidato' | 'empresa' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  photoUrl?: string;
  provider?: 'email' | 'google';
}

const firebaseConfig = {
  // Substitua com suas configurações do Firebase
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          id: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          role: 'candidato',
          createdAt: new Date(),
          photoUrl: result.user.photoURL,
          provider: 'google'
        });
      }
      
      navigate('/profile');
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo de volta!'
      });
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Não foi possível fazer login com o Google.',
        variant: 'destructive'
      });
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo de volta!'
      });
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Email ou senha inválidos.',
        variant: 'destructive'
      });
    }
  };

  const registerWithEmail = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', result.user.uid), {
        id: result.user.uid,
        name,
        email,
        role,
        createdAt: new Date(),
        provider: 'email'
      });
      
      navigate('/profile');
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Bem-vindo ao Vagas Remota!'
      });
    } catch (error) {
      toast({
        title: 'Erro ao criar conta',
        description: 'Não foi possível criar sua conta.',
        variant: 'destructive'
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: 'Email enviado!',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.'
      });
    } catch (error) {
      toast({
        title: 'Erro ao enviar email',
        description: 'Não foi possível enviar o email de redefinição de senha.',
        variant: 'destructive'
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      toast({
        title: 'Logout realizado com sucesso!',
        description: 'Até logo!'
      });
    } catch (error) {
      toast({
        title: 'Erro ao fazer logout',
        description: 'Não foi possível fazer logout.',
        variant: 'destructive'
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        registerWithEmail,
        resetPassword,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
