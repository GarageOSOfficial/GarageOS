import { StyleSheet, Text, View } from 'react-native';

import { Vehicle } from '@/types';

interface QuickStatsProps {
  vehicle: Vehicle;
}

export function QuickStats({ vehicle }: QuickStatsProps) {
  const stats = [
    { label: 'Mileage', value: vehicle.mileage?.toLocaleString() ?? '—' },
    { label: 'Year', value: vehicle.year?.toString() ?? '—' },
    { label: 'Engine', value: vehicle.engine ?? '—' },
    { label: 'Transmission', value: vehicle.transmission ?? '—' },
  ];

  return (
    <View style={styles.wrap}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.card}>
          <Text style={styles.label}>{stat.label}</Text>
          <Text style={styles.value}>{stat.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    minWidth: '48%',
    flexGrow: 1,
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 14,
  },
  label: {
    color: '#94A3B8',
    fontSize: 13,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
});
