// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-oRc_gYbuNmkpxtaMdoDhbhRbI0_fc6g",
    authDomain: "ecomap-fd835.firebaseapp.com",
    projectId: "ecomap-fd835",
    storageBucket: "ecomap-fd835.firebasestorage.app",
    messagingSenderId: "141847964068",
    appId: "1:141847964068:web:ab0b24ba69dd6891c5b931",
    measurementId: "G-JE9HEDL2WG"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  let map = L.map('map').setView([51.505, -0.09], 2);  // Default to center map to a global view
  
  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Add a click listener to the map
  map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
  
    // Save location to Firestore
    db.collection("locations").add({ lat, lng });
  
    // Add a marker to the map
    L.marker([lat, lng]).addTo(map);
  });
  
  // Fetch and display saved locations
  db.collection("locations").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const { lat, lng } = doc.data();
      L.marker([lat, lng]).addTo(map);
    });
  });
  
