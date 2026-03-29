# ♻️ Waste2Worth

> **Transform waste into valuable resources using smart AI + structured reuse guidance**

---

## 📌 Overview

Waste2Worth is a smart waste analysis and reuse suggestion platform that helps users understand what their waste item is, why it matters, and how it can be reused, recycled, or upcycled in a useful way.

The project is built to encourage sustainable living by turning everyday waste into opportunities for creativity, recycling, and value recovery.

---

## 🚀 Problem Statement

Every day, millions of people generate waste, but:

- ❌ They do not know how to reuse it
- ❌ They lack awareness of recycling methods
- ❌ They dispose of useful materials incorrectly

This leads to:

- 🌍 Environmental pollution
- 🗑️ Resource wastage
- 🏭 Increased landfill burden

---

## 💡 Solution

**Waste2Worth** helps users:

1. 📸 Upload an image of waste
2. ✍️ Describe the waste item
3. 🧠 Get smart detection and classification
4. ♻️ Receive step-by-step reuse ideas

---

## ✨ Key Features

### 🔍 Smart Waste Detection
- Keyword-based and category-based matching
- Handles vague inputs like **"plastic"**, **"wood"**, or **"metal"**
- Gives the closest relevant waste category

### 🧠 Structured Output
- Detected item
- Environmental impact
- Warning message
- Reuse ideas with step-by-step guidance

### ♻️ Upcycling Guidance
- Practical DIY ideas
- Difficulty level
- Time estimation
- Reuse suggestions based on material type

### 📊 Gamified Dashboard
- User levels and badges
- Daily missions and streaks
- Environmental impact tracking

### 📁 History Tracking
- Stores past scans
- Shows user activity
- Helps users revisit previous waste analyses

---

## 🛠️ Tech Stack

- ⚛️ **React**
- 🟦 **TypeScript**
- 🎨 **Tailwind CSS**
- ⚡ **Vite**
- 🧠 **Custom Matching Engine**
- 💾 **LocalStorage** for history tracking

---
### 📁 Demo 

Link - https://drive.google.com/file/d/13gbLoXnNVsQwZWAvbgaYCjKo7e7LdtYK/view?usp=sharing

---

## 🧠 How It Works

```text
User Input (Image + Description)
        ↓
Keyword Extraction
        ↓
Multi-layer Matching
   ├── Exact Match
   ├── Alias Match
   ├── Partial Match
   └── Category Fallback
        ↓
Waste Database (wasteDB)
        ↓
Structured Result Output
        ↓
Dashboard + History Storage



