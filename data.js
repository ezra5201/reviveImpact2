/**
 * ReVive IMPACT Contact Log Data
 */

// Sample contact log data
const contactLogData = [
    {
      date: "03/19/2025",
      daysAgo: 0,
      provider: "Elena Ahmed",
      client: "Thiago Schmidt",
      clientId: "TS001",
      placeOfService: "Engagement Center",
      accompaniedAppointment: "Accompanied",
      obtainedDocumentation: "Homeless Verification Letters",
      resourcesGiven: ["Food", "Laundry", "$5 Transit Card"],
      onSiteHealthCare: "Yes",
      programStarted: "Yes",
      housingEntered: "No",
      countedColumns: 3,
      notes: "Initial intake completed",
      programStatus: "Active"
    },
    {
      date: "09/15/2023",
      daysAgo: 185,
      provider: "Sofia Cohen",
      client: "Liam Nguyen",
      clientId: "LN002",
      placeOfService: "Engagement Center",
      accompaniedAppointment: "No",
      obtainedDocumentation: "No",
      resourcesGiven: ["Food", "$5 Transit Card"],
      onSiteHealthCare: "No",
      programStarted: "No",
      housingEntered: "No",
      countedColumns: 2,
      notes: "Initial visit",
      programStatus: "Prospect"
    },
    {
      date: "08/22/2023",
      daysAgo: 209,
      provider: "Jamal Silva",
      client: "Mia Patel",
      clientId: "MP003",
      placeOfService: "In Office",
      accompaniedAppointment: "Accompanied",
      obtainedDocumentation: "State ID",
      resourcesGiven: ["Food", "Hygiene Products"],
      onSiteHealthCare: "No",
      programStarted: "Counseling - Life Skills",
      housingEntered: "No",
      countedColumns: 3,
      notes: "ID assistance provided",
      programStatus: "Active"
    },
    {
      date: "07/05/2023",
      daysAgo: 257,
      provider: "Mohammed Ahmed",
      client: "Noah Kim",
      clientId: "NK004",
      placeOfService: "Phone/Text/Email",
      accompaniedAppointment: "No",
      obtainedDocumentation: "No",
      resourcesGiven: ["$15 Transit Card"],
      onSiteHealthCare: "No",
      programStarted: "Employment Services",
      housingEntered: "No",
      countedColumns: 1,
      notes: "Phone follow-up",
      programStatus: "Active"
    },
    {
      date: "06/12/2023",
      daysAgo: 280,
      provider: "Elena Ahmed",
      client: "Ava Hernandez",
      clientId: "AH005",
      placeOfService: "Engagement Center",
      accompaniedAppointment: "Accompanied",
      obtainedDocumentation: "Homeless Verification Letters",
      resourcesGiven: ["Food", "Laundry", "$5 Transit Card"],
      onSiteHealthCare: "No",
      programStarted: "No",
      housingEntered: "No",
      countedColumns: 4,
      notes: "Regular visit",
      programStatus: "Active"
    },
    {
      date: "05/29/2023",
      daysAgo: 294,
      provider: "Sonia Singh",
      client: "Ethan Choi",
      clientId: "EC006",
      placeOfService: "Engagement Center",
      accompaniedAppointment: "No",
      obtainedDocumentation: "No",
      resourcesGiven: ["Food", "OTC 6- Stomach/cold relief"],
      onSiteHealthCare: "No",
      programStarted: "No",
      housingEntered: "No",
      countedColumns: 2,
      notes: "Provided basic necessities",
      programStatus: "Active"
    },
    {
      date: "04/17/2023",
      daysAgo: 336,
      provider: "Leila Garcia",
      client: "Sophia Gupta",
      clientId: "SG007",
      placeOfService: "Home Visit",
      accompaniedAppointment: "No",
      obtainedDocumentation: "No",
      resourcesGiven: ["Home Goods", "OTC 7- Lotion / cream / skin"],
      onSiteHealthCare: "No",
      programStarted: "No",
      housingEntered: "Permanent Supportive Housing",
      countedColumns: 2,
      notes: "Home visit after housing",
      programStatus: "Cressey House PSH"
    },
    {
      date: "03/08/2023",
      daysAgo: 376,
      provider: "Sofia Cohen",
      client: "Jackson Lee",
      clientId: "JL008",
      placeOfService: "Engagement Center",
      accompaniedAppointment: "Accompanied",
      obtainedDocumentation: "Homeless Verification Letters",
      resourcesGiven: ["Food", "Laundry"],
      onSiteHealthCare: "No",
      programStarted: "No",
      housingEntered: "No",
      countedColumns: 3,
      notes: "Regular visit",
      programStatus: "Active"
    },
    {
      date: "02/14/2023",
      daysAgo: 398,
      provider: "Jamal Silva",
      client: "Isabella Brown",
      clientId: "IB009",
      placeOfService: "Engagement Center",
      accompaniedAppointment: "No",
      obtainedDocumentation: "No",
      resourcesGiven: ["Food", "$5 Transit Card"],
      onSiteHealthCare: "No",
      programStarted: "No",
      housingEntered: "No",
      countedColumns: 2,
      notes: "Quick visit",
      programStatus: "Active"
    },
    {
      date: "01/03/2023",
      daysAgo: 440,
      provider: "Sofia Cohen",
      client: "Aiden Patel",
      clientId: "AP010",
      placeOfService: "Engagement Center",
      accompaniedAppointment: "Accompanied",
      obtainedDocumentation: "State ID",
      resourcesGiven: ["Food", "Clothing"],
      onSiteHealthCare: "No",
      programStarted: "No",
      housingEntered: "No",
      countedColumns: 3,
      notes: "Assisted with ID",
      programStatus: "Active"
    },
    {
      date: "11/29/2022",
      daysAgo: 475,
      provider: "Elena Ahmed",
      client: "Charlotte Davis",
      clientId: "CD011",
      placeOfService: "Phone/Text/Email",
      accompaniedAppointment: "No",
      obtainedDocumentation: "No",
      resourcesGiven: ["Uber/Lyft"],
      onSiteHealthCare: "No",
      programStarted: "Transportation",
      housingEntered: "No",
      countedColumns: 1,
      notes: "Provided transportation assistance",
      programStatus: "Active"
    }
  ];
  
  // Sample providers data
  const providersData = [
    { id: "EA001", name: "Elena Ahmed", role: "Case Manager" },
    { id: "SC002", name: "Sofia Cohen", role: "Occupational Therapist" },
    { id: "JS003", name: "Jamal Silva", role: "Case Manager" },
    { id: "MA004", name: "Mohammed Ahmed", role: "Outreach Coordinator" },
    { id: "SS005", name: "Sonia Singh", role: "Case Manager" },
    { id: "LG006", name: "Leila Garcia", role: "Occupational Therapist" },
    { id: "AP007", name: "Alexandra Perry", role: "Case Manager" },
    { id: "AB008", name: "Ashley B", role: "Outreach Specialist" },
    { id: "TB009", name: "Tarik Brown", role: "Peer Navigator" },
    { id: "DM010", name: "Dave Morris", role: "Case Manager" },
    { id: "RT011", name: "Redrick Taylor", role: "Peer Navigator" },
    { id: "RJ012", name: "Rolando Jara", role: "Case Manager" },
    { id: "AL013", name: "Andrea Leflore", role: "Director of Programs" }
  ];
  
  // Sample client data
  const clientData = [
    { 
      id: "TS001", 
      firstName: "Thiago", 
      lastName: "Schmidt",
      dob: "1985-07-15",
      gender: "Male",
      ethnicity: "Hispanic/Latino",
      race: "White",
      veteran: "No",
      disability: "Yes",
      disabilityTypes: ["Mental illness"],
      programStatus: "Active",
      enrollmentDate: "2023-02-10",
      primaryGoal: "Secure permanent housing",
      secondaryGoal: "Find employment"
    },
    { 
      id: "LN002", 
      firstName: "Liam", 
      lastName: "Nguyen",
      dob: "1990-03-22",
      gender: "Male",
      ethnicity: "Non-Hispanic/Latino",
      race: "Asian",
      veteran: "No",
      disability: "No",
      disabilityTypes: [],
      programStatus: "Prospect",
      enrollmentDate: "2023-09-15",
      primaryGoal: "Connect with healthcare services"
    },
    { 
      id: "MP003", 
      firstName: "Mia", 
      lastName: "Patel",
      dob: "1978-11-08",
      gender: "Female",
      ethnicity: "Non-Hispanic/Latino",
      race: "Asian",
      veteran: "No",
      disability: "Yes",
      disabilityTypes: ["Physical disability"],
      programStatus: "Active",
      enrollmentDate: "2022-12-05",
      primaryGoal: "Obtain ID documentation",
      secondaryGoal: "Access benefits"
    },
    { 
      id: "NK004", 
      firstName: "Noah", 
      lastName: "Kim",
      dob: "1995-05-30",
      gender: "Male",
      ethnicity: "Non-Hispanic/Latino",
      race: "Asian",
      veteran: "No",
      disability: "No",
      disabilityTypes: [],
      programStatus: "Active",
      enrollmentDate: "2023-01-20",
      primaryGoal: "Employment",
      secondaryGoal: "Education access"
    },
    { 
      id: "AH005", 
      firstName: "Ava", 
      lastName: "Hernandez",
      dob: "1982-09-12",
      gender: "Female",
      ethnicity: "Hispanic/Latino",
      race: "White",
      veteran: "No",
      disability: "Yes",
      disabilityTypes: ["Chronic health condition"],
      programStatus: "Active",
      enrollmentDate: "2022-10-18",
      primaryGoal: "Housing stability",
      secondaryGoal: "Mental health support"
    },
    { 
      id: "EC006", 
      firstName: "Ethan", 
      lastName: "Choi",
      dob: "1973-04-05",
      gender: "Male",
      ethnicity: "Non-Hispanic/Latino",
      race: "Asian",
      veteran: "Yes",
      disability: "Yes",
      disabilityTypes: ["Substance abuse"],
      programStatus: "Active",
      enrollmentDate: "2023-03-12",
      primaryGoal: "Substance abuse treatment",
      secondaryGoal: "Housing"
    },
    { 
      id: "SG007", 
      firstName: "Sophia", 
      lastName: "Gupta",
      dob: "1990-07-20",
      gender: "Female",
      ethnicity: "Non-Hispanic/Latino",
      race: "Asian",
      veteran: "No",
      disability: "No",
      disabilityTypes: [],
      programStatus: "Cressey House PSH",
      enrollmentDate: "2022-09-30",
      primaryGoal: "Housing stabilization",
      secondaryGoal: "Independent living skills"
    },
    { 
      id: "JL008", 
      firstName: "Jackson", 
      lastName: "Lee",
      dob: "1988-12-15",
      gender: "Male",
      ethnicity: "Non-Hispanic/Latino",
      race: "Asian",
      veteran: "No",
      disability: "Yes",
      disabilityTypes: ["Mental illness"],
      programStatus: "Active",
      enrollmentDate: "2023-01-05",
      primaryGoal: "Mental health treatment",
      secondaryGoal: "Housing"
    },
    { 
      id: "IB009", 
      firstName: "Isabella", 
      lastName: "Brown",
      dob: "1992-02-28",
      gender: "Female",
      ethnicity: "Non-Hispanic/Latino",
      race: "Black/African American",
      veteran: "No",
      disability: "No",
      disabilityTypes: [],
      programStatus: "Active",
      enrollmentDate: "2022-12-10",
      primaryGoal: "Employment",
      secondaryGoal: "Education"
    },
    { 
      id: "AP010", 
      firstName: "Aiden", 
      lastName: "Patel",
      dob: "1983-08-05",
      gender: "Male",
      ethnicity: "Non-Hispanic/Latino",
      race: "Asian",
      veteran: "No",
      disability: "Yes",
      disabilityTypes: ["Physical disability"],
      programStatus: "Active",
      enrollmentDate: "2022-11-22",
      primaryGoal: "ID documentation",
      secondaryGoal: "Benefits access"
    },
    { 
      id: "CD011", 
      firstName: "Charlotte", 
      lastName: "Davis",
      dob: "1975-05-17",
      gender: "Female",
      ethnicity: "Non-Hispanic/Latino",
      race: "White",
      veteran: "No",
      disability: "Yes",
      disabilityTypes: ["Chronic health condition"],
      programStatus: "Active",
      enrollmentDate: "2022-08-15",
      primaryGoal: "Healthcare access",
      secondaryGoal: "Transportation solutions"
    }
  ];
  
  // Resource types available
  const resourceTypes = [
    "Food",
    "Laundry",
    "$5 Transit Card",
    "$15 Transit Card",
    "$20 Transit Card",
    "Harm Reduction Supplies",
    "Hygiene Products",
    "Uber/Lyft",
    "Clothing",
    "Home Goods",
    "OTC 1- Pain relief",
    "OTC 2- First aid / wound care",
    "OTC 3- Allergy",
    "OTC 4- Vitamins",
    "OTC 5- Sleep aid",
    "OTC 6- Stomach/cold relief",
    "OTC 7- Lotion / cream / skin",
    "OTC 8- Covid tests / sanitation",
    "OTC 9- Vision / Dental",
    "Bike"
  ];
  
  // Healthcare services available
  const healthcareServices = [
    "PACE",
    "Rush LCSW",
    "Rush MD",
    "OT Skilled",
    "Rush ENT Clinic offsite",
    "FGC Outreach",
    "Rush RN",
    "Medication Delivery",
    "Vision Clinic glasses",
    "None"
  ];
  
  // Program types available
  const programTypes = [
    "New Job",
    "Detox",
    "Medical Equipment",
    "Advocacy",
    "Case Management",
    "Counseling - Financial",
    "Counseling - Life Skills",
    "Counseling - All other",
    "Alcohol Abuse Services",
    "Child Care",
    "Children's Services",
    "Domestic Violence",
    "Education",
    "Employment Services",
    "English as a Second Language",
    "Follow-up Services",
    "Health / Dental Service",
    "HIV / AIDS Related Service",
    "Housing Location / Inspection",
    "Mental Health Services",
    "Legal Service Referrals",
    "Outreach",
    "Substance Abuse Services",
    "Transportation",
    "Drop-In",
    "No"
  ];
  
  // Housing entry types
  const housingEntryTypes = [
    "Permanent Supportive Housing",
    "Overnight Shelter",
    "Rental housing",
    "No"
  ];
  
  // Program status types
  const programStatusTypes = [
    "Scattered Site SHP",
    "Prospect",
    "Cressey House PSH",
    "Leasing Grant",
    "Discharged",
    "Active"
  ];
  
  // Place of service options
  const placeOfServiceOptions = [
    "Engagement Center",
    "In Office",
    "Home Visit",
    "Phone/Text/Email"
  ];
  
  // Documentation types
  const documentationTypes = [
    "State ID",
    "Social Security Card",
    "Birth Certificate",
    "Homeless Verification Letters",
    "No"
  ];
  
  // Current user information
  const currentUser = {
    id: "AL013",
    name: "Andrea Leflore",
    role: "Director of Programs",
    permissions: ["view_all", "edit_all", "admin"]
  };