# Oslo Travel Companion - Elkészült Fejlesztések & Egyszerűsített Látnivalók Nézet

Az alkalmazásból kiszedtem a napi tervek szűrőit (`1-4. Nap`), és leegyszerűsítettem a felületet egyetlen letisztult **📍 Látnivalók** fülre.

---

## 📂 A projekt frissített fájlszerkezete

1. **[index.html](file:///c:/Users/simon/Desktop/Oslo/index.html)**: Főnavigációs gomb átnevezve **📍 Látnivalók** névre, a napok szerinti alcím-gombok törölve.
2. **[style.css](file:///c:/Users/simon/Desktop/Oslo/style.css)**: Frissített stílusok az átlátható, letisztult látnivalók gridhez és gombokhoz.
3. **[app.js](file:///c:/Users/simon/Desktop/Oslo/app.js)**: A napi szűrés eltávolítva; az összes látnivaló egyetlen áttekinthető listában és a térképen jelenik meg.
4. **[manifest.json](file:///c:/Users/simon/Desktop/Oslo/manifest.json)**: Progressive Web App beállítások.
5. **[sw.js](file:///c:/Users/simon/Desktop/Oslo/sw.js)**: Frissített Service Worker (v5) az offline támogatáshoz.

---

## ✨ A Letisztult "Látnivalók" Nézet Funkciói

- **📍 Letisztult Látnivalók Fül**:
  - Megszűntek a napi bontású gombok (1. nap, 2. nap...), az összes látnivaló egyetlen könnyen átlátható felületen érhető el.
- **➕ Saját Látnivalók Hozzáadása (`+ Új Látnivaló Hozzáadása`)**:
  - Tetszőleges új helyszínt vagy programot adhattok hozzá (Név, Cím, Leírás/Jegyzet, Emoji).
- **🗑️ Egyedi Látnivaló Törlése (`Látnivaló törlése`)**:
  - Bármelyik kártyát törölhetitek, amit nem szeretnétek meglátogatni.
- **🧹 Tiszta Lap (`Tiszta lap / Összes törlése`)**:
  - Ha teljesen nulláról szeretnétek felépíteni a saját oslói listátokat.
- **🔄 Ajánló Visszaállítása**:
  - Az eredeti oslói látnivalók egy kattintással bármikor visszahozhatók.
- **🗺️ Google Maps Navigáció**:
  - Minden látnivaló címére vagy a térkép jelölőire kattintva azonnal megnyílik a Google Maps navigáció.

---

## 📱 Telepítés a telefonra (PWA)
Nyissátok meg az **[index.html](file:///c:/Users/simon/Desktop/Oslo/index.html)** fájlt a böngészőben, és adjátok hozzá a kezdőképernyőhöz az offline használathoz!
