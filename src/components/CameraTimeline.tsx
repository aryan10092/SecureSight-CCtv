'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Incident } from '@/lib/types';

interface CameraTimelineProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onTimeChange: (timestamp: Date) => void;
  onIncidentSelect: (incident: Incident) => void;
  currentTime?: Date;
}

export default function CameraTimeline({
  incidents,
  selectedIncident,
  onTimeChange,
  onIncidentSelect,
  currentTime = new Date()
}: CameraTimelineProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [scrubberPosition, setScrubberPosition] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  
  const timeToPosition = useCallback((time: Date) => {
    const hours = time.getHours() + time.getMinutes() / 60 + time.getSeconds() / 3600;
    return (hours / 24) * 100;
  }, []);

  
  const positionToTime = useCallback((position: number) => {
    const hours = (position / 100) * 24;
    const date = new Date();
    date.setHours(Math.floor(hours), Math.floor((hours % 1) * 60), Math.floor(((hours % 1) * 60 % 1) * 60), 0);
    return date;
  }, []);

  useEffect(() => {
    setScrubberPosition(timeToPosition(currentTime));
  }, [currentTime, timeToPosition]);

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX;
    const position = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    
    setScrubberPosition(position);
    
    // Snap to nearby incidents (within 1% tolerance)
    const snapTolerance = 1;
    for (const incident of incidents) {
      const incidentPosition = timeToPosition(incident.tsStart);
      if (Math.abs(position - incidentPosition) < snapTolerance) {
        setScrubberPosition(incidentPosition);
        onIncidentSelect(incident);
        onTimeChange(incident.tsStart);
        return;
      }
    }
    
    
    const newTime = positionToTime(position);
    onTimeChange(newTime);
  }, [incidents, timeToPosition, positionToTime, onTimeChange, onIncidentSelect]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  
  const incidentsByCamera = incidents.reduce((acc, incident) => {
    const cameraId = incident.camera.id;
    if (!acc[cameraId]) {
      acc[cameraId] = {
        camera: incident.camera,
        incidents: []
      };
    }
    acc[cameraId].incidents.push(incident);
    return acc;
  }, {} as Record<string, { camera: any; incidents: Incident[] }>);

  
  const getIncidentColor = (type: string) => {
    switch (type) {
      case 'Gun Threat': return '#ef4444'; 
      case 'Face Recognised': return '#3b82f6'; 
      case 'Fire Detected': return '#f97316';
      case 'Theft Alert': return '#eab308'; 
      case 'Unauthorised Access': return '#f87171'; 
      case 'Traffic congestion': return '#06b6d4'; 
      case 'Multiple Events': return '#dc2626'; 
      default: return '#6b7280'; 
    }
  };

  // Get incident icon based on type
  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'Gun Threat': return '🔫';
      case 'Face Recognised': return '👤';
      case 'Fire Detected': return '🔥';
      case 'Theft Alert': return '💰';
      case 'Unauthorised Access': return '🚨';
      case 'Traffic congestion': return '🚗';
      case 'Multiple Events': return '⚠️';
      default: return '⚠️';
    }
  };

  // Generate time labels for the ruler
  const timeLabels = Array.from({ length: 25 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return i === 24 ? '24:00' : `${hour}:00`;
  });

  return (
    <div className="h-full bg-black border-gray-800">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-white font-medium text-sm">Camera List</h3>
        <div className="text-gray-400 text-xs">
          Current: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 p-4">
        {/* Time scale */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            {timeLabels.map((time, index) => (
              <span key={index} className={index % 2 === 0 ? 'text-gray-400' : 'text-transparent'}>
                {index % 2 === 0 ? time : ''}
              </span>
            ))}
          </div>
          <div className="h-px bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"></div>
          <div className="flex justify-between mt-1">
            {timeLabels.map((_, index) => (
              <div key={index} className="w-px h-2 bg-gray-700"></div>
            ))}
          </div>
        </div>

        {/* Main Timeline Container */}
        <div 
          ref={timelineRef}
          className="relative cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Global Scrubber Line */}
          <div
            className={`absolute top-0 bottom-0 w-1 bg-orange-500 z-50 pointer-events-none timeline-scrubber`}
            style={{ left: `calc(${scrubberPosition}% - 2px)` }}
          >
            {/* Scrubber Head */}
            <div className="absolute -top-2 -left-2 w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-lg pointer-events-auto cursor-grab">
              <div className="absolute inset-1 bg-orange-600 rounded-full"></div>
            </div>
            
            {/* Time Display */}
            <div className="absolute -top-8 -left-8 bg-black border border-orange-500 rounded px-2 py-1 text-xs text-white whitespace-nowrap">
              {positionToTime(scrubberPosition).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>

          {/* Camera rows */}
          <div className="space-y-3">
            {Object.entries(incidentsByCamera).map(([cameraId, { camera, incidents: cameraIncidents }], cameraIndex) => (
              <div key={cameraId} className="flex items-center">
                {/* Camera name */}
                <div className="w-24 text-white text-sm font-mono flex items-center">
                  <span className="text-gray-400 mr-2">📹</span>
                  Camera - {String(cameraIndex + 1).padStart(2, '0')}
                </div>

                {/* Timeline bar */}
                <div className="flex-1 relative h-8 bg-gray-900 rounded border border-gray-700">
                  {/* Incident markers for this camera */}
                  {cameraIncidents.map((incident, eventIndex) => {
                    const position = timeToPosition(incident.tsStart);
                    const isSelected = selectedIncident?.id === incident.id;
                    
                    return (
                      <div
                        key={incident.id}
                        className={`absolute top-1 h-6 px-2 rounded text-xs text-white flex items-center cursor-pointer timeline-incident-marker ${
                          isSelected ? 'ring-2 ring-white ring-opacity-50' : ''
                        }`}
                        style={{
                          left: `${position}%`,
                          backgroundColor: getIncidentColor(incident.type),
                          minWidth: '80px',
                          zIndex: isSelected ? 20 : 10
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onIncidentSelect(incident);
                          setScrubberPosition(position);
                        }}
                        title={`${incident.type} at ${incident.tsStart.toLocaleTimeString()}`}
                      >
                        <span className="mr-1">{getIncidentIcon(incident.type)}</span>
                        <span className="truncate">{incident.type}</span>
                        <span className="ml-1 text-xs opacity-75">
                          {incident.tsStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

          
            
             
          </div>
        </div>

        {/* Current time indicator */}
        {/* <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-orange-500 text-sm">🚨 Unauthorised Access</div>
            <div className="text-red-500 text-sm">🔫 Gun Threat</div>
            <div className="text-blue-500 text-sm">👤 Face Recognition</div>
          </div>
          <div className="text-gray-500 text-xs">
            Drag timeline or click incidents to navigate • {incidents.length} incidents today
          </div>
        </div> */}
      </div>
    </div>
  );
}
