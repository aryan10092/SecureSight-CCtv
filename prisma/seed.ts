import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Shop Floor A',
        location: 'Main Production Area - Level 1',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Vault',
        location: 'Security Vault - Basement Level',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Entrance',
        location: 'Main Entrance - Ground Floor',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Parking Lot',
        location: 'Outdoor Parking Area - North Side',
      },
    }),
  ]);

  console.log('Created cameras:', cameras);

  // Create incidents with realistic timestamps over a 24-hour span
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const incidentTypes = [
    'Unauthorised Access',
    'Gun Threat',
    'Face Recognised',
    'Suspicious Activity',
    'Theft Alert',
    'Fire Detected',
  ];

  const incidents = [];

  // Generate 12+ incidents across different cameras and times
  for (let i = 0; i < 15; i++) {
    const randomHoursAgo = Math.random() * 24;
    const startTime = new Date(twentyFourHoursAgo.getTime() + randomHoursAgo * 60 * 60 * 1000);
    const endTime = new Date(startTime.getTime() + Math.random() * 10 * 60 * 1000); // 0-10 minutes duration
    
    const incident = await prisma.incident.create({
      data: {
        cameraId: cameras[Math.floor(Math.random() * cameras.length)].id,
        type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
        tsStart: startTime,
        tsEnd: endTime,
        thumbnailUrl: `/thumbnails/incident${(i % 12) + 1}.jpg`,
        resolved: Math.random() > 0.7, // 30% chance of being resolved
      },
    });

    incidents.push(incident);
  }

  console.log('Created incidents:', incidents.length);

  // Log some sample data
  const sampleIncidents = await prisma.incident.findMany({
    include: { camera: true },
    take: 5,
    orderBy: { tsStart: 'desc' },
  });

  console.log('Sample incidents with camera data:');
  sampleIncidents.forEach((incident) => {
    console.log(`- ${incident.type} at ${incident.camera.name} (${incident.camera.location}) - ${incident.resolved ? 'Resolved' : 'Unresolved'}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
