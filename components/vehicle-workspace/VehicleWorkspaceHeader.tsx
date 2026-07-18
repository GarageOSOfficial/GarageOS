import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type WorkspaceSection = 'overview' | 'timeline' | 'photos' | 'about';

interface VehicleWorkspaceHeaderProps {
  vehicleId: string;
  title: string;
  subtitle: string;
  activeSection: WorkspaceSection;
  showNewActivityButton?: boolean;
}

const sections: { key: WorkspaceSection; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'photos', label: 'Photos' },
  { key: 'about', label: 'About' },
];

function sectionPath(section: WorkspaceSection) {
  if (section === 'overview') {
    return '/vehicle/[vehicleId]';
  }

  return `/vehicle/[vehicleId]/${section}`;
}

export function VehicleWorkspaceHeader({
  vehicleId,
  title,
  subtitle,
  activeSection,
  showNewActivityButton = true,
}: VehicleWorkspaceHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        {showNewActivityButton ? (
          <Pressable
            style={styles.newActivityButton}
            onPress={() =>
              router.push({
                pathname: '/vehicle/[vehicleId]/activity/new',
                params: { vehicleId },
              })
            }>
            <Text style={styles.newActivityButtonText}>+ New Activity</Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.sectionsRow}>
        {sections.map((section) => {
          const isActive = section.key === activeSection;

          return (
            <Pressable
              key={section.key}
              style={[styles.sectionButton, isActive ? styles.sectionButtonActive : null]}
              onPress={() =>
                router.replace({
                  pathname: sectionPath(section.key),
                  params: { vehicleId },
                })
              }>
              <Text style={[styles.sectionButtonText, isActive ? styles.sectionButtonTextActive : null]}>
                {section.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  backButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#E2E8F0',
    fontWeight: '600',
  },
  newActivityButton: {
    borderRadius: 10,
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  newActivityButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 15,
    marginTop: 4,
    marginBottom: 12,
  },
  sectionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sectionButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  sectionButtonText: {
    color: '#CBD5E1',
    fontWeight: '600',
    fontSize: 13,
  },
  sectionButtonTextActive: {
    color: '#FFFFFF',
  },
});
