import { ComparisonMetric, RiskCategory } from './types';

// --- INSTITUTIONAL DATA (Existing) ---

export const COMPARISON_DATA: ComparisonMetric[] = [
  {
    id: '1',
    metric: 'Congruencia en datos personales',
    institutionValue: 5.2,
    nationalAverage: 4.8,
    status: 'superior',
    statusLabel: 'Ligeramente superior'
  },
  {
    id: '2',
    metric: 'Congruencia en flujos financieros',
    institutionValue: 14.9,
    nationalAverage: 12.3,
    status: 'superior',
    statusLabel: 'Ligeramente superior'
  },
  {
    id: '3',
    metric: 'Congruencia patrimonial',
    institutionValue: 0.2,
    nationalAverage: 0.8,
    status: 'inferior',
    statusLabel: 'Por abajo del promedio'
  },
  {
    id: '4',
    metric: 'Conflicto de interés',
    institutionValue: 1.0,
    nationalAverage: 0.5,
    status: 'superior',
    statusLabel: 'Ligeramente superior'
  },
  {
    id: '5',
    metric: 'Riesgo global',
    institutionValue: 19.0,
    nationalAverage: 9.0,
    status: 'superior',
    statusLabel: 'Por encima del promedio'
  }
];

export const COMPLETE_RISKS: RiskCategory[] = [
  { title: 'Índice de congruencia en datos personales', count: 52, riskLevel: 'high' },
  { title: 'Índice de congruencia en flujos financieros', count: 2, riskLevel: 'high' },
  { title: 'Índice de congruencia patrimonial', count: 6, riskLevel: 'high' },
  { title: 'Índice de conflicto de interés', count: 0, riskLevel: 'none' },
];

export const SIMPLIFIED_RISKS: RiskCategory[] = [
  { title: 'Índice de congruencia en datos personales', count: 20, riskLevel: 'high' },
  { title: 'Índice de congruencia en flujos financieros', count: 0, riskLevel: 'none' },
  { title: 'Índice de congruencia patrimonial', count: 6, riskLevel: 'high' },
  { title: 'Índice de conflicto de interés', count: 0, riskLevel: 'none' },
];

// --- GENERAL DATA (New) ---

export const GENERAL_COMPARISON_DATA: ComparisonMetric[] = [
  {
    id: 'g1',
    metric: 'Congruencia en datos personales',
    institutionValue: 4.9, // Represents State Average here
    nationalAverage: 4.8,
    status: 'average',
    statusLabel: 'Promedio'
  },
  {
    id: 'g2',
    metric: 'Congruencia en flujos financieros',
    institutionValue: 11.5,
    nationalAverage: 12.3,
    status: 'inferior',
    statusLabel: 'Por debajo del promedio'
  },
  {
    id: 'g3',
    metric: 'Congruencia patrimonial',
    institutionValue: 0.7,
    nationalAverage: 0.8,
    status: 'average',
    statusLabel: 'Promedio'
  },
  {
    id: 'g4',
    metric: 'Conflicto de interés',
    institutionValue: 0.6,
    nationalAverage: 0.5,
    status: 'superior',
    statusLabel: 'Ligeramente superior'
  },
  {
    id: 'g5',
    metric: 'Riesgo global',
    institutionValue: 10.2,
    nationalAverage: 9.0,
    status: 'superior',
    statusLabel: 'Ligeramente superior'
  }
];

export const GENERAL_COMPLETE_RISKS: RiskCategory[] = [
  { title: 'Índice de congruencia en datos personales', count: 412, riskLevel: 'medium' },
  { title: 'Índice de congruencia en flujos financieros', count: 85, riskLevel: 'medium' },
  { title: 'Índice de congruencia patrimonial', count: 124, riskLevel: 'high' },
  { title: 'Índice de conflicto de interés', count: 15, riskLevel: 'low' },
];

export const GENERAL_SIMPLIFIED_RISKS: RiskCategory[] = [
  { title: 'Índice de congruencia en datos personales', count: 850, riskLevel: 'high' },
  { title: 'Índice de congruencia en flujos financieros', count: 12, riskLevel: 'low' },
  { title: 'Índice de congruencia patrimonial', count: 45, riskLevel: 'medium' },
  { title: 'Índice de conflicto de interés', count: 5, riskLevel: 'none' },
];