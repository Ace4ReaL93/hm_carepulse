export const GenderOptions = ["male", "female"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Carte Nationale d'Identité",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Carte Nationale d'Identité",
  "Permis de conduire",
  "Passeport",
  "Carte/Police d'assurance médicale",
  "Carte de résidence d'étranger(Green Card)",
  "Carte d'étudiant",
  "Carte d'électeur",
  "Carte d'identité militaire",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Mouhamed Ngom",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Dieynaba Diallo",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Karim Sow",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Mamadou Diop",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Kiné Diop",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Ibrahima Mbodj",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Bineta Mbaye",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Thioro Samb",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Talla Fall",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};