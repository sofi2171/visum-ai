
import React, { useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getFriendlyErrorMessage = (error: any) => {
    const code = error.code;
    switch (code) {
      case 'auth/invalid-email':
        return "Please enter a valid email address.";
      case 'auth/user-not-found':
        return "No account found with this email. Please sign up.";
      case 'auth/wrong-password':
        return "Incorrect password. Please try again.";
      case 'auth/email-already-in-use':
        return "This email is already registered. Try logging in.";
      case 'auth/weak-password':
        return "Password is too weak. Use at least 6 characters.";
      case 'auth/network-request-failed':
        return "Connection error. Check your internet and try again.";
      case 'auth/too-many-requests':
        return "Too many failed attempts. Please wait a moment.";
      case 'auth/operation-not-allowed':
        return "Authentication service is temporarily unavailable.";
      case 'auth/popup-closed-by-user':
        return "Sign-in was cancelled.";
      default:
        // Handle custom validation errors (like passwords matching)
        if (error.message === "Passwords do not match") return "Passwords do not match.";
        if (error.message === "Name is required") return "Please enter your full name.";
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login Logic
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Signup Logic
        if (!name.trim()) throw new Error("Name is required");
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        if (password.length < 6) throw { code: 'auth/weak-password' };
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      onClose();
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="glass-morphism w-full max-w-md p-8 md:p-12 rounded-[3rem] border border-white/10 relative shadow-2xl overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[80px]"></div>

        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-all hover:rotate-90 z-10"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="text-center mb-8 relative">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-white/5 rotate-3">
            <i className="fas fa-eye text-black text-2xl"></i>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">
            Visum <span className="text-teal-400">Studio</span>
          </h2>
          <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mt-3">
            {isLogin ? 'Welcome back to excellence' : 'The next standard of creation'}
          </p>
        </div>

        <div className="space-y-4 relative">
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-4 h-4" alt="google" />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/5"></div>
            <span className="text-[8px] font-black text-gray-800 uppercase tracking-[0.3em]">Credentials</span>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-3">
            {!isLogin && (
              <div className="relative">
                <i className="fas fa-user absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 text-[10px]"></i>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm outline-none focus:border-teal-500/50 transition-all placeholder:text-gray-700"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="relative">
              <i className="fas fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 text-[10px]"></i>
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm outline-none focus:border-teal-500/50 transition-all placeholder:text-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 text-[10px]"></i>
              <input 
                type="password" 
                placeholder="Password"
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm outline-none focus:border-teal-500/50 transition-all placeholder:text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="relative animate-in slide-in-from-top-1">
                <i className="fas fa-shield-check absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 text-[10px]"></i>
                <input 
                  type="password" 
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-sm outline-none focus:border-teal-500/50 transition-all placeholder:text-gray-700"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            
            {error && (
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest text-center">
                  {error}
                </p>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-teal-400 transition-all shadow-xl active:scale-95 disabled:opacity-50 mt-4"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In to Studio' : 'Create New Account')}
            </button>
          </form>

          <div className="pt-6 text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] hover:text-white transition-colors"
            >
              {isLogin ? "Need a workspace? Register here" : "Return to login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
