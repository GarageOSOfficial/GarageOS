import { DocumentationScore, Vehicle, VehicleDocument } from '@/types';

import { listVehicleActivities } from './activity-service';
import { listVehicleDocuments } from './document-service';
import { getUserVehicle } from './garage-service';

interface BuildPassportData {
  vehicle: Vehicle;
  activitiesCount: number;
  documents: VehicleDocument[];
  documentationScore: DocumentationScore;
}

function clampRatio(value: number) {
  return Math.max(0, Math.min(1, value));
}

function toPercentScore(value: number) {
  return Math.round(clampRatio(value) * 100);
}

export function calculateDocumentationScore(
  vehicle: Vehicle,
  activitiesCount: number,
  activityPhotoCount: number,
  documents: VehicleDocument[]
): DocumentationScore {
  const countByType = (type: VehicleDocument['document_type']) =>
    documents.filter((document) => document.document_type === type).length;

  const vehicleInformationFields = [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.vin,
    vehicle.color,
    vehicle.mileage,
    vehicle.engine,
    vehicle.transmission,
  ];

  const completedVehicleFields = vehicleInformationFields.filter((field) => {
    if (typeof field === 'number') {
      return Number.isFinite(field);
    }

    return Boolean(field);
  }).length;

  const maintenanceRecordsCount = activitiesCount + countByType('Inspection Reports');

  const requiredDocumentCategories: VehicleDocument['document_type'][] = ['Registration', 'Insurance'];
  const requiredDocumentsCompleted = requiredDocumentCategories.filter((type) => countByType(type) > 0).length;

  const categories: DocumentationScore['categories'] = [
    {
      key: 'vehicleInformation',
      label: 'Vehicle Information',
      score: toPercentScore(completedVehicleFields / vehicleInformationFields.length),
    },
    {
      key: 'photos',
      label: 'Photos',
      score: toPercentScore((activityPhotoCount + (vehicle.image_url ? 1 : 0)) / 6),
    },
    {
      key: 'activities',
      label: 'Activities',
      score: toPercentScore(activitiesCount / 8),
    },
    {
      key: 'receipts',
      label: 'Receipts',
      score: toPercentScore(countByType('Receipts') / 5),
    },
    {
      key: 'manuals',
      label: 'Manuals',
      score: toPercentScore(countByType('Manuals') / 2),
    },
    {
      key: 'maintenanceRecords',
      label: 'Maintenance Records',
      score: toPercentScore(maintenanceRecordsCount / 8),
    },
    {
      key: 'requiredDocuments',
      label: 'Required Documents',
      score: toPercentScore(requiredDocumentsCompleted / requiredDocumentCategories.length),
    },
  ];

  return {
    totalScore: Math.round(categories.reduce((sum, category) => sum + category.score, 0) / categories.length),
    categories,
  };
}

export async function getVehicleBuildPassportData(userId: string, vehicleId: string) {
  const [vehicleResult, activitiesResult, documentsResult] = await Promise.all([
    getUserVehicle(userId, vehicleId),
    listVehicleActivities(userId, vehicleId),
    listVehicleDocuments(userId, vehicleId),
  ]);

  const error = vehicleResult.error || activitiesResult.error || documentsResult.error;

  if (error || !vehicleResult.data) {
    return {
      data: null,
      error: error ?? { message: 'Vehicle not found.' },
    };
  }

  const activityPhotoCount = activitiesResult.data.reduce((sum, activity) => sum + activity.photos.length, 0);

  return {
    data: {
      vehicle: vehicleResult.data,
      activitiesCount: activitiesResult.data.length,
      documents: documentsResult.data,
      documentationScore: calculateDocumentationScore(
        vehicleResult.data,
        activitiesResult.data.length,
        activityPhotoCount,
        documentsResult.data
      ),
    } satisfies BuildPassportData,
    error: null,
  };
}
