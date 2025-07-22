'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import IncidentPlayer from './IncidentPlayer';
import IncidentList from './IncidentList';
import CameraTimeline from './CameraTimeline';
import { Incident } from '@/lib/types';
import { toast, Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [resolvedIncidents, setResolvedIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(true);
  const [showResolved, setShowResolved] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

 
  useEffect(() => {
    fetchIncidents();
    fetchResolvedIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/incidents?resolved=false')

      if (response.ok) {
        const data = await response.json();
        // Convert date strings to Date objects
        const incidentsWithDates = data.map((incident: any) => ({
          ...incident,
          tsStart: new Date(incident.tsStart),
          tsEnd: new Date(incident.tsEnd),
          createdAt: new Date(incident.createdAt),
          updatedAt: new Date(incident.updatedAt),
          camera: {
            ...incident.camera,
            createdAt: new Date(incident.camera.createdAt),
            updatedAt: new Date(incident.camera.updatedAt)
          }
        }));
        setIncidents(incidentsWithDates);
        
        if (incidentsWithDates.length > 0 && !showResolved) {
          setSelectedIncident(incidentsWithDates[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchResolvedIncidents = async () => {
    try {
      const response = await fetch('/api/incidents?resolved=true')

      if (response.ok) {
        const data = await response.json();
        // Convert date strings to Date objects
        const incidentsWithDates = data.map((incident: any) => ({
          ...incident,
          tsStart: new Date(incident.tsStart),
          tsEnd: new Date(incident.tsEnd),
          createdAt: new Date(incident.createdAt),
          updatedAt: new Date(incident.updatedAt),
          camera: {
            ...incident.camera,
            createdAt: new Date(incident.camera.createdAt),
            updatedAt: new Date(incident.camera.updatedAt)
          }
        }));
        setResolvedIncidents(incidentsWithDates);
      }
    } catch (error) {
      console.error('Error fetching resolved incidents:', error);
    }
  }

  const handleResolveIncident = async (incidentId: string) => {
    try {
      toast.loading("Processing incident...");
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      });

      if (response.ok) {
        const data = await response.json();
       
        const updatedIncident = {
          ...data,
          tsStart: new Date(data.tsStart),
          tsEnd: new Date(data.tsEnd),
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          camera: {
            ...data.camera,
            createdAt: new Date(data.camera.createdAt),
            updatedAt: new Date(data.camera.updatedAt)
          }
        };
        
        if (updatedIncident.resolved) {
          toast.success("Incident resolved successfully!");
          setIncidents(prev => prev.filter(incident => incident.id !== incidentId));
          setResolvedIncidents(prev => [...prev, updatedIncident]);
          
          if (selectedIncident?.id === incidentId && !showResolved) {
            const remainingIncidents = incidents.filter(incident => incident.id !== incidentId);
            setSelectedIncident(remainingIncidents.length > 0 ? remainingIncidents[0] : null);
          }
        } else {
          toast.success("Incident reopened successfully!");
          setResolvedIncidents(prev => prev.filter(incident => incident.id !== incidentId));
          setIncidents(prev => [...prev, updatedIncident]);
          
          if (selectedIncident?.id === incidentId && showResolved) {
            const remainingResolved = resolvedIncidents.filter(incident => incident.id !== incidentId);
            setSelectedIncident(remainingResolved.length > 0 ? remainingResolved[0] : null);
          }
        }
      } else {
        toast.error("Failed to update incident. Please try again.");
      }
    } catch (error) {
      console.error('Error resolving incident:', error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleToggleView = () => {
    setShowResolved(!showResolved);

    if (!showResolved && resolvedIncidents.length > 0) {
      setSelectedIncident(resolvedIncidents[0]);
    } else if (showResolved && incidents.length > 0) {
      setSelectedIncident(incidents[0]);
    } else {
      setSelectedIncident(null);
    }
  };

  const handleTimeChange = (timestamp: Date) => {
    setCurrentTime(timestamp);
   
  };

  const handleTimelineIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
    setCurrentTime(incident.tsStart);
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#ffffff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Navbar />
      
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          

          <div className="flex h-[449px]  min-h-0 overflow-hidden mt-5">
            {/* Left - Main Video Feed */}
            <div className="flex-1 w-[796px] mx-5 overflow-hidden">

              <IncidentPlayer 
                selectedIncident={selectedIncident}
                loading={loading}
                currentTime={currentTime}
              />

            </div>

            {/* Right - Incidents Panel */}
            <div className="w-[572px] overflow-hidden">
              <IncidentList
                incidents={showResolved ? resolvedIncidents : incidents}
                resolvedCount={resolvedIncidents.length}
                showResolved={showResolved}
                onToggleView=
                {handleToggleView}

                selectedIncident={selectedIncident}
                onSelectIncident={setSelectedIncident}
                onResolveIncident={handleResolveIncident}
                loading={loading}
              />
            </div>
          </div>

          {/* Bottom Section - Camera Timeline */}
          <div className="h-[30vh] border- border-gray-800 flex-shrink-0">
            <CameraTimeline 
              incidents={[...incidents, ...resolvedIncidents]}
              selectedIncident={selectedIncident}
              onTimeChange={handleTimeChange}
              onIncidentSelect={handleTimelineIncidentSelect}
              currentTime={currentTime}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
