import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { EmptyState } from "../../components/EmptyState";
import { InfoCard } from "../../components/InfoCard";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function ApplicantsScreen() {
  const { currentUser } = useAuth();
  const { data, acceptApplication } = useMarketplace();
  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "organisation") return <Redirect href="/" />;

  const organisationIds = data.organisations.filter((org) => org.userId === currentUser.id).map((org) => org.id);
  const organisationShifts = data.shifts.filter((shift) => organisationIds.includes(shift.organisationId));
  const applications = data.applications.filter((application) => organisationShifts.some((shift) => shift.id === application.shiftId));

  return (
    <Screen>
      <Text style={styles.title}>Applicants</Text>
      <Text style={styles.subtitle}>Accepting one trainer books the shift and automatically declines other pending applications.</Text>
      {applications.length === 0 ? (
        <EmptyState title="No applicants yet" message="Post a shift or log in as Trainer to apply for an open shift." />
      ) : (
        applications.map((application) => {
          const shift = data.shifts.find((item) => item.id === application.shiftId);
          const trainer = data.trainers.find((item) => item.id === application.trainerId);
          if (!shift || !trainer) return null;
          return (
            <InfoCard key={application.id} title={trainer.fullName} subtitle={`${shift.title} | ${shift.date} | ${shift.location}`}>
              <View style={styles.row}>
                <StatusBadge label={application.status} tone={application.status === "accepted" || application.status === "completed" ? "verified" : application.status === "declined" ? "warning" : "pending"} />
                <StatusBadge label={trainer.verificationStatus.replace("_", " ")} tone={trainer.verificationStatus === "verified" ? "verified" : "pending"} />
              </View>
              <Text style={styles.note}>Rating {trainer.averageRating.toFixed(1)} | Reliability {trainer.reliabilityScore} | Completed {trainer.completedShifts}</Text>
              {application.status === "pending" && shift.status !== "booked" ? <PrimaryButton label="Accept trainer" onPress={() => acceptApplication(application.id)} /> : null}
            </InfoCard>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primary, fontSize: 30, fontWeight: "900", paddingTop: 16 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  note: { color: colors.muted, lineHeight: 20 }
});
