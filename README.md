# 🌐 PACT Booking App  
### _A Prototype Mobile Booking System for Peterhead Area Community Trust (PACT)_  
**Developed by Group Quebec** | Robert Gordon University | CM2112 Module  
📅 **Submission Date:** 3rd December 2025  

---

<div align="center">
  <img src="./assets/images/pact-logo.jpeg" alt="PACT Booking App Thumbnail" width="160"/>

  <p><em>Empowering communities through digital inclusion and smarter facility management.</em></p>

  <a href="https://www.figma.com/design/bZK56WqNrLq9PiuyhAXUzU/PACT---App?node-id=39-36&t=vO7a5McuPpskOlM0-1">
    🎨 View the Figma Design
  </a>

  <br /><br />

  <img src="https://img.shields.io/badge/Framework-React%20Native-blue?logo=react" />
  <img src="https://img.shields.io/badge/Platform-Expo-lightgrey?logo=expo" />
  <img src="https://img.shields.io/badge/Language-TypeScript-blue" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-teal" />
  <img src="https://img.shields.io/badge/Testing-UX%20and%20Prototype-orange" />
</div>

---

## 📖 Overview  

The **PACT Booking App** is a cross-platform mobile prototype designed for the **Peterhead Area Community Trust (PACT)** — a volunteer-led charity based in Peterhead, Scotland.  

This app prototype demonstrates how technology can improve **community engagement**, **accessibility**, and **facility management**. Built with **React Native and Expo**, it allows users to:
- Browse community facilities  
- View availability  
- Book time slots  
- Manage personal bookings  

The system demonstrates how PACT could scale into a **“Smart Community Hub”**, supporting volunteering, news updates, and IoT park integrations.

---

## 🧩 Core Features  

| Category | Description |
|-----------|-------------|
| 🏠 **Home & Explore Pages** | View and search facilities available for booking |
| 🕓 **Facility Booking** | Choose a slot, confirm booking, view in profile |
| 👤 **Profile Page** | Track previous and current bookings |
| 🔐 **Mock Authentication** | Demo Google-style login via AsyncStorage |
| 🎨 **UI/UX Design** | Created in **Figma** (wireframes + high-fidelity mockups) |
| ⚙️ **Offline Data** | Uses mock data to simulate real backend and user flow |

---

## 🧠 Project Architecture  

```
app/
 ┣ (root)/
 ┃ ┣ (tabs)/             # Home, Explore, and Profile screens
 ┃ ┣ book/[id].tsx       # Facility booking page
 ┃ ┗ _layout.tsx         # Root stack navigation
 ┣ sign-in.tsx           # User authentication (mock)
 ┣ index.tsx             # Entry and routing logic
 ┗ _layout.tsx           # Global provider and wrapper

lib/
 ┣ global-provider.tsx   # App-wide context and state management
 ┣ mock-api.ts           # Facility & booking mock API
 ┗ types.ts              # Shared data interfaces

components/
 ┗ FacilityCard.tsx      # Facility UI card component
```

---

## 🧑‍💻 Tech Stack  

| Layer | Technology |
|-------|-------------|
| Framework | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) |
| Language | TypeScript |
| Styling | TailwindCSS (NativeWind) |
| Navigation | Expo Router |
| State Management | React Context API |
| Storage | AsyncStorage |
| UX Testing | A/B, Think-Aloud, and 5-Second Testing |
| Version Control | Git & GitHub |

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/pact-booking.git
cd pact-booking
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the App
```bash
npx expo start
```

Then open it using:
- 📱 Android Emulator  
- 🍎 iOS Simulator  
- 🌐 Web via Expo Go  

You can also scan the QR code in your terminal with the **Expo Go app** on your mobile device.

---

## 🧪 UX Testing Summary  

The prototype underwent **user testing** using:
- ✅ **A/B Testing** — compared booking layouts  
- ✅ **5-Second Testing** — assessed first impression clarity  
- ✅ **Think-Aloud Testing** — gathered real-time user feedback  

### Key Insights:
- Users preferred left-aligned booking slots  
- The “Book” button drew quick attention  
- Simplicity and visual clarity scored highly  

---

## 🧭 Future Enhancements  

| Feature | Description |
|----------|-------------|
| 📰 **Community Newsfeed** | Local updates and park events |
| 🤝 **Volunteer Management** | Sign-up flow for local initiatives |
| ☁️ **Backend Integration** | Real-time booking with **MongoDB** or **PostgreSQL** |
| 🌍 **Cloud Hosting** | Deployment on **AWS** or **Azure** for scalability |
| 🔔 **Push Notifications** | Event reminders and booking alerts |
| 🧏‍♂️ **Accessibility** | Multilingual & inclusive design |
| 🧠 **IoT Dashboard** | Smart park sensors (footfall, energy, environment) |

---

## 📘 Legal, Ethical & Professional Considerations  

- 🧾 **Data Protection:** DPIA and Ethics forms completed per UK GDPR.  
- 🛡️ **Privacy:** No personal data collected; mock users only.  
- ⚖️ **Professional Standards:** Follows RGU ethical and technical guidelines.  

---

## 👥 Group Quebec  

| Name | Student ID |
|------|-------------|
| Cornelius D. Dugu | 2423332 |
| Matthew Sarkodie Darkwah | 2506116 |
| Samuel Newman Oduro | 2421670 |
| Fredrick Osagioduwa Eriamiatoe | 2423338 |

**Module Coordinator:** Ross McLean  
**Institution:** Robert Gordon University  

---

## 📚 References  

- PACT Peterhead: [Facebook Page](https://www.facebook.com/PETERHEADAREACOMMUNITYTRUST/)  
- Figma Design: [UI/UX Prototype](https://www.figma.com/design/bZK56WqNrLq9PiuyhAXUzU/PACT---App?m=auto&t=29NkFtfNwtnJNiL5-1)  
- Research Sources: RGU Library, Google Scholar, YouTube, RefWorks, Generative AI  

---

<div align="center">

**“Digital inclusion begins with community.”**  
💙 Built with care by **Group Quebec** | © 2025 Robert Gordon University  

</div>
