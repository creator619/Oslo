# Oslo Travel Companion - Elkészült Fejlesztések & Citybox Szálloda GPS Navigáció

Hozzáadtuk a **Citybox Oslo Szálloda** modult és az élő **GPS alapú útvonaltervezést**.

---

## 📂 A projekt frissített fájlszerkezete

1. **[index.html](file:///c:/Users/simon/Desktop/Oslo/index.html)**: Új **🏨 Szálloda (Citybox)** navigációs fül gomb, térkép melletti **🧭 GPS Útvonal a Szállodába** gomb, valamint a `#hotel-modal` részletes információkkal és gombokkal.
2. **[style.css](file:///c:/Users/simon/Desktop/Oslo/style.css)**: Kiegészítve a szállodai arany/narancs gombok, a GPS státusz banner és az infókártyák stílusaival.
3. **[app.js](file:///c:/Users/simon/Desktop/Oslo/app.js)**: Kiegészítve a Citybox Oslo koordinátáival (`59.9109, 10.7461`), kiemelt arany hotel jelölővel a térképen, `navigator.geolocation` helymeghatározással és automatikus Google Maps útvonaltervezővel.
4. **[manifest.json](file:///c:/Users/simon/Desktop/Oslo/manifest.json)**: Progressive Web App beállítások.
5. **[sw.js](file:///c:/Users/simon/Desktop/Oslo/sw.js)**: Frissített Service Worker (v6).

---

## ✨ A Citybox Szálloda & GPS Navigáció Funkciói

- **🏨 Beépített Citybox Oslo Szálloda**:
  - **Cím**: Prinsens gate 24, 0154 Oslo (300 méterre az Oslo Sentralstasjon főpályaudvartól).
  - Állandó kiemelt arany gombostű 🏨 jelöléssel a térképen.
- **🧭 Élő GPS Útvonaltervezés**:
  - Bárhol vagytok a városban, az **`🧭 GPS Útvonal a Szállodába`** gombra kattintva az app lekéri a jelenlegi GPS pozíciótokat.
  - Kiszámítja a távolságot (pl. *850 méter, kb. 10 perc séta*).
  - Berajzolja a pozíciótokat és az irányvonalat az interaktív térképen.
  - Azonnal megnyitja a Google Maps gyalogos/tömegközlekedési élő navigációját a Citybox Hotellig!
- **ℹ️ Szálloda Infók & Közlekedés**:
  - Elérhető információk a Check-in/Check-out időkről (15:00 / 12:00), a legközelebbi metró- és villamosmegállókról.

---

## 📱 Telepítés a telefonra (PWA)
Nyissátok meg az **[index.html](file:///c:/Users/simon/Desktop/Oslo/index.html)** fájlt a böngészőben, és adjátok hozzá a kezdőképernyőhöz!
