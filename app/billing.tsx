import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'

type Plan = {
  plan: string
  bill: Float
}

const features = [
  'Unlimited meal scans',
  'Instant nutrition identification',
  'Detailed calorie estimates',
  'Full meal plan management',
]

export default function Paywall() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>({plan:'trial', bill: 4.99});

  useEffect(() => {
    console.log("Selected plan from billing.tsx: ",selectedPlan);
  })

  const billingMethod = async () => {
    // call backend
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Icon */}
        <View style={styles.iconWrap}>
          <Text style={styles.iconEmoji}>🥗</Text>
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>PRO</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Unlimited Access</Text>

        {/* Features */}
        <View style={styles.featuresWrap}>
          {features.map((f) => (
            <View key={f} style={styles.featureRow}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />


        <View style={styles.planSelectionContainer}>

            {/* Trial Plan */}
            <TouchableOpacity
              style={[styles.planCard, selectedPlan.plan === 'trial' && styles.planCardSelected]}
              onPress={() => setSelectedPlan({plan:'trial', bill: 4.99})}
              activeOpacity={0.8}
            >
              <View>
                <Text style={styles.planLabel}>3-Day Trial</Text>
                <Text style={styles.planSub}>then $4.99 per week</Text>
              </View>
              <View style={styles.planRight}>
                <View style={styles.freeBadge}>
                  <Text style={styles.freeBadgeText}>FREE ✓</Text>
                </View>
                <View style={[styles.radio, selectedPlan.plan === 'trial' && styles.radioSelected]}>
                  {selectedPlan.plan === 'trial' && <View style={styles.radioDot} />}
                </View>
              </View>
            </TouchableOpacity>


            {/* Yearly Plan */}
            <TouchableOpacity
              style={[styles.planCard, selectedPlan.plan === 'yearly' && styles.planCardSelected]}
              onPress={() => setSelectedPlan({plan:'yearly', bill: 29.99})}
              activeOpacity={0.8}
            >
              <View>
                <Text style={styles.planLabel}>Yearly</Text>
                <Text style={styles.planSub}>$29.99 per year</Text>
              </View>
              <View style={styles.planRight}>
                <View style={styles.saveBadge}>
                  <Text style={styles.saveBadgeText}>SAVE 80%</Text>
                </View>
                <View style={[styles.radio, selectedPlan.plan === 'yearly' && styles.radioSelected]}>
                  {selectedPlan.plan === 'yearly' && <View style={styles.radioDot} />}
                </View>

          </View>
        </TouchableOpacity>

      </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85}
        onPress={billingMethod}>
          <Text style={styles.ctaText}>
            {selectedPlan.plan === 'trial' ? 'Try for Free' : 'Get Yearly Plan'}
          </Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <View style={styles.footerLinks}>
          <TouchableOpacity><Text style={styles.footerLink}>Restore</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Terms</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.footerLink}>Privacy Policy</Text></TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const AMBER = '#c8893a'
const AMBER_LIGHT = '#fdf6ec'

const styles = StyleSheet.create({
  container: {
    // marginTop: 20, 
    padding: 20,
    flex: 1,
    backgroundColor: '#fff9e3',
    justifyContent: "center",
    alignItems: "center"
  },
  planSelectionContainer:{
    marginTop: 45
  },
  scroll: {
    padding: 24,
    alignItems: 'center',
  },

  // icon
  iconWrap: {
    marginTop: 20, 
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#f0ece0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconEmoji: {
    fontSize: 40,
  },
  proBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: "#4353FD",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff8ee',
  },

  // title
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginBottom: 20,
  },

  // features
  featuresWrap: {
    // alignItems: "center",
    width: '100%',
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "AMBER_LIGHT",
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 12,
    color: AMBER,
    fontWeight: '600',
  },
  featureText: {
    fontSize: 15,
    color: '#444',
  },

  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#ddd',
    marginBottom: 20,
  },

  // plan cards
  planCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  planCardSelected: {
    borderWidth: 1.5,
    borderColor: AMBER,
    backgroundColor: AMBER_LIGHT,
  },
  planLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  planSub: {
    fontSize: 12,
    color: '#888',
  },
  planRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // badges
  freeBadge: {
    backgroundColor: '#e8f5ee',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  freeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2e7d32',
  },
  saveBadge: {
    backgroundColor: "#4353FD",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  saveBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff8ee',
  },

  // radio
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: "#4353FD",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4353FD",
  },

  // cta
  ctaButton: {
    width: '100%',
    backgroundColor: "#4353FD",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff8ee',
  },

  // footer
  footerLinks: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 16,
  },
  footerLink: {
    fontSize: 12,
    color: '#888',
  },
})