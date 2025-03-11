
import { useState, useEffect } from 'react';
import { EmergencyContact, getEmergencyContacts, saveEmergencyContact, deleteEmergencyContact, getUserProfile, saveUserProfile } from '../utils/localStorage';

export function useEmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [emergencyMessage, setEmergencyMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);

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

  const getCurrentLocation = (): Promise<{latitude: number, longitude: number}> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(location);
          resolve(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const getLocationMapLink = (location: {latitude: number, longitude: number}) => {
    return `https://maps.google.com/maps?q=${location.latitude},${location.longitude}`;
  };

  const sendEmergencyAlert = async () => {
    try {
      // Get current location
      let locationData = location;
      if (!locationData) {
        try {
          locationData = await getCurrentLocation();
        } catch (error) {
          console.error("Failed to get location:", error);
          // Continue without location if not available
        }
      }
      
      const userProfile = getUserProfile();
      
      // Prepare the complete emergency message with location
      let fullMessage = emergencyMessage || "I need help. This is an emergency.";
      
      if (locationData) {
        const mapLink = getLocationMapLink(locationData);
        fullMessage += `\n\nMy current location: ${mapLink}`;
      }
      
      fullMessage += "\n\nPlease call me or emergency services immediately.";
      
      console.log('EMERGENCY ALERT TRIGGERED');
      console.log(`Message to send: ${fullMessage}`);
      
      // In a real app, this would send SMS via a service like Twilio
      contacts.forEach(contact => {
        console.log(`Sending to ${contact.name} (${contact.phone}): ${fullMessage}`);
        // TODO: In a production app, this would call a backend API to send SMS
      });

      // Return success for demo purposes
      return {
        success: true,
        sentTo: contacts.length,
        timestamp: new Date().toISOString(),
        includesLocation: !!locationData
      };
    } catch (error) {
      console.error("Error in sendEmergencyAlert:", error);
      throw error;
    }
  };

  return {
    contacts,
    emergencyMessage,
    loading,
    location,
    addContact,
    removeContact,
    updateEmergencyMessage,
    sendEmergencyAlert,
    getCurrentLocation
  };
}
