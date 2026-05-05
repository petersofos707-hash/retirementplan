import { Redirect } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { EmptyState } from "../../components/EmptyState";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { ShiftCard } from "../../components/ShiftCard";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function BrowseShiftsScreen() {
  const { currentUser } = useAuth();
  const { data, applyForShift } = useMarketplace();
  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "trainer") return <Redirect href="/" />;

  const trainer = data.trainers.find((item) => item.userId === currentUser.id) ?? data.trainers[0];
  const shifts = data.shifts.filter((shift) => shift.status === "open" || shift.status === "application_received");

  return (
    <Screen>
      <Text style={styles.title}>Browse shifts</Text>
      <Text style={styles.subtitle}>Open shifts show trainer pay only. The organisation fee is not deducted from trainer pay.</Text>
      {shifts.length === 0 ? (
        <EmptyState title="No open shifts" message="Log in as Organisation and post a shift to create new work." />
      ) : (
        shifts.map((shift) => {
          const organisation = data.organisations.find((item) => item.id === shift.organisationId);
          const application = data.applications.find((item) => item.shiftId === shift.id && item.trainerId === trainer.id);
          const canApply = !application && trainer.verificationStatus === "verified";
          return (
            <ShiftCard key={shift.id} shift={shift} organisationName={organisation?.organisationName}>
              {application ? <Text style={styles.success}>Application status: {application.status}</Text> : null}
              {!canApply && !application ? <Text style={styles.note}>Trainer must be verified before applying for verified shifts.</Text> : null}
              {canApply ? <PrimaryButton label="Apply for shift" onPress={() => applyForShift(shift.id, trainer.id)} /> : null}
            </ShiftCard>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primary, fontSize: 30, fontWeight: "900", paddingTop: 16 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  note: { color: colors.pending, fontWeight: "800", lineHeight: 20 },
  success: { color: colors.verified, fontWeight: "900" }
});
