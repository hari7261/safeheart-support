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
        }
      }
      
      const userProfile = getUserProfile();
      
      // Format the emergency message with complete details
      let fullMessage = `EMERGENCY ALERT\n\n`;
      fullMessage += `${emergencyMessage || "I need help. This is an emergency."}\n\n`;
      
      if (locationData) {
        const mapLink = getLocationMapLink(locationData);
        fullMessage += `My current location: ${mapLink}\n`;
        fullMessage += `Coordinates: ${locationData.latitude}, ${locationData.longitude}\n\n`;
      }
      
      if (userProfile.name) {
        fullMessage += `Sent by: ${userProfile.name}\n`;
      }
      if (userProfile.email) {
        fullMessage += `Contact email: ${userProfile.email}\n`;
      }
      
      fullMessage += "\nPlease contact me or emergency services immediately.";
      
      console.log('EMERGENCY ALERT TRIGGERED');
      console.log(`Email content: ${fullMessage}`);
      
      // Log the emails that would be sent (for demonstration)
      contacts.forEach(contact => {
        console.log(`Sending email to ${contact.name} (${contact.email}): ${fullMessage}`);
      });

      // In a real implementation, this would call a backend API to send emails
      return {
        success: true,
        sentTo: contacts.length,
        timestamp: new Date().toISOString(),
        includesLocation: !!locationData,
        message: fullMessage
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
