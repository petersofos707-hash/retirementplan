import { router, Redirect } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { FeeBreakdown } from "../../components/FeeBreakdown";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { TextField } from "../../components/TextField";
import { colors } from "../../constants/colors";
import { calculateFeeBreakdown } from "../../lib/calculations";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function PostShiftScreen() {
  const { currentUser } = useAuth();
  const { data, createShift } = useMarketplace();
  const organisation = data.organisations.find((item) => item.userId === currentUser?.id) ?? data.organisations[0];
  const [title, setTitle] = useState("Match Day Sports Trainer");
  const [sport, setSport] = useState("Soccer");
  const [date, setDate] = useState("Saturday");
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("2:00 PM");
  const [location, setLocation] = useState("Melbourne, VIC");
  const [address, setAddress] = useState("Alamein FC Main Ground");
  const [requiredQualification, setRequiredQualification] = useState("First aid + CPR + sports trainer qualification + WWCC");
  const [duties, setDuties] = useState("Match-day taping, first aid coverage, acute injury response, and coaching staff communication.");
  const [trainerPay, setTrainerPay] = useState("200");
  const [error, setError] = useState<string | null>(null);
  const fees = calculateFeeBreakdown(Number(trainerPay) || 0);

  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "organisation") return <Redirect href="/" />;

  async function handleSubmit() {
    const pay = Number(trainerPay);
    if (!title.trim() || !sport.trim() || !location.trim() || !pay || pay <= 0) {
      setError("Add a title, sport, location, and trainer pay above $0.");
      return;
    }
    await createShift({ organisationId: organisation.id, title, sport, date, startTime, endTime, location, address, requiredQualification, duties, trainerPay: pay });
    router.replace("/(organisation)");
  }

  return (
    <Screen>
      <Text style={styles.title}>Post a shift</Text>
      <Text style={styles.subtitle}>Keep the form practical: clear duties, credentials, protected trainer pay, and transparent organisation cost.</Text>
      <TextField label="Shift title" value={title} onChangeText={setTitle} />
      <TextField label="Sport" value={sport} onChangeText={setSport} />
      <View style={styles.row}><TextField label="Date" value={date} onChangeText={setDate} /><TextField label="Trainer pay" value={trainerPay} onChangeText={setTrainerPay} keyboardType="numeric" /></View>
      <View style={styles.row}><TextField label="Start" value={startTime} onChangeText={setStartTime} /><TextField label="End" value={endTime} onChangeText={setEndTime} /></View>
      <TextField label="Location" value={location} onChangeText={setLocation} />
      <TextField label="Address" value={address} onChangeText={setAddress} />
      <TextField label="Required credentials" value={requiredQualification} onChangeText={setRequiredQualification} />
      <TextField label="Duties" value={duties} onChangeText={setDuties} multiline />
      <FeeBreakdown trainerPay={fees.trainerPay} platformFeeAmount={fees.platformFeeAmount} organisationTotal={fees.organisationTotal} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton label="Post shift" onPress={handleSubmit} />
      <PrimaryButton label="Cancel" variant="secondary" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primary, fontSize: 30, fontWeight: "900", paddingTop: 16 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  row: { flexDirection: "row", gap: 12 },
  error: { color: colors.warning, fontWeight: "800" }
});
