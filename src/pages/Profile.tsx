import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { User, Phone, Bell, MapPin, Save } from 'lucide-react';
import { getUserProfile, saveUserProfile, UserProfile } from '@/utils/localStorage';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    emergencyMessage: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = getUserProfile();
    setProfile(storedProfile);
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    saveUserProfile(profile);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-900 mb-2">My Profile</h1>
            <p className="text-pink-700">
              Manage your personal information and preferences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <h2 className="text-xl font-semibold text-pink-900 mb-6">Personal Information</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-full md:w-1/4 text-pink-700 font-medium mb-2 md:mb-0">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>Name</span>
                      </div>
                    </label>
                    <div className="w-full md:w-3/4">
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-full md:w-1/4 text-pink-700 font-medium mb-2 md:mb-0">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>Email</span>
                      </div>
                    </label>
                    <div className="w-full md:w-3/4">
                      <input
                        type="email"
                        name="email"
                        value={profile.email || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-full md:w-1/4 text-pink-700 font-medium mb-2 md:mb-0">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>Phone</span>
                      </div>
                    </label>
                    <div className="w-full md:w-3/4">
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="text-pink-700 font-medium mb-2">
                      <div className="flex items-center">
                        <Bell className="w-4 h-4 mr-2" />
                        <span>Emergency Message</span>
                      </div>
                    </label>
                    <div className="w-full">
                      <textarea
                        name="emergencyMessage"
                        value={profile.emergencyMessage}
                        onChange={handleInputChange}
                        className="w-full p-3 h-32 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400 resize-none"
                        placeholder="This message will be sent to your emergency contacts in case of an emergency"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-full md:w-1/4 text-pink-700 font-medium mb-2 md:mb-0">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Profile Picture</span>
                      </div>
                    </label>
                    <div className="w-full md:w-3/4">
                      <input
                        type="text"
                        name="avatar"
                        value={profile.avatar || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                        placeholder="URL to your profile picture"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <h2 className="text-xl font-semibold text-pink-900 mb-4">Privacy & Security</h2>
                <p className="text-pink-700 mb-4">
                  Your privacy is important to us. We never share your personal information without your explicit consent.
                </p>
                <ul className="space-y-2 text-pink-600">
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">•</span>
                    Your location is only shared during emergencies
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">•</span>
                    Chat conversations are encrypted and private
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">•</span>
                    You can delete your data at any time
                  </li>
                </ul>
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
