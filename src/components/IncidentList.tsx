import React from 'react';
import { AlertTriangle, Eye, Flame, ShoppingBag, Users, Settings } from 'lucide-react';
import { Incident } from '@/lib/types';
import { formatTime, formatDate, cn } from '@/lib/utils';

interface IncidentListProps {
  incidents: Incident[]
  resolvedCount: number
  showResolved: boolean

  onToggleView: () => void;
  selectedIncident: Incident | null
  onSelectIncident: (incident: Incident) => void;

    onResolveIncident: (incidentId: string) => void;
  loading: boolean;
}

const getIncidentIcon = (type: string) => {
  switch (type) {
    case 'Gun Threat':
      return '🔫';

      case 'Face Recognised':
      return '👤';
    case 'Fire Detected':
      return '🔥';

    case 'Theft Alert':
      return '💰';
  case 'Unauthorised Access':
      return '🚨';
    default:
      return '⚠️';
  }
};

const getIncidentColor = (type: string) => {
  switch (type) {

    case 'Gun Threat':
      return 'border-red-500';

    case 'Face Recognised':
    return 'border-blue-500';
    case 'Fire Detected':
      return 'border-orange-500';
    case 'Theft Alert':
      return 'border-yellow-500';

    case 'Unauthorised Access':
      return 'border-red-400';
    default:
      return 'border-gray-500';
  }
};

export default function IncidentList({
  incidents,
  resolvedCount,
  showResolved,
  onToggleView,
  selectedIncident,
  onSelectIncident,
  onResolveIncident,
  loading
}: IncidentListProps) {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto mb-2"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black border border-gray-800 mr-5">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className={showResolved ? "text-green-500 text-lg" : "text-red-500 text-lg"}>
              {showResolved ? "✅" : "🚨"}
            </span>
            <span className="text-white font-semibold">

              {showResolved ? `${incidents.length} Resolved Incidents` : `${incidents.length} Unresolved Incidents`}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleView}
              className="text-orange-500 hover:text-orange-400 text-sm font-medium"
            >
              {showResolved ? "Show Active" : "Show Resolved"}
            </button>
            <span className="text-gray-400">⚙️</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className={showResolved ? "text-red-500" : "text-green-500"}>
            {showResolved ? "🚨" : "✅"}
          </span>
          <span className="text-gray-400">
            {showResolved ? `${incidents.length > 0 ? incidents.length : 'No'} active incidents` : `${resolvedCount} resolved incidents`}
          </span>
        </div>
      </div>

      {/* Incident List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {incidents.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">{showResolved ? "📋" : "✅"}</div>
              <p className="text-gray-400">
                {showResolved ? "No resolved incidents" : "No active incidents"}
              </p>
              <p className="text-gray-500 text-sm">
                {showResolved ? "Nothing has been resolved yet" : "All clear!"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className={cn(
                  'border-l-4 bg-gray-900 rounded-r-lg p-3 cursor-pointer transition-all duration-200 hover:bg-gray-800',
                  selectedIncident?.id === incident.id ? 'bg-gray-800' : '',
                  getIncidentColor(incident.type)
                )}
                onClick={() => onSelectIncident(incident)}
              >
                {/* Incident Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getIncidentIcon(incident.type)}</span>
                    <div>
                      <h3 className="text-white font-medium text-sm">{incident.type}</h3>
                      <p className="text-gray-400 text-xs flex items-center space-x-1">
                        <span>📹</span>
                        <span>{incident.camera.name}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                    
                      onClick={(e) => {
                        e.stopPropagation();
                        onResolveIncident(incident.id);
                      }}
                      className={`text-xs font-medium ${
                        showResolved 
                          ? 'text-red-500 hover:text-red-400' 
                          : 'text-yellow-500 hover:text-yellow-400'
                      }`}
                    >
                      {showResolved ? 'Unresolve ›' : 'Resolve ›'}
                    </button>
                  </div>
                </div>

                
                {incident.type === 'Face Recognised' && (
                  <div className="mb-2">
                    <p className="text-white font-medium text-sm">Saqib Aqeel</p>
                  </div>
                )}

                {/* Thumbnail */}
                <div className="w-full h-16 bg-gray-800 rounded mb-2 flex items-center justify-center border border-gray-700">
                  <span className="text-xs text-gray-500">📸</span>
                </div>

                {/* Time and Details */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    ⏱️ {formatTime(incident.tsStart)} on {formatDate(incident.tsStart)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
