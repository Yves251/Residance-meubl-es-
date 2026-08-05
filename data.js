// data.js
// Liste des guest houses. Pour ajouter un établissement, copie un bloc
// entre { } et modifie les valeurs. "whatsapp" doit être au format
// international sans le "+" (ex: 22990000000).
// "department" doit être l'un des 12 départements du Bénin.

const GUEST_HOUSES = [
  {
    id: "gh-001",
    name: "Villa Cauris",
    city: "Cotonou",
    department: "Littoral",
    pricePerNight: 25000,
    whatsapp: "22990000001",
    amenities: ["Wi-Fi", "Climatisation", "Petit-déjeuner", "Parking"],
    description:
      "Villa calme à deux pas de la plage de Fidjrossè, chambres climatisées et terrasse commune ombragée.",
  },
  {
    id: "gh-002",
    name: "Le Jardin de Marie",
    city: "Porto-Novo",
    department: "Ouémé",
    pricePerNight: 15000,
    whatsapp: "22990000002",
    amenities: ["Wi-Fi", "Jardin", "Petit-déjeuner"],
    description:
      "Maison d'hôtes familiale avec jardin, à quelques minutes du Musée Honmè.",
  },
  {
    id: "gh-003",
    name: "Chez Adjovi",
    city: "Abomey",
    department: "Zou",
    pricePerNight: 12000,
    whatsapp: "22990000003",
    amenities: ["Petit-déjeuner", "Ventilateur"],
    description:
      "À deux pas des palais royaux d'Abomey, accueil chaleureux et cuisine locale.",
  },
  {
    id: "gh-004",
    name: "Résidence Wari",
    city: "Parakou",
    department: "Borgou",
    pricePerNight: 17000,
    whatsapp: "22990000004",
    amenities: ["Wi-Fi", "Climatisation", "Parking"],
    description:
      "Étape confortable dans le nord, proche de la gare routière et des marchés de Parakou.",
  },
  {
    id: "gh-005",
    name: "Auberge des Tata Somba",
    city: "Natitingou",
    department: "Atacora",
    pricePerNight: 14000,
    whatsapp: "22990000005",
    amenities: ["Vue collines", "Petit-déjeuner", "Guide local"],
    description:
      "Point de départ idéal pour visiter les Tata Somba et la chaîne de l'Atacora.",
  },
  {
    id: "gh-006",
    name: "Villa Lokossa",
    city: "Lokossa",
    department: "Mono",
    pricePerNight: 13000,
    whatsapp: "22990000006",
    amenities: ["Wi-Fi", "Ventilateur"],
    description:
      "Hébergement simple et accueillant dans le sud-ouest du pays.",
  },
  {
    id: "gh-007",
    name: "Colline Fleurie",
    city: "Dassa-Zoumè",
    department: "Collines",
    pricePerNight: 16000,
    whatsapp: "22990000007",
    amenities: ["Wi-Fi", "Restauration"],
    description:
      "Au cœur du pays, entre les collines sacrées et la route vers le nord.",
  },
  {
    id: "gh-008",
    name: "Ganvié Lodge",
    city: "Ganvié",
    department: "Atlantique",
    pricePerNight: 30000,
    whatsapp: "22990000008",
    amenities: ["Vue lac", "Restauration", "Transfert pirogue"],
    description:
      "Séjour au bord du lac Nokoué, à proximité de la cité lacustre de Ganvié.",
  },
];
