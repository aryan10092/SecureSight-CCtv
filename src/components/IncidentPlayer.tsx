import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize } from 'lucide-react';
import { Incident } from '@/lib/types';
import { formatTime, formatDate } from '@/lib/utils';

interface IncidentPlayerProps {
  selectedIncident: Incident | null;
  loading: boolean;
  currentTime?: Date;
}

export default function IncidentPlayer({ selectedIncident, loading, currentTime }: IncidentPlayerProps) {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading incidents...</p>
        </div>
      </div>
    );
  }

  if (!selectedIncident) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-6xl mb-4">📹</div>
          <p className="text-gray-400">No incidents to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black relative rounded-2xl ">
      {/* Timestamp overlay */}
      <div className="absolute top-2 left-2 z-10">
        <div className="bg-black bg-opacity-70 rounded px-2 py-1 text-xs text-white">
          📅 {currentTime ? formatDate(currentTime) : formatDate(selectedIncident.tsStart)} - {currentTime ? formatTime(currentTime) : formatTime(selectedIncident.tsStart)}
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-800 to-gray-900">
        {/* Simulated CCTV footage background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full opacity-30"></div>
        </div>
        
        {/* Camera overlay info */}
        <div className="absolute bottom-2 left-2 z-10">
          <div className="bg-black bg-opacity-70 rounded-lg px-2 py-1">
            <div className="text-white font-medium text-sm">📹 Camera - 01</div>
            <div className="text-gray-300 text-xs pl-6">{selectedIncident.camera.name}</div>
          </div>
        </div>

        {/* Center play area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center mb-2 mx-auto">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
            <p className="text-white text-lg font-medium">{selectedIncident.type}</p>

            {/* <p className="text-gray-300 text-sm">{selectedIncident.camera.name}</p> */}
          </div>
        </div>

        {/* Secondary camera feeds */}
        <div className="absolute bottom-2 right-2 flex space-x-1 gap-3">
          <div className="w-24 h-20 bg-gray-800 rounded border border-gray-600 flex items-center justify-center">
            <span className="text-xs text-gray-400">Cam-02</span>
          </div>
          <div className="w-24 h-20 bg-gray-800 rounded border border-gray-600 flex items-center justify-center">
            <span className="text-xs text-gray-400">Cam-03</span>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="bg-black border-t border-gray-800 p-2 flex-shrink-0">
        <div className="flex items-center justify-between"> 
          {/* Playback Controls */}
          <div className="flex items-center space-x-3">
            <button className="text-white hover:text-orange-500" title="Previous">
              <SkipBack className="h-4 w-4" />
            </button>
            <button className="text-white hover:text-orange-500" title="Play">
              <Play className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-orange-500" title="Next">
              <SkipForward className="h-4 w-4" />
            </button>
            <div className="text-white text-xs font-mono">
              {formatTime(selectedIncident.tsStart)} ({formatDate(selectedIncident.tsStart)})
            </div>
          </div>

          {/* Timeline Scrubber */}
          <div className="flex-1 mx-6">
            <div className="relative">
              <div className="h-1 bg-gray-700 rounded-full">
                <div className="h-1 bg-orange-500 rounded-full w-1/3"></div>
              </div>
            </div>
          </div>

          {/* Volume and Settings */}
          <div className="flex items-center space-x-3">
            <div className="text-white text-xs">1x</div>
            <button className="text-white hover:text-orange-500" title="Volume">
              <Volume2 className="h-4 w-4" />
            </button>
            <button className="text-white hover:text-orange-500" title="Fullscreen">
              <Maximize className="h-4 w-4" />
            </button>
          </div>
         </div>
      </div>
    </div>
  );
}
