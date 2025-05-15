// src/lib/vaccineData.ts
import type { VaccineInfo } from '@/types';

// Vaccine IDs should be simple slugs, e.g., "hepatitis-b", "dtap", "mmr"
const VACCINE_DATA: VaccineInfo[] = [
  {
    id: 'hepatitis-b',
    name: 'Hepatitis B (HepB)',
    description: 'The Hepatitis B vaccine protects against liver infection caused by the Hepatitis B virus (HBV). HBV infection can lead to serious health problems, including liver damage, cirrhosis, liver cancer, and even death.',
    benefits: [
      'Prevents Hepatitis B infection.',
      'Protects against chronic liver disease (cirrhosis) and liver cancer caused by Hepatitis B.',
      'Prevents the spread of Hepatitis B virus to others.',
      'Particularly important for newborns to prevent mother-to-child transmission if the mother is infected.',
    ],
    commonSideEffects: [
      'Soreness, redness, or mild swelling where the shot was given (most common).',
      'Low-grade fever (less than 101°F).',
      'Headache or general tiredness.',
    ],
    seriousSideEffects: [
      'Severe allergic reactions (anaphylaxis) are very rare but can occur (signs include hives, difficulty breathing, swelling of the face or throat). If this happens, seek immediate medical attention.',
    ],
    optimalTimingWindows: 
`For Infants:
- Birth: 1st dose (ideally within 24 hours)
- 1-2 months: 2nd dose
- 6-18 months: 3rd dose (final dose)

Special Considerations:
- A 4th dose may be needed if a combination vaccine containing HepB was used for some doses.
- Catch-up schedules are available for older children and adults not previously vaccinated.`,
    contraindications: 'A history of a severe allergic reaction (anaphylaxis) to a previous dose of Hepatitis B vaccine or to any component of the vaccine (including yeast) is a contraindication.',
    efficacyStatistics: 'The Hepatitis B vaccine is highly effective, providing over 95% protection after a complete series for healthy infants, children, and young adults. Immunity is typically long-lasting, often lifelong.',
    sideEffectManagement: 'For mild soreness or fever, you can use a cool compress on the injection site or give an age-appropriate dose of acetaminophen or ibuprofen if recommended by your doctor. Ensure the child drinks plenty of fluids. Most mild reactions resolve within 1-2 days.',
    staticFaqs: [
      { question: 'Is the Hepatitis B vaccine safe?', answer: 'Yes, the Hepatitis B vaccine is considered very safe and effective. Millions of doses are administered safely worldwide each year. Most side effects are mild and resolve on their own. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'Why is the first dose given so early, at birth?', answer: 'Vaccinating at birth provides crucial early protection, especially against potential transmission from an infected mother (who may not know she is infected). The Hepatitis B virus can be easily transmitted, and infants are at high risk for developing chronic infection if exposed. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'What if my child misses a dose?', answer: 'If a dose is missed, your child does not need to restart the series. Contact your healthcare provider to arrange for the missed dose(s) and get back on schedule. A catch-up schedule will be provided. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
    ],
    lastUpdatedStatic: new Date('2024-05-15T10:00:00Z').toISOString(),
  },
  {
    id: 'dtap',
    name: 'DTaP (Diphtheria, Tetanus, and Pertussis)',
    description: 'The DTaP vaccine protects young children from three serious diseases: diphtheria, tetanus (lockjaw), and pertussis (whooping cough).',
    benefits: [
      'Prevents diphtheria, which can cause a thick covering in the back of the throat, leading to breathing problems, paralysis, heart failure, and death.',
      'Prevents tetanus, which causes painful muscle tightening and stiffness, usually all over the body. It can lead to "locking" of the jaw so the victim cannot open their mouth or swallow. Tetanus is often fatal.',
      'Prevents pertussis, a highly contagious respiratory illness that causes uncontrollable, violent coughing spells. Pertussis is most dangerous for babies and young children and can lead to pneumonia, seizures, brain damage, or death.',
    ],
    commonSideEffects: [
      'Redness, swelling, or soreness at the injection site.',
      'Fever (usually within 1-2 days).',
      'Fussiness or irritability.',
      'Tiredness or decreased appetite.',
      'Vomiting (less common).',
    ],
    seriousSideEffects: [
        'Severe allergic reaction (rare).',
        'Non-stop crying for 3 hours or more (rare).',
        'Fever over 105°F (rare).',
        'Seizures (jerking or staring) (rare).',
        'Limpness or paleness (rare).',
        'Seek immediate medical attention for any of these serious side effects.',
    ],
    optimalTimingWindows: 
`Primary Series for Infants and Young Children:
- 2 months: 1st dose
- 4 months: 2nd dose
- 6 months: 3rd dose
- 15-18 months: 4th dose (booster)
- 4-6 years: 5th dose (booster, before starting school)

Tdap vaccine is used for older children (usually starting at 11-12 years) and adults as a booster.`,
    contraindications: 'A history of a severe allergic reaction to a previous dose or component. Certain brain or nervous system diseases (e.g., encephalopathy not attributable to another cause occurring within 7 days of a previous dose of DTP or DTaP vaccine).',
    efficacyStatistics: 'DTaP vaccine is highly effective. After the primary series, it protects about 95% of children from diphtheria, close to 100% from tetanus, and about 80-90% from pertussis. Protection against pertussis can wane over time, hence the need for boosters.',
    sideEffectManagement: 'For local reactions, apply a cool cloth. For fever or discomfort, consult your doctor about using fever-reducing medication. Encourage rest and fluids.',
    staticFaqs: [
      { question: 'What is the difference between DTaP and Tdap?', answer: 'DTaP is for children younger than 7 years old. It contains full-strength doses of diphtheria and tetanus toxoids and acellular pertussis antigens. Tdap is a booster vaccine for adolescents and adults (typically from age 7 onwards) and contains a reduced dose of diphtheria and pertussis antigens. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'Is it okay to get DTaP if my child has a cold?', answer: 'Mild illnesses like a cold are usually not a reason to delay vaccination. However, if your child has a moderate or severe illness with or without fever, it’s best to wait until they recover. Always consult your doctor. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
    ],
    lastUpdatedStatic: new Date('2024-05-15T10:00:00Z').toISOString(),
  },
  {
    id: 'rotavirus',
    name: 'Rotavirus (RV)',
    description: 'The Rotavirus vaccine protects against rotavirus, a common cause of severe diarrhea, vomiting, fever, and abdominal pain in infants and young children. Rotavirus infection can lead to dehydration, sometimes requiring hospitalization.',
    benefits: [
      'Prevents severe rotavirus gastroenteritis.',
      'Reduces the risk of dehydration and hospitalization due to rotavirus.',
      'Helps protect infants and young children during their most vulnerable period.',
    ],
    commonSideEffects: [
      'Mild, temporary diarrhea or vomiting.',
      'Fussiness or irritability.',
      'Low-grade fever.',
    ],
    seriousSideEffects: [
      'Intussusception (a type of bowel blockage) is a very rare but serious risk, primarily associated with older rotavirus vaccines, but still monitored for current vaccines. Symptoms include severe abdominal pain, vomiting, blood in stool, or weakness. Seek immediate medical attention if observed.',
      'Severe allergic reaction (very rare).',
    ],
    optimalTimingWindows:
`This is an ORAL vaccine, not an injection. Two types are available (Rotarix - 2 doses; RotaTeq - 3 doses):
Rotarix (RV1):
- 2 months: 1st dose
- 4 months: 2nd dose

RotaTeq (RV5):
- 2 months: 1st dose
- 4 months: 2nd dose
- 6 months: 3rd dose

Important Timing:
- The first dose should be given before 15 weeks of age.
- All doses should be completed before 8 months of age.`,
    contraindications: 'History of severe allergic reaction (anaphylaxis) to a previous dose or component. History of intussusception. Severe Combined Immunodeficiency (SCID).',
    efficacyStatistics: 'Rotavirus vaccines are very effective at preventing severe rotavirus disease, hospitalizations, and emergency room visits. They protect about 9 out of 10 children from severe rotavirus illness and 7 out of 10 children from any rotavirus illness.',
    sideEffectManagement: 'If mild diarrhea or vomiting occurs, ensure the infant stays hydrated with breast milk, formula, or oral rehydration solution as advised by your doctor. Monitor for signs of dehydration (e.g., fewer wet diapers, dry mouth, no tears when crying).',
    staticFaqs: [
      { question: 'Is the rotavirus vaccine given as a shot?', answer: 'No, the rotavirus vaccine is an oral vaccine, meaning it is given by drops into the mouth. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'Why is there an age limit for starting and finishing the rotavirus vaccine series?', answer: 'The age recommendations are based on clinical trial data regarding safety and efficacy, particularly related to the very small risk of intussusception. It is most effective and safest when given within these age windows. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
    ],
    lastUpdatedStatic: new Date('2024-05-15T10:00:00Z').toISOString(),
  },
  {
    id: 'hib',
    name: 'Haemophilus influenzae type b (Hib)',
    description: 'The Hib vaccine protects against Haemophilus influenzae type b (Hib) disease. Hib infection can cause serious illnesses, especially in children under 5, including meningitis (brain and spinal cord infection), pneumonia, epiglottitis (life-threatening throat infection), and infections of the blood, joints, bones, and covering of the heart.',
    benefits: [
      'Prevents Hib meningitis, a leading cause of bacterial meningitis in young children before the vaccine.',
      'Prevents other serious Hib infections like epiglottitis, pneumonia, and bacteremia.',
      'Has dramatically reduced Hib disease rates worldwide.',
    ],
    commonSideEffects: [
      'Redness, warmth, or swelling at the injection site.',
      'Fever (usually mild).',
    ],
    seriousSideEffects: [
      'Severe allergic reaction (very rare).',
    ],
    optimalTimingWindows:
`The number of doses depends on the brand of Hib vaccine used (ActHIB, PedvaxHIB, or Hiberix). Most children will receive a 3 or 4 dose series.
Typical Schedule (may vary by brand):
- 2 months: 1st dose
- 4 months: 2nd dose
- 6 months: 3rd dose (if needed, depending on brand)
- 12-15 months: Booster dose

Important:
- The first dose can be given as early as 6 weeks.
- Catch-up schedules are available for children who start late. Unvaccinated children older than 5 years usually do not need Hib vaccine unless they have certain medical conditions.`,
    contraindications: 'History of severe allergic reaction to a previous dose or component. Children younger than 6 weeks of age.',
    efficacyStatistics: 'The Hib vaccine is highly effective, preventing nearly all cases of invasive Hib disease in vaccinated children. Completing the series provides over 95% protection.',
    sideEffectManagement: 'Mild reactions usually resolve on their own. A cool compress can be applied to the injection site. Consult a doctor for fever management if needed.',
    staticFaqs: [
      { question: 'My child is older than 15 months and hasn\'t received Hib. Do they still need it?', answer: 'Healthy children older than 5 years usually do not need Hib vaccine because they are naturally less susceptible. However, for children between 15 months and 5 years who are unvaccinated or incompletely vaccinated, a catch-up schedule is recommended. Consult your doctor. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'What does "type b" mean in Haemophilus influenzae type b?', answer: 'Haemophilus influenzae is a type of bacteria. There are several types, but "type b" (Hib) was the most common cause of serious invasive disease in children before the vaccine. The vaccine specifically targets this type. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
    ],
    lastUpdatedStatic: new Date('2024-05-15T10:00:00Z').toISOString(),
  },
  {
    id: 'pcv13',
    name: 'Pneumococcal Conjugate Vaccine (PCV13)',
    description: 'PCV13 (Prevnar 13) protects against 13 types of pneumococcal bacteria, which can cause serious infections like meningitis, bacteremia (blood infection), and bacteremic pneumonia. It also helps prevent ear infections.',
    benefits: [
      'Prevents severe pneumococcal infections, including meningitis and bacteremia.',
      'Reduces the incidence of pneumococcal pneumonia.',
      'Helps prevent some types of ear infections (otitis media) caused by pneumococcal bacteria.',
    ],
    commonSideEffects: [
      'Drowsiness or loss of appetite.',
      'Redness, swelling, or tenderness at the injection site.',
      'Mild fever.',
      'Fussiness or irritability.',
    ],
    seriousSideEffects: [
      'Severe allergic reaction (very rare).',
    ],
    optimalTimingWindows:
`Routine Series for Infants and Young Children:
- 2 months: 1st dose
- 4 months: 2nd dose
- 6 months: 3rd dose
- 12-15 months: 4th dose (booster)

Catch-up:
- Catch-up schedules are available for children up to 59 months (just under 5 years) who are unvaccinated or incompletely vaccinated.
- Older children (6-18 years) with certain chronic medical conditions may also need PCV13.
- PPSV23 (Pneumovax 23) is another pneumococcal vaccine typically given to older children (over 2 years) and adults at increased risk.`,
    contraindications: 'History of severe allergic reaction to a previous dose of PCV13, any diphtheria toxoid-containing vaccine, or any component of PCV13.',
    efficacyStatistics: 'PCV13 is very effective at preventing invasive pneumococcal disease caused by the 13 serotypes it covers, protecting at least 90% of children. It also reduces ear infections caused by these serotypes by about 50-60%.',
    sideEffectManagement: 'Manage local reactions with a cool cloth. For fever or fussiness, consult your doctor about appropriate comfort measures or medication.',
    staticFaqs: [
      { question: 'What is the difference between PCV13 and PPSV23?', answer: 'PCV13 (Prevnar 13) is a conjugate vaccine that provides a strong immune response in infants and young children. PPSV23 (Pneumovax 23) is a polysaccharide vaccine that covers more strains (23 types) but is generally used for older children (2+ years) and adults, especially those with certain medical conditions. Some individuals may receive both at different times. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'Does PCV13 prevent all ear infections?', answer: 'No, PCV13 helps prevent ear infections caused by the 13 types of pneumococcal bacteria it covers. Ear infections can be caused by other bacteria or viruses, so the vaccine will not prevent all of them. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
    ],
    lastUpdatedStatic: new Date('2024-05-15T10:00:00Z').toISOString(),
  },
  {
    id: 'ipv',
    name: 'Inactivated Polio Vaccine (IPV)',
    description: 'The Inactivated Polio Vaccine (IPV) protects against poliomyelitis (polio), a crippling and potentially deadly infectious disease caused by the poliovirus. The virus spreads from person to person and can invade an infected person’s brain and spinal cord, causing paralysis.',
    benefits: [
      'Prevents polio, which can cause lifelong paralysis or death.',
      'Contributes to global polio eradication efforts.',
      'IPV is very safe and cannot cause polio as it uses killed viruses.',
    ],
    commonSideEffects: [
      'Soreness, redness, or swelling at the injection site (usually mild and temporary).',
      'Low-grade fever (rare).',
    ],
    seriousSideEffects: [
      'Severe allergic reaction (very rare).',
    ],
    optimalTimingWindows:
`Routine Series for Infants and Young Children:
- 2 months: 1st dose
- 4 months: 2nd dose
- 6-18 months: 3rd dose
- 4-6 years: 4th dose (booster, before starting school)

Important Notes:
- All children should receive four doses of IPV.
- The final dose should be given on or after the 4th birthday and at least 6 months after the previous dose.
- Catch-up schedules are available for those who start late or are behind.`,
    contraindications: 'History of severe allergic reaction to a previous dose of IPV or to any component of the vaccine (e.g., neomycin, streptomycin, polymyxin B).',
    efficacyStatistics: 'IPV is highly effective in preventing polio. After two doses, about 90% of individuals develop protective antibodies, and after three doses, at least 99% are immune.',
    sideEffectManagement: 'Mild soreness at the injection site usually needs no treatment or can be managed with a cool compress. Consult a doctor if fever is concerning.',
    staticFaqs: [
      { question: 'Is the oral polio vaccine (OPV) still used?', answer: 'In many countries, including the United States, only the inactivated polio vaccine (IPV) is used for routine vaccination. OPV (oral polio vaccine) contains live, weakened virus and, in extremely rare cases, could cause vaccine-associated paralytic polio (VAPP). IPV cannot cause polio. Some countries may still use OPV as part of global eradication strategies. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'If polio is eradicated in my country, why is the vaccine still needed?', answer: 'Until polio is eradicated globally, there is still a risk of the virus being imported into a polio-free country and spreading among unvaccinated individuals. Maintaining high vaccination coverage is crucial to prevent outbreaks and protect the community. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
    ],
    lastUpdatedStatic: new Date('2024-05-15T10:00:00Z').toISOString(),
  },
  {
    id: 'mmr',
    name: 'Measles, Mumps, and Rubella (MMR)',
    description: 'The MMR vaccine protects against three viral diseases: measles, mumps, and rubella (German measles). These diseases can be serious and have complications.',
    benefits: [
      'Prevents measles, a highly contagious virus that can lead to pneumonia, encephalitis (brain inflammation), and death.',
      'Prevents mumps, which can cause swollen salivary glands, fever, headache, and in some cases, meningitis, encephalitis, deafness, or inflammation of the testicles or ovaries.',
      'Prevents rubella, which is usually mild in children but can cause serious birth defects (Congenital Rubella Syndrome) if a pregnant woman gets infected.',
      'Helps maintain community immunity (herd immunity) to protect vulnerable individuals.',
    ],
    commonSideEffects: [
      'Fever (can occur 1-2 weeks after the shot).',
      'Mild rash (can occur 1-2 weeks after the shot).',
      'Swelling of glands in the cheeks or neck.',
      'Temporary pain and stiffness in the joints (mostly in teenage or adult women).',
      'Soreness, redness, or swelling at the injection site.',
    ],
    seriousSideEffects: [
      'Seizure caused by fever (febrile seizure), usually not associated with long-term issues (about 1 in 3,000 doses).',
      'Temporary low platelet count, which can cause unusual bleeding or bruising (about 1 in 30,000 doses).',
      'Serious allergic reaction (very rare, less than 1 in a million doses).',
      'Deafness, long-term seizures, coma, or lowered consciousness, or permanent brain damage are extremely rare.',
    ],
    optimalTimingWindows:
`Routine Series for Children:
- 12-15 months: 1st dose
- 4-6 years: 2nd dose (before starting school)

Important Notes:
- The second dose can be given earlier as long as it is at least 28 days after the first dose.
- Children traveling internationally may need the first dose earlier (as young as 6 months).
- MMRV vaccine (measles, mumps, rubella, and varicella) is an option for children aged 12 months through 12 years for both doses.`,
    contraindications: 'History of severe allergic reaction to a previous dose or component (including neomycin or gelatin). Pregnancy (women should avoid pregnancy for 4 weeks after vaccination). Severe immunodeficiency (e.g., from HIV/AIDS, cancer, treatment with high-dose steroids, or other immune-suppressing drugs). A family history of immune system problems (unless the child\'s immune system has been checked and is normal). Any condition that makes them bruise or bleed easily. Recent blood transfusion or blood products.',
    efficacyStatistics: 'The MMR vaccine is very effective. One dose is about 93% effective against measles, 78% against mumps, and 97% against rubella. Two doses are about 97% effective against measles and 88% against mumps.',
    sideEffectManagement: 'For fever or rash, ensure the child is comfortable. Consult a doctor about fever-reducing medication. A rash is usually mild and resolves on its own. Joint pain in older recipients usually resolves without treatment.',
    staticFaqs: [
      { question: 'Does the MMR vaccine cause autism?', answer: 'No, numerous scientific studies worldwide have extensively investigated this claim and found no link between the MMR vaccine and autism. Major medical and scientific organizations (like the CDC, WHO, American Academy of Pediatrics) all agree that MMR vaccine does not cause autism. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'Can my child get measles, mumps, or rubella from the MMR vaccine?', answer: 'The MMR vaccine contains live but weakened (attenuated) viruses. These weakened viruses do not cause the diseases in healthy people. Some children may experience mild symptoms like fever or rash as their immune system responds, but this is not the actual disease. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
    ],
    lastUpdatedStatic: new Date('2024-05-15T10:00:00Z').toISOString(),
  },
  {
    id: 'varicella',
    name: 'Varicella (Chickenpox)',
    description: 'The Varicella vaccine protects against chickenpox, a highly contagious disease caused by the varicella-zoster virus (VZV). While often mild, chickenpox can be serious, especially in babies, adults, and people with weakened immune systems, leading to complications like skin infections, pneumonia, encephalitis, or shingles later in life.',
    benefits: [
      'Prevents chickenpox and its common symptoms (itchy rash, fever, tiredness).',
      'Reduces the risk of severe complications from chickenpox.',
      'Helps prevent the spread of chickenpox to vulnerable individuals.',
      'May reduce the risk of developing shingles later in life (shingles is caused by reactivation of the same virus).',
    ],
    commonSideEffects: [
      'Soreness, redness, or swelling at the injection site.',
      'Low-grade fever.',
      'Mild rash (can occur up to a month after vaccination, may be at the injection site or elsewhere). It is possible for a person with a vaccine-related rash to spread the weakened virus to others, but this is rare.',
    ],
    seriousSideEffects: [
      'Seizure caused by fever (febrile seizure) (rare).',
      'Pneumonia (very rare).',
      'Serious allergic reaction (very rare).',
    ],
    optimalTimingWindows:
`Routine Series for Children:
- 12-15 months: 1st dose
- 4-6 years: 2nd dose

Important Notes:
- The second dose can be given earlier, as long as it is at least 3 months after the first dose for children <13 years, or at least 4 weeks after the first dose for people ≥13 years.
- People 13 years of age and older who have never had chickenpox or received chickenpox vaccine should get two doses at least 28 days apart.
- MMRV vaccine (measles, mumps, rubella, and varicella) is an option for children aged 12 months through 12 years for both doses.`,
    contraindications: 'History of severe allergic reaction to a previous dose or component (including neomycin or gelatin). Pregnancy (women should avoid pregnancy for 1 month after vaccination). Severe immunodeficiency. Active untreated tuberculosis. Taking high-dose steroids or other immune-suppressing drugs.',
    efficacyStatistics: 'The varicella vaccine is highly effective. One dose prevents about 90% of chickenpox cases and nearly all severe cases. Two doses provide even better protection, preventing over 98% of cases and virtually all severe disease.',
    sideEffectManagement: 'For mild rash, keep the area clean and dry. Oatmeal baths or calamine lotion can soothe itching if a rash occurs. Consult a doctor for fever management. Avoid scratching any blisters to prevent infection.',
    staticFaqs: [
      { question: 'If my child gets the vaccine, can they still get chickenpox?', answer: 'The varicella vaccine is very effective. Most vaccinated people will not get chickenpox. If a vaccinated person does get chickenpox (called "breakthrough infection"), it is usually a much milder case with fewer spots, less fever, and quicker recovery compared to an unvaccinated person. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
      { question: 'My child already had chickenpox. Do they need the vaccine?', answer: 'Generally, no. Having chickenpox disease usually provides lifelong immunity. However, if there is doubt about whether your child truly had chickenpox (as some rashes can be mistaken for it), talk to your doctor. They might recommend a blood test to check for immunity or proceed with vaccination. This information is for educational purposes and should not replace consultation with a healthcare professional.' },
    ],
    lastUpdatedStatic: new Date('2024-05-15T10:00:00Z').toISOString(),
  },
];

export function getVaccineInfoBySlug(slug: string): VaccineInfo | undefined {
  return VACCINE_DATA.find(vaccine => vaccine.id === slug);
}

export function getAllVaccineSlugs(): string[] {
    return VACCINE_DATA.map(vaccine => vaccine.id);
}

export function getAllVaccineInfo(): VaccineInfo[] {
    return [...VACCINE_DATA];
}
