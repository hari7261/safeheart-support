
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { User, Mail, Phone, MapPin, Shield, Lock, LogOut, Save } from 'lucide-react';
import { getUserProfile, saveUserProfile } from '@/utils/localStorage';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    notificationsEnabled: true,
    locationSharingEnabled: true,
    darkModeEnabled: false
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const userProfile = getUserProfile();
    setProfile({
      name: userProfile.name || '',
      email: userProfile.email || '',
      phone: userProfile.phone || '',
      address: userProfile.address || '',
      emergencyContactName: userProfile.emergencyContactName || '',
      emergencyContactPhone: userProfile.emergencyContactPhone || '',
      notificationsEnabled: userProfile.notificationsEnabled !== false,
      locationSharingEnabled: userProfile.locationSharingEnabled !== false,
      darkModeEnabled: userProfile.darkModeEnabled === true
    });
  }, []);
  
  const handleSave = () => {
    saveUserProfile(profile);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };
  
  const handleToggle = (field: 'notificationsEnabled' | 'locationSharingEnabled' | 'darkModeEnabled') => {
    setProfile(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-900 mb-2">Your Profile</h1>
            <p className="text-pink-700">
              Manage your personal information and preferences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Profile Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-pink-400 to-pink-500 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-xl font-semibold text-pink-900 mb-1">{profile.name || 'Your Name'}</h2>
                  <p className="text-pink-600 mb-6">{profile.email || 'email@example.com'}</p>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full py-2 px-4 bg-pink-100 text-pink-700 font-medium rounded-lg hover:bg-pink-200 transition-colors mb-4"
                  >
                    {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                  </button>
                  
                  <button className="w-full py-2 px-4 border border-pink-200 text-pink-600 font-medium rounded-lg hover:bg-pink-50 transition-colors flex items-center justify-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-sm font-medium text-pink-900 uppercase tracking-wider">Account Settings</h3>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-pink-500 mr-3" />
                      <span className="text-pink-800">Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={profile.notificationsEnabled}
                        onChange={() => handleToggle('notificationsEnabled')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-pink-500 mr-3" />
                      <span className="text-pink-800">Location Sharing</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={profile.locationSharingEnabled}
                        onChange={() => handleToggle('locationSharingEnabled')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <Lock className="w-5 h-5 text-pink-500 mr-3" />
                      <span className="text-pink-800">Dark Mode</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={profile.darkModeEnabled}
                        onChange={() => handleToggle('darkModeEnabled')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Profile Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <h2 className="text-xl font-semibold text-pink-900 mb-6">Personal Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-pink-700 mb-1">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-pink-400" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          placeholder="Your Name"
                          className="pl-10 w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-pink-700 mb-1">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-pink-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10 w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-pink-700 mb-1">Phone</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-pink-400" />
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="pl-10 w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-pink-700 mb-1">Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-pink-400" />
                        </div>
                        <input
                          id="address"
                          type="text"
                          placeholder="123 Main St, City"
                          className="pl-10 w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                          value={profile.address}
                          onChange={(e) => setProfile({...profile, address: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <h2 className="text-xl font-semibold text-pink-900 mb-6">Emergency Contact</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="emergencyName" className="block text-sm font-medium text-pink-700 mb-1">Contact Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-pink-400" />
                        </div>
                        <input
                          id="emergencyName"
                          type="text"
                          placeholder="Emergency Contact Name"
                          className="pl-10 w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                          value={profile.emergencyContactName}
                          onChange={(e) => setProfile({...profile, emergencyContactName: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="emergencyPhone" className="block text-sm font-medium text-pink-700 mb-1">Contact Phone</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-pink-400" />
                        </div>
                        <input
                          id="emergencyPhone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="pl-10 w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                          value={profile.emergencyContactPhone}
                          onChange={(e) => setProfile({...profile, emergencyContactPhone: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <h2 className="text-xl font-semibold text-pink-900 mb-4">Account Security</h2>
                
                <div className="space-y-4">
                  <p className="text-pink-700">
                    Manage your account security settings and password
                  </p>
                  
                  <button
                    className="w-full md:w-auto px-6 py-2 border border-pink-200 text-pink-600 font-medium rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
