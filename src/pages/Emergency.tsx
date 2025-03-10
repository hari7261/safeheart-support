
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmergencyButton } from '@/components/EmergencyButton';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { SafetyTipsCard } from '@/components/SafetyTipsCard';
import { Shield, Phone, MessageSquare, User, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Emergency = () => {
  const { 
    contacts, 
    emergencyMessage,
    updateEmergencyMessage,
    addContact,
    removeContact
  } = useEmergencyContacts();
  
  const [message, setMessage] = useState(emergencyMessage);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });
  const [showAddContact, setShowAddContact] = useState(false);
  
  const handleUpdateMessage = () => {
    updateEmergencyMessage(message);
    toast({
      title: "Message updated",
      description: "Your emergency message has been updated successfully.",
    });
  };
  
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing information",
        description: "Please provide both name and phone number.",
        variant: "destructive",
      });
      return;
    }
    
    addContact(newContact.name, newContact.phone, newContact.relationship);
    
    toast({
      title: "Contact added",
      description: `${newContact.name} has been added to your emergency contacts.`,
    });
    
    // Reset form
    setNewContact({
      name: '',
      phone: '',
      relationship: ''
    });
    setShowAddContact(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-900 mb-2">Emergency Resources</h1>
            <p className="text-pink-700">
              Quick access to safety features and emergency contacts
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Emergency Button */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6 text-center">
                <h2 className="text-xl font-semibold text-pink-900 mb-4">Emergency Alert</h2>
                <p className="text-pink-600 mb-8">Press and hold this button for 3 seconds to send an alert to your emergency contacts</p>
                
                <div className="flex justify-center mb-8">
                  <EmergencyButton size="lg" />
                </div>
                
                <div className="bg-pink-50 rounded-lg p-4 text-left">
                  <h3 className="text-sm font-medium text-pink-800 mb-2">What happens when you press the button:</h3>
                  <ul className="space-y-2 text-sm text-pink-700">
                    <li className="flex items-start">
                      <Shield className="w-4 h-4 mr-2 mt-0.5 text-pink-500 flex-shrink-0" />
                      Your emergency contacts will receive an SMS with your message
                    </li>
                    <li className="flex items-start">
                      <Phone className="w-4 h-4 mr-2 mt-0.5 text-pink-500 flex-shrink-0" />
                      Your current location will be shared with them
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="w-4 h-4 mr-2 mt-0.5 text-pink-500 flex-shrink-0" />
                      They will be prompted to call you or emergency services
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right column - Emergency Contacts & Message */}
            <div className="lg:col-span-2 space-y-8">
              {/* Emergency Contacts */}
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-pink-900">Emergency Contacts</h2>
                  <button 
                    onClick={() => setShowAddContact(!showAddContact)}
                    className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {showAddContact && (
                  <form onSubmit={handleAddContact} className="mb-6 p-4 bg-pink-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-pink-700 mb-1">Name</label>
                        <input
                          id="name"
                          type="text"
                          value={newContact.name}
                          onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                          className="w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                          placeholder="Contact name"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-pink-700 mb-1">Phone Number</label>
                        <input
                          id="phone"
                          type="tel"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                          className="w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="relationship" className="block text-sm font-medium text-pink-700 mb-1">Relationship (optional)</label>
                      <input
                        id="relationship"
                        type="text"
                        value={newContact.relationship}
                        onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                        className="w-full p-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
                        placeholder="Family, Friend, etc."
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowAddContact(false)}
                        className="px-4 py-2 text-pink-600 hover:text-pink-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200"
                      >
                        Add Contact
                      </button>
                    </div>
                  </form>
                )}
                
                {contacts.length > 0 ? (
                  <div className="divide-y divide-pink-100">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-pink-100 rounded-full p-2 mr-3">
                            <User className="w-5 h-5 text-pink-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-pink-900">{contact.name}</h3>
                            <div className="text-sm text-pink-600 space-x-2">
                              <span>{contact.phone}</span>
                              {contact.relationship && (
                                <span className="text-pink-400">· {contact.relationship}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => {
                            removeContact(contact.id);
                            toast({
                              title: "Contact removed",
                              description: `${contact.name} has been removed from your emergency contacts.`,
                            });
                          }}
                          className="p-2 text-pink-400 hover:text-pink-600 transition-colors"
                          aria-label="Remove contact"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-pink-50/50 rounded-lg">
                    <p className="text-pink-700 mb-2">No emergency contacts added yet</p>
                    <p className="text-sm text-pink-500">Add contacts who should be alerted in case of emergency</p>
                  </div>
                )}
              </div>
              
              {/* Emergency Message */}
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <h2 className="text-xl font-semibold text-pink-900 mb-4">Emergency Message</h2>
                <p className="text-pink-600 mb-4">
                  This message will be sent to your emergency contacts when you activate the alert
                </p>
                
                <div className="space-y-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 h-32 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring focus:ring-pink-200 focus:ring-opacity-50 resize-none transition"
                    placeholder="Example: I'm in an emergency situation and need help. Here is my location."
                  />
                  
                  <button
                    onClick={handleUpdateMessage}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200"
                  >
                    Save Message
                  </button>
                </div>
              </div>
              
              {/* Safety Tips */}
              <SafetyTipsCard />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Emergency;
