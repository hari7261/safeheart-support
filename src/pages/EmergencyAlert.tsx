
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmergencyButton } from '@/components/EmergencyButton';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { SafetyTipsCard } from '@/components/SafetyTipsCard';
import { ResourceCard } from '@/components/ResourceCard';
import { Phone, UserPlus, MessageSquare, MapPin, AlertTriangle, Users, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Safety tips data
const EMERGENCY_TIPS = [
  {
    id: '1',
    title: 'Call emergency services',
    description: 'In immediate danger, call your local emergency number (911 in the US).'
  },
  {
    id: '2',
    title: 'Find a safe location',
    description: 'Move to a public area or safe space like a police station, hospital, or public building.'
  },
  {
    id: '3',
    title: 'Alert trusted contacts',
    description: 'Use the emergency button in this app to contact your trusted emergency contacts quickly.'
  },
  {
    id: '4',
    title: 'Document incidents',
    description: 'If safe to do so, take photos or notes about threatening situations for future reference.'
  },
  {
    id: '5',
    title: 'Use code words',
    description: 'Use pre-established code words with friends or family to signal you need help discreetly.'
  }
];

const EmergencyAlert = () => {
  const { contacts, emergencyMessage, addContact, removeContact, updateEmergencyMessage } = useEmergencyContacts();
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [messageInput, setMessageInput] = useState(emergencyMessage);
  
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newContact.name || !newContact.phone) return;
    
    addContact(newContact.name, newContact.phone, newContact.relationship);
    
    toast({
      title: "Contact added",
      description: `${newContact.name} has been added to your emergency contacts.`,
    });
    
    setNewContact({ name: '', phone: '', relationship: '' });
    setIsAddingContact(false);
  };
  
  const handleDeleteContact = (id: string, name: string) => {
    removeContact(id);
    
    toast({
      title: "Contact removed",
      description: `${name} has been removed from your emergency contacts.`,
    });
  };
  
  const handleUpdateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateEmergencyMessage(messageInput);
    
    toast({
      title: "Message updated",
      description: "Your emergency message has been updated.",
    });
    
    setIsEditingMessage(false);
  };
  
  const toggleLocationDemo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location accessed",
            description: "Your location would be shared during an emergency.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Could not access your location. Please check your permissions.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-900 mb-2">Emergency Safety Tools</h1>
            <p className="text-pink-700">
              Quick access to emergency resources and alert system
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Emergency Alert Section */}
            <div>
              <div className="bg-white rounded-xl border border-pink-100 shadow-sm p-6 flex flex-col items-center">
                <h2 className="text-xl font-semibold text-pink-900 mb-6 text-center">Emergency Alert</h2>
                
                <div className="mb-6">
                  <EmergencyButton size="lg" />
                </div>
                
                <p className="text-pink-700 text-sm text-center mb-4">
                  Press the emergency button to alert your contacts with your location information
                </p>
                
                <div className="w-full mt-4">
                  <div className="bg-pink-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-pink-900">Emergency Message</h3>
                      
                      {!isEditingMessage && (
                        <button
                          onClick={() => setIsEditingMessage(true)}
                          className="text-xs text-pink-600 hover:text-pink-800 px-2 py-1 rounded hover:bg-pink-100 transition-colors"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    
                    {isEditingMessage ? (
                      <form onSubmit={handleUpdateMessage} className="mt-2">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          className="w-full p-2 border border-pink-200 rounded-md text-sm"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingMessage(false);
                              setMessageInput(emergencyMessage);
                            }}
                            className="px-3 py-1 text-sm text-pink-700 hover:bg-pink-100 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 text-sm bg-pink-500 text-white rounded hover:bg-pink-600"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-sm text-pink-800 italic">"{emergencyMessage}"</p>
                    )}
                    
                    <div className="flex items-center mt-4 text-xs text-pink-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Your location will be shared</span>
                      <button 
                        onClick={toggleLocationDemo}
                        className="ml-1 underline hover:text-pink-800"
                      >
                        (Test location)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <SafetyTipsCard 
                  title="Emergency Response Tips" 
                  tips={EMERGENCY_TIPS} 
                />
              </div>
            </div>
            
            {/* Emergency Contacts Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-pink-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-pink-100 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-pink-900">Emergency Contacts</h2>
                  
                  {!isAddingContact && (
                    <button
                      onClick={() => setIsAddingContact(true)}
                      className="flex items-center px-3 py-1 text-sm font-medium text-pink-600 hover:text-pink-800 hover:bg-pink-50 rounded-full transition-colors"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add Contact
                    </button>
                  )}
                </div>
                
                <div className="p-6">
                  {isAddingContact && (
                    <div className="mb-8 bg-pink-50 rounded-lg p-4">
                      <h3 className="font-medium text-pink-900 mb-3">Add New Contact</h3>
                      
                      <form onSubmit={handleAddContact} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-pink-700 mb-1">Name</label>
                          <input
                            type="text"
                            value={newContact.name}
                            onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                            className="w-full p-2 border border-pink-200 rounded-md"
                            placeholder="Contact name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-pink-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            value={newContact.phone}
                            onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                            className="w-full p-2 border border-pink-200 rounded-md"
                            placeholder="Phone number"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-pink-700 mb-1">Relationship</label>
                          <input
                            type="text"
                            value={newContact.relationship}
                            onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                            className="w-full p-2 border border-pink-200 rounded-md"
                            placeholder="E.g., Family, Friend, Neighbor"
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingContact(false);
                              setNewContact({ name: '', phone: '', relationship: '' });
                            }}
                            className="px-4 py-2 text-sm text-pink-700 hover:bg-pink-100 rounded-md"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600"
                          >
                            Save Contact
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  
                  {contacts.length > 0 ? (
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <div key={contact.id} className="flex justify-between items-center p-4 border border-pink-100 rounded-lg hover:border-pink-200 transition-colors">
                          <div className="flex items-center">
                            <div className="bg-pink-100 w-10 h-10 rounded-full flex items-center justify-center text-pink-600">
                              <Users className="w-5 h-5" />
                            </div>
                            <div className="ml-3">
                              <div className="font-medium text-pink-900">{contact.name}</div>
                              <div className="text-sm text-pink-600 flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {contact.phone}
                                {contact.relationship && (
                                  <span className="ml-2 text-xs bg-pink-100 px-2 py-0.5 rounded-full">
                                    {contact.relationship}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDeleteContact(contact.id, contact.name)}
                              className="text-pink-600 hover:text-pink-800 p-1 hover:bg-pink-50 rounded-full transition-colors"
                              aria-label="Remove contact"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-pink-700 mb-4">No emergency contacts added yet.</p>
                      {!isAddingContact && (
                        <button
                          onClick={() => setIsAddingContact(true)}
                          className="px-4 py-2 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 transition-colors"
                        >
                          Add your first contact
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Resources */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Local Police Departments"
                  description="Find contact information for police departments in your area."
                  icon={<Shield className="w-6 h-6" />}
                  link="https://www.usa.gov/local-governments"
                />
                
                <ResourceCard
                  title="Crisis Text Line"
                  description="Text HOME to 741741 to connect with a Crisis Counselor."
                  icon={<MessageSquare className="w-6 h-6" />}
                  link="https://www.crisistextline.org/"
                />
                
                <ResourceCard
                  title="Safe Shelter Directory"
                  description="Find safe shelters and resources for women in crisis situations."
                  icon={<MapPin className="w-6 h-6" />}
                  link="https://www.womenslaw.org/find-help/advocates-and-shelters"
                />
                
                <ResourceCard
                  title="Safety Planning Guide"
                  description="Learn how to create a personalized safety plan for various situations."
                  icon={<AlertTriangle className="w-6 h-6" />}
                  link="https://www.thehotline.org/create-a-safety-plan/"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmergencyAlert;
