/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserAccount, AppNotification } from '../types';
import { COUNTRY_PHONE_CONFIGS } from '../countryPhoneData';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Shield, 
  Camera,
  BookOpen,
  Pencil,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileSettingsProps {
  currentUser: UserAccount;
  instructors: UserAccount[];
  onUpdateProfile: (updatedUser: UserAccount) => void;
  onTriggerToast: (notif: AppNotification) => void;
  users?: UserAccount[];
  onSendEmail?: (to: string, subject: string, body: string, fromOverride?: string) => void;
}

export default function ProfileSettings({ 
  currentUser, 
  instructors,
  onUpdateProfile, 
  onTriggerToast,
  users,
  onSendEmail
}: ProfileSettingsProps) {
  // Read-only toggle state
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Forgot Password modal level states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Profiling Edit state
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [gender, setGender] = useState(currentUser.gender || '');
  const [dob, setDob] = useState(currentUser.dob || '');
  const [address, setAddress] = useState(currentUser.address || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || '');
  
  // Instructors specialization
  const [specialization, setSpecialization] = useState(currentUser.specialization || '');
  
  // Student father information
  const [fatherName, setFatherName] = useState(currentUser.fatherName || '');
  const [fatherPhone, setFatherPhone] = useState(currentUser.fatherPhone || '');
  const [fatherPhonePrefix, setFatherPhonePrefix] = useState(() => {
    if (currentUser.fatherPhone) {
      const match = COUNTRY_PHONE_CONFIGS.find(cfg => currentUser.fatherPhone?.startsWith(cfg.code));
      return match ? match.code : '+91';
    }
    return '+91';
  });
  const [fatherPhoneRaw, setFatherPhoneRaw] = useState(() => {
    if (currentUser.fatherPhone) {
      const match = COUNTRY_PHONE_CONFIGS.find(cfg => currentUser.fatherPhone?.startsWith(cfg.code));
      return match ? currentUser.fatherPhone.slice(match.code.length) : currentUser.fatherPhone;
    }
    return '';
  });

  // Phone code split state
  const [phonePrefix, setPhonePrefix] = useState(() => {
    if (currentUser.phone) {
      const match = COUNTRY_PHONE_CONFIGS.find(cfg => currentUser.phone?.startsWith(cfg.code));
      return match ? match.code : '+91';
    }
    return '+91';
  });
  const [phoneRaw, setPhoneRaw] = useState(() => {
    if (currentUser.phone) {
      const match = COUNTRY_PHONE_CONFIGS.find(cfg => currentUser.phone?.startsWith(cfg.code));
      return match ? currentUser.phone.slice(match.code.length) : currentUser.phone;
    }
    return '';
  });

  // Password editing state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // UI States
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Password strength check helper
  const checkPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: 'Not Entered', color: 'bg-slate-200 dark:bg-white/10' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score, text: 'Weak', color: 'bg-red-500' };
      case 2:
      case 3:
        return { score, text: 'Moderate', color: 'bg-amber-500' };
      case 4:
      case 5:
        return { score, text: 'Strong', color: 'bg-emerald-500' };
      default:
        return { score: 0, text: 'Weak', color: 'bg-red-500' };
    }
  };

  const strength = checkPasswordStrength(newPassword);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');

    if (!name.trim()) {
      setProfileError('Display Name cannot be blank.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setProfileError('Please enter a valid email address.');
      return;
    }

    // Format phone integers
    const cleanedPhoneRaw = phoneRaw.replace(/\D/g, '');
    const finalPhone = cleanedPhoneRaw ? `${phonePrefix}${cleanedPhoneRaw}` : '';

    const cleanedFatherPhoneRaw = fatherPhoneRaw.replace(/\D/g, '');
    const finalFatherPhone = cleanedFatherPhoneRaw ? `${fatherPhonePrefix}${cleanedFatherPhoneRaw}` : '';

    const updatedUser: UserAccount = {
      ...currentUser,
      name: name.trim(),
      email: email.trim(),
      phone: finalPhone,
      gender,
      dob,
      address,
      avatarUrl,
      specialization: currentUser.role === 'instructor' ? specialization.trim() : currentUser.specialization,
      fatherName: currentUser.role === 'student' ? fatherName.trim() : currentUser.fatherName,
      fatherPhone: currentUser.role === 'student' ? finalFatherPhone : currentUser.fatherPhone,
    };

    onUpdateProfile(updatedUser);
    setProfileSuccess('Profile updated successfully across active directories.');
    setIsEditing(false);

    const notif: AppNotification = {
      id: `notif-prof-${Date.now()}`,
      title: 'Profile Directory Updated',
      message: 'Your personal coaching directory properties have been saved successfully.',
      timestamp: new Date().toISOString(),
      read: false,
      type: 'general',
      channel: 'push'
    };
    onTriggerToast(notif);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    // Verification
    if (!oldPassword) {
      setPasswordError('Please input your current password.');
      return;
    }

    if (currentUser.password !== oldPassword) {
      setPasswordError('The current password provided is incorrect.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Confirm Password does not match new password.');
      return;
    }

    // Success update password
    const updatedUser: UserAccount = {
      ...currentUser,
      password: newPassword
    };

    onUpdateProfile(updatedUser);
    setPasswordSuccess('Success! Password updated safely in credential registers.');
    setIsEditingPassword(false);
    
    // Clear fields
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

    const notif: AppNotification = {
      id: `notif-pass-${Date.now()}`,
      title: 'Security Credentials Configured',
      message: 'Your account login authentication password has been updated successfully.',
      timestamp: new Date().toISOString(),
      read: false,
      type: 'general',
      channel: 'push'
    };
    onTriggerToast(notif);
  };

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const limit = 150 * 1024; // 150KB limit
    if (file.size > limit) {
      const errNotif: AppNotification = {
        id: `notif-err-${Date.now()}`,
        title: 'Avatar Size Limitation',
        message: 'Photo exceeds 150KB. Please resize or optimize the file before choosing.',
        timestamp: new Date().toISOString(),
        read: false,
        type: 'general',
        channel: 'push'
      };
      onTriggerToast(errNotif);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const selectedCountryConfig = COUNTRY_PHONE_CONFIGS.find(cfg => cfg.code === phonePrefix);
  const selectedFatherCountryConfig = COUNTRY_PHONE_CONFIGS.find(cfg => cfg.code === fatherPhonePrefix);

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#161618] border border-slate-150/80 dark:border-white/5 text-slate-900 dark:text-gray-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden select-none">
        <div className="absolute right-0 bottom-0 h-32 w-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
            Profile Settings Interface
          </p>
          <h1 className="text-2xl md:text-3xl font-serif italic text-amber-500 font-bold tracking-tight mt-1">
            Personalize Your Profile
          </h1>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 max-w-xl">
            Configure system directory parameters, maintain your official contact files, and manage your account secret credentials.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0A0A0B] border border-slate-150/80 dark:border-white/5 p-3.5 rounded-2xl text-xs flex items-center gap-2 font-mono">
          <Shield className="w-4 h-4 text-amber-500" />
          <div>
            <p className="text-slate-900 dark:text-gray-300 font-bold capitalize">Role: {currentUser.role}</p>
            <p className="text-[10px] text-slate-500 dark:text-gray-500">Username: {currentUser.username || 'n/a'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card & Avatar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 md:p-8 bg-white dark:bg-[#161618] border border-slate-150/80 dark:border-white/5 rounded-3xl space-y-6 shadow-sm">
            <h3 className="text-lg font-serif italic text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
              <User className="w-5 h-5 text-amber-500" /> Direct Identity Information
            </h3>

            {profileSuccess && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{profileSuccess}</span>
              </motion.div>
            )}

            {profileError && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{profileError}</span>
              </motion.div>
            )}

            {!isEditing ? (
              <div className="space-y-6">
                {/* Visual Bio Summary */}
                <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-slate-50 dark:bg-[#0F0F11] border border-slate-100 dark:border-white/5 relative">
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120'}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/30"
                  />
                  <div className="text-center sm:text-left space-y-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h4 className="text-lg font-serif italic text-slate-900 dark:text-white font-bold">{currentUser.name || 'Anonymous User'}</h4>
                      <span className="px-2 py-0.5 bg-amber-500/15 text-amber-500 font-mono text-[9px] font-bold uppercase rounded-md tracking-wider border border-amber-500/20">{currentUser.role}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-gray-400">@{currentUser.username || 'n/a'}</p>
                    <p className="text-[10px] text-slate-400 dark:text-gray-500">Joined registers: {currentUser.joinedDate ? new Date(currentUser.joinedDate).toLocaleDateString() : 'n/a'}</p>
                  </div>

                  {currentUser.role !== 'student' ? (
                    <button
                      type="button"
                      onClick={() => {
                        // Initialize fields to current info to ensure sync
                        setName(currentUser.name || '');
                        setEmail(currentUser.email || '');
                        setGender(currentUser.gender || '');
                        setDob(currentUser.dob || '');
                        setAddress(currentUser.address || '');
                        setAvatarUrl(currentUser.avatarUrl || '');
                        setSpecialization(currentUser.specialization || '');
                        setFatherName(currentUser.fatherName || '');
                        
                        if (currentUser.phone) {
                          const match = COUNTRY_PHONE_CONFIGS.find(cfg => currentUser.phone?.startsWith(cfg.code));
                          setPhonePrefix(match ? match.code : '+91');
                          setPhoneRaw(match ? currentUser.phone.slice(match.code.length) : currentUser.phone);
                        } else {
                          setPhoneRaw('');
                        }
                        if (currentUser.fatherPhone) {
                          const match = COUNTRY_PHONE_CONFIGS.find(cfg => currentUser.fatherPhone?.startsWith(cfg.code));
                          setFatherPhonePrefix(match ? match.code : '+91');
                          setFatherPhoneRaw(match ? currentUser.fatherPhone.slice(match.code.length) : currentUser.fatherPhone);
                        } else {
                          setFatherPhoneRaw('');
                        }

                        setIsEditing(true);
                      }}
                      className="sm:absolute sm:right-5 sm:top-1/2 sm:-translate-y-1/2 px-4 py-2.5 bg-amber-500 text-amber-950 font-bold hover:bg-amber-600 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer select-none active:scale-[0.98]"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                  ) : (
                    <div className="sm:absolute sm:right-5 sm:top-1/2 sm:-translate-y-1/2 text-center p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] text-slate-500 max-w-xs font-sans">
                      🔒 <span className="font-semibold text-slate-605 dark:text-gray-400">Profile Locked</span>
                      <p className="mt-0.5 text-slate-400 dark:text-gray-500">Only Admin and Sub-Admin teams are authorized to modify student record details.</p>
                    </div>
                  )}
                </div>

                {/* Key value details array */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 dark:bg-[#0b0b0c]/50 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Display Fullname</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-gray-200">{currentUser.name || 'Not Provided'}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Email Address</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-gray-200">{currentUser.email || 'Not Provided'}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Phone Contact</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-gray-200">{currentUser.phone || 'Not Provided'}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Gender Identity</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-gray-200 capitalize">{currentUser.gender || 'Not Provided'}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Date of Birth</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-gray-200">{currentUser.dob || 'Not Provided'}</span>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Postal Address</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-gray-200 block whitespace-pre-wrap">{currentUser.address || 'Not Provided'}</span>
                  </div>

                  {currentUser.role === 'instructor' && (
                    <div className="space-y-1 md:col-span-2 pt-2 border-t border-slate-100 dark:border-white/5">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Academic Specialization Specialties</span>
                      <span className="text-xs font-serif italic font-bold text-amber-500">{currentUser.specialization || 'General Tutor / No direct focus registered'}</span>
                    </div>
                  )}

                  {currentUser.role === 'student' && (
                    <div className="space-y-4 md:col-span-2 pt-4 border-t border-slate-100 dark:border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Classroom Mentor Advisor</span>
                          <span className="text-xs font-semibold text-slate-800 dark:text-gray-200">
                            {instructors.find(i => i.id === currentUser.assignedInstructorId)?.name || 'Unassigned Mentor'}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Father / Guardian Name</span>
                          <span className="text-xs font-semibold text-slate-800 dark:text-gray-200">{currentUser.fatherName || 'Not Provided'}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest block">Father / Guardian Phone</span>
                          <span className="text-xs font-semibold text-slate-800 dark:text-gray-200">{currentUser.fatherPhone || 'Not Provided'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                
                {/* Profile Pic Upload Row */}
                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#0F0F11] border border-slate-100 dark:border-white/5">
                  <div className="relative group cursor-pointer">
                    <img
                      id="profile-settings-avatar"
                      src={avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120'}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/50 group-hover:brightness-75 transition-all"
                    />
                    <input
                      type="file"
                      id="profile-avatar-uploader"
                      accept="image/*"
                      onChange={handleAvatarFile}
                      className="hidden"
                    />
                    <label htmlFor="profile-avatar-uploader" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 rounded-full text-white transition-all cursor-pointer">
                      <Camera className="w-5 h-5" />
                    </label>
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-gray-200">Coaching Profile Photo</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-500">Allowed formats: JPG, PNG, GIF. Recommended maximum size is <span className="font-bold text-amber-500/80">150KB</span>.</p>
                    <label htmlFor="profile-avatar-uploader" className="inline-block mt-2 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-bold rounded-lg text-[10px] uppercase tracking-wider border border-amber-500/20 cursor-pointer transition-all">
                      Upload New Image
                    </label>
                  </div>
                </div>

                {/* Main Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Display Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100 font-sans"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100 font-sans"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Phone Contact</label>
                    <div className="flex gap-2">
                      <select
                        value={phonePrefix}
                        onChange={e => setPhonePrefix(e.target.value)}
                        className="px-2 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 text-slate-800 dark:text-gray-100"
                      >
                        {COUNTRY_PHONE_CONFIGS.map(cfg => (
                          <option key={cfg.code + cfg.name} value={cfg.code}>
                            {cfg.flag} {cfg.code}
                          </option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder={selectedCountryConfig?.placeholder || '12345 67890'}
                          value={phoneRaw}
                          onChange={e => setPhoneRaw(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Gender Directory</label>
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-850 dark:text-gray-100 font-sans"
                    >
                      <option value="">Optionally Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other / Prefer more secrets</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100 font-sans"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Postal Location / Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <textarea
                        rows={2}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-850 dark:text-gray-100 font-sans"
                        placeholder="Street name, Apartment, State, ZIP code"
                      />
                    </div>
                  </div>

                  {/* Specialization - For instructors */}
                  {currentUser.role === 'instructor' && (
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Academic Specialization Specialties</label>
                      <div className="relative">
                        <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={specialization}
                          onChange={e => setSpecialization(e.target.value)}
                          placeholder="e.g. Higher Algebra, Creative Typography, Advanced Physics"
                          className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100 font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* Student specific fields */}
                  {currentUser.role === 'student' && (
                    <>
                      <div className="space-y-1.5 md:col-span-2 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-mono font-bold text-amber-500 uppercase">Assigned Classroom Mentor Advisor</p>
                          <p className="text-xs font-serif italic text-slate-900 dark:text-gray-200 font-bold mt-1">
                            {instructors.find(i => i.id === currentUser.assignedInstructorId)?.name || 'Unassigned Mentor'}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Please contact admin office for advisor matching queries.</p>
                        </div>
                      </div>

                      {/* Father's name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Father / Guardian Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            value={fatherName}
                            onChange={e => setFatherName(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100"
                          />
                        </div>
                      </div>

                      {/* Father's phone */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Father / Guardian Phone</label>
                        <div className="flex gap-2">
                          <select
                            value={fatherPhonePrefix}
                            onChange={e => setFatherPhonePrefix(e.target.value)}
                            className="px-2 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 text-slate-800 dark:text-gray-100"
                          >
                            {COUNTRY_PHONE_CONFIGS.map(cfg => (
                              <option key={cfg.code + cfg.name} value={cfg.code}>
                                {cfg.flag} {cfg.code}
                              </option>
                            ))}
                          </select>
                          <div className="relative flex-1">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder={selectedFatherCountryConfig?.placeholder || '12345 67890'}
                              value={fatherPhoneRaw}
                              onChange={e => setFatherPhoneRaw(e.target.value)}
                              className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100 font-sans"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Submit profile */}
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition active:scale-[0.98]"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 text-amber-950 font-bold hover:bg-amber-600 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition shadow-md active:scale-[0.98]"
                  >
                    <Sparkles className="w-4 h-4" /> Save Directory Changes
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* Change Password Card */}
        <div className="space-y-6">
          <div className="p-6 md:p-8 bg-white dark:bg-[#161618] border border-slate-150/80 dark:border-white/5 rounded-3xl space-y-6 shadow-sm">
            <h3 className="text-lg font-serif italic text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
              <Lock className="w-5 h-5 text-amber-500" /> Credentials Security
            </h3>

            {passwordSuccess && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-1.5">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{passwordSuccess}</span>
              </motion.div>
            )}

            {passwordError && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{passwordError}</span>
              </motion.div>
            )}

            {!isEditingPassword ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0F0F11] border border-slate-100 dark:border-white/5 flex items-center justify-between gap-3 flex-wrap">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-gray-200">Account Authentication</p>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Manage your system login password credentials securely here.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOldPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setIsEditingPassword(true);
                    }}
                    className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-bold border border-amber-500/20 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" /> Change Password
                  </button>
                </div>
                
                <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-[#0b0b0c]/50 border border-slate-100 dark:border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider">Credential Status</span>
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ACTIVE SECURED
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider">Current Password</span>
                    <span className="text-slate-800 dark:text-gray-300 font-sans text-xs variant-numeric">••••••••••••</span>
                  </div>
                </div>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail('');
                      setForgotSuccess('');
                      setForgotError('');
                      setShowForgotModal(true);
                    }}
                    className="text-[11px] text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 font-bold hover:underline cursor-pointer transition select-none"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-5">
                
                {/* Old Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      required
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 cursor-pointer"
                    >
                      {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">New Safe Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-150/80 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength Meter */}
                  {newPassword && (
                    <div className="space-y-1 pt-1.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 dark:text-gray-400">Strength: <span className="font-bold text-slate-700 dark:text-gray-200">{strength.text}</span></span>
                        <span className="text-slate-500 dark:text-gray-400">{strength.score}/5 checkmarks</span>
                      </div>
                      <div className="h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((idx) => (
                          <div 
                            key={idx} 
                            className={`h-full flex-1 transition-all ${
                              idx <= strength.score ? strength.color : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[9px] text-slate-400 dark:text-gray-500">Must include 6+ letters, upper/lowercase blend & numerical characters.</p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingPassword(false)}
                    className="flex-1 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 font-bold rounded-xl text-xs cursor-pointer transition active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 text-amber-950 font-bold hover:bg-amber-600 rounded-xl text-xs cursor-pointer transition shadow-md active:scale-[0.98]"
                  >
                    Change Keys
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </div>

      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-white dark:bg-[#161618] border border-slate-150/80 dark:border-white/5 rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <h3 className="text-base font-serif italic font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-500" /> Retrieve Account Password
              </h3>
              <button 
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotEmail('');
                  setForgotSuccess('');
                  setForgotError('');
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-gray-300 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSuccess ? (
              <div className="space-y-4 py-2">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs space-y-1">
                  <p className="font-bold">Credential Retrieval Dispatched!</p>
                  <p className="leading-relaxed font-sans">{forgotSuccess}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotEmail('');
                    setForgotSuccess('');
                    setForgotError('');
                  }}
                  className="w-full py-2.5 bg-amber-500 text-amber-950 font-bold hover:bg-amber-600 rounded-xl text-xs transition active:scale-[0.98]"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotError('');
                  setForgotSuccess('');
                  const targetEmail = forgotEmail.trim().toLowerCase();
                  
                  // Search among instructors or all users
                  const listToSearch = users || instructors || [];
                  const matchedUser = listToSearch.find(u => u.email?.toLowerCase() === targetEmail);
                  
                  if (matchedUser) {
                    const subject = `[SECURITY ALERT] Credential Recovery Directory Dispatch`;
                    const body = `Dear ${matchedUser.name || matchedUser.username},\n\nThis is a simulated verification lookup dispatched because a Credential Recovery request was submitted for your profile.\n\nYour active system records contain the following login attributes:\n\n-----------------------------\nUSER ID (USERNAME): ${matchedUser.username || 'n/a'}\nPASSWORD: ${matchedUser.password || 'n/a'}\n-----------------------------\n\nTo ensure sandbox directory security, never share these details with unverified contacts.\n\nWarm regards,\nLearnora Technical Security Sandbox Unit`;
                    
                    if (onSendEmail) {
                      onSendEmail(matchedUser.email, subject, body, 'anik.baidya@hotmail.com');
                    } else {
                      // Fallback locally using notification if callback isn't connected
                      onTriggerToast({
                        id: `forgot-${Date.now()}`,
                        title: 'Backup Reset Sent',
                        message: `Recovery credentials compiled for matched user @${matchedUser.username}. Check simulated records inbox.`,
                        timestamp: new Date().toISOString(),
                        read: false,
                        type: 'reminder',
                        channel: 'push'
                      });
                    }
                    
                    setForgotSuccess(`We have found username @${matchedUser.username} linked to this email address. A recovery email containing the user ID and password details has been sent to the simulated inbox.`);
                  } else {
                    setForgotError('We could not find any active student, tutor, or admin account containing this registered email address within our current databases.');
                  }
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Registered Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. samantha_wilson_822@recipient.io"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-[#070708] rounded-xl border border-slate-200 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 dark:text-gray-100 font-sans"
                    />
                  </div>
                </div>

                {forgotError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs flex gap-1.5 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{forgotError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 text-amber-950 font-bold hover:bg-amber-600 rounded-xl text-xs transition shadow-md active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" /> Dispatch Recovery Email
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
}
