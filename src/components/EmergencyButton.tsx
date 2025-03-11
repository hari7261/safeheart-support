import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, MapPin } from 'lucide-react';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface EmergencyButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function EmergencyButton({ size = 'md', className = '' }: EmergencyButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [locationStatus, setLocationStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const { contacts, sendEmergencyAlert, getCurrentLocation } = useEmergencyContacts();
  const navigate = useNavigate();
  
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  };

  // Check location permission on mount
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }

    try {
      // Try to get the current position which will prompt for permission if not already granted
      navigator.permissions?.query({ name: 'geolocation' })
        .then((result) => {
          setLocationStatus(result.state === 'granted' ? 'granted' : 'denied');
          
          // Set up a listener for permission changes
          result.onchange = () => {
            setLocationStatus(result.state === 'granted' ? 'granted' : 'denied');
          };
        })
        .catch(() => {
          // If permissions API isn't supported, we'll try getting location directly
          getCurrentLocation()
            .then(() => setLocationStatus('granted'))
            .catch(() => setLocationStatus('denied'));
        });
    } catch (error) {
      console.error("Error checking location permission:", error);
      setLocationStatus('denied');
    }
  };
  
  const handlePress = () => {
    // Check if contacts exist before starting the countdown
    if (contacts.length === 0) {
      toast({
        title: "No emergency contacts",
        description: "Please add emergency contacts before using the alert feature.",
        variant: "destructive",
      });
      
      // Navigate to the emergency page to add contacts
      navigate('/emergency');
      return;
    }

    // If location permission is denied, warn the user but proceed anyway
    if (locationStatus === 'denied') {
      toast({
        title: "Location access denied",
        description: "Your location will not be shared with emergency contacts. Consider enabling location for better assistance.",
        variant: "warning",
      });
    } else if (locationStatus === 'unknown') {
      // Try to get permission now
      checkLocationPermission();
    }
    
    setIsActive(true);
    // Start a 3-second countdown
    setCountdown(3);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          // Trigger alert after countdown
          if (prev !== null) {
            triggerAlert();
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleCancel = () => {
    setIsActive(false);
    setCountdown(null);
    toast({
      title: "Emergency alert canceled",
      description: "The emergency alert has been canceled.",
      variant: "default",
    });
  };
  
  const triggerAlert = async () => {
    // Send emergency alert
    try {
      const result = await sendEmergencyAlert();
      
      if (result.success) {
        const locationInfo = result.includesLocation 
          ? "Your current location was shared." 
          : "Location could not be shared.";
          
        toast({
          title: "Emergency alert sent",
          description: `Alert sent to ${result.sentTo} contacts. ${locationInfo} They have been prompted to call you or emergency services.`,
          variant: "default",
        });
      } else {
        throw new Error("Failed to send alert");
      }
    } catch (error) {
      toast({
        title: "Failed to send alert",
        description: "There was an error sending the emergency alert.",
        variant: "destructive",
      });
    } finally {
      setIsActive(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {countdown !== null && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-md text-pink-600 font-bold">
          {countdown}
        </div>
      )}
      
      <button
        onClick={isActive ? handleCancel : handlePress}
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center focus:outline-none transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse shadow-lg scale-110'
            : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:shadow-md hover:scale-105'
        }`}
      >
        <span className="sr-only">{isActive ? 'Cancel Emergency Alert' : 'Emergency Alert'}</span>
        
        {isActive ? (
          <AlertTriangle className="text-white w-1/2 h-1/2" />
        ) : (
          <ShieldAlert className="text-white w-1/2 h-1/2" />
        )}
        
        {/* Location status indicator */}
        {locationStatus === 'granted' && (
          <div className="absolute bottom-0 right-0 bg-green-400 rounded-full p-1 border-2 border-white">
            <MapPin className="text-white w-3 h-3" />
          </div>
        )}
        
        {/* Ripple effect */}
        {isActive && (
          <span className="absolute inset-0 rounded-full animate-ripple bg-red-400/30"></span>
        )}
      </button>
      
      <p className="text-center text-sm mt-2 font-medium text-pink-700">
        {isActive ? 'Tap to cancel' : 'Emergency'}
      </p>
    </div>
  );
}
