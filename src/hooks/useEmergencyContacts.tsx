
import { useState, useEffect } from 'react';
import { EmergencyContact, getEmergencyContacts, saveEmergencyContact, deleteEmergencyContact, getUserProfile, saveUserProfile } from '../utils/localStorage';

export function useEmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedContacts = getEmergencyContacts();
    const userProfile = getUserProfile();
    
    setContacts(storedContacts);
    setEmergencyMessage(userProfile.emergencyMessage);
    setLoading(false);
  }, []);

  const addContact = (name: string, phone: string, relationship: string) => {
    const newContact = saveEmergencyContact({
      name,
      phone,
      relationship
    });
    
    setContacts(prev => [...prev, newContact]);
    return newContact;
  };

  const removeContact = (id: string) => {
    deleteEmergencyContact(id);
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const updateEmergencyMessage = (message: string) => {
    const userProfile = getUserProfile();
    saveUserProfile({
      ...userProfile,
      emergencyMessage: message
    });
    setEmergencyMessage(message);
  };

  const sendEmergencyAlert = async () => {
    // In a real app, this would integrate with Twilio or another SMS service
    // For this demo, we'll simulate sending messages by logging them
    const userProfile = getUserProfile();
    
    console.log('EMERGENCY ALERT TRIGGERED');
    console.log(`Message to send: ${emergencyMessage}`);
    
    contacts.forEach(contact => {
      console.log(`Sending to ${contact.name} (${contact.phone}): ${emergencyMessage}`);
    });

    // Return success for demo purposes
    return {
      success: true,
      sentTo: contacts.length,
      timestamp: new Date().toISOString()
    };
  };

  return {
    contacts,
    emergencyMessage,
    loading,
    addContact,
    removeContact,
    updateEmergencyMessage,
    sendEmergencyAlert
  };
}
