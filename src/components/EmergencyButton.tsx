
import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
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
  const { contacts, sendEmergencyAlert } = useEmergencyContacts();
  const navigate = useNavigate();
  
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
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
        toast({
          title: "Emergency alert sent",
          description: `Alert sent to ${result.sentTo} contacts.`,
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
