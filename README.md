# 💳 Expense Tracker

> A clean, modern mobile personal finance tracking app built with **React Native**, **Expo SDK 57**, and **TypeScript**. Designed for offline-first speed, clarity, and ease of use.

---

## 📱 What the App Does

**Expense Tracker** helps users manage and monitor their daily spending effortlessly:

- **📊 Live Spending Summary**: Displays real-time total expenditure and transaction count dynamically at the top of the dashboard.
- **⚡ Add Transactions Quickly**:
  - Enter expense title, amount, category, and date.
  - Automatically defaults to today's date (`YYYY-MM-DD`).
  - Strict input validation prevents negative amounts, empty titles, and invalid date formats.
- **🏷️ Visual Categorization**:
  - 4 core spending categories with intuitive icons and colors:
    - 🍔 **Food**
    - ✈️ **Travel**
    - 🛍️ **Shopping**
    - 📦 **Other**
- **🔍 Transaction Details Screen**:
  - Tap any transaction card to open the dedicated details screen.
  - View full transaction breakdown: title, formatted amount, category badge, date, and audit creation timestamp.
- **🗑️ Safe Deletion**:
  - Delete any expense with an immediate native confirmation dialog (`Alert.alert`) to prevent accidental deletion.
- **💾 100% Offline Persistence**:
  - All transactions persist locally on device storage using `@react-native-async-storage/async-storage`.
  - Your data remains intact when restarting or force-closing the app — no cloud account or internet connection required.
- **🎨 Custom Visual Identity**:
  - Polished custom 1024×1024 app icon, adaptive launcher icon, and splash screen matching the royal blue fintech theme.

---

## 🏗️ Project Architecture

The codebase follows a modular, scalable folder structure where every component and screen remains small, focused, and maintainable (< 150 lines per file):

```text
ExpenseTracker/
├── App.tsx                         # App entry, NavigationContainer & Context Provider
├── app.json                        # App configuration, custom icon & splash screen
├── eas.json                        # EAS Build configuration for APK & production
├── .npmrc                          # Peer dependency resolution configuration
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── AppButton.tsx           # Multi-variant button (primary, danger, ghost)
│   │   ├── CategoryBadge.tsx       # Category chip with emoji and tint
│   │   ├── CategoryPicker.tsx      # Interactive category selection chips
│   │   ├── DetailRow.tsx           # Detail screen key-value pair with divider
│   │   ├── EmptyState.tsx          # Illustrated state when no expenses exist
│   │   ├── ExpenseCard.tsx         # Transaction card item in the list
│   │   ├── FormField.tsx           # Form input field with label and error messages
│   │   ├── StateHandler.tsx        # Centralized loading spinner and error retry container
│   │   ├── SummaryCard.tsx         # Total expenditure banner
│   │   └── index.ts                # Clean barrel exports
│   ├── constants/                  # Theme tokens & design system
│   │   ├── theme.ts                # COLORS, SPACING, FONT_SIZES, CATEGORY_CONFIG
│   │   └── index.ts
│   ├── context/                    # Global state management
│   │   ├── ExpenseContext.tsx      # Single source of truth & AsyncStorage operations
│   │   └── index.ts
│   ├── screens/                    # Application screens
│   │   ├── HomeScreen.tsx          # Main dashboard, FlatList, pull-to-refresh, FAB
│   │   ├── AddExpenseScreen.tsx    # Add expense form with live validation
│   │   ├── DetailScreen.tsx        # Expense breakdown and delete confirmation
│   │   └── index.ts
│   ├── types/
│   │   └── expense.ts              # TypeScript interfaces (Expense, Category, Navigation)
│   └── utils/                      # Pure helper functions
│       ├── formatters.ts           # Currency and date formatters
│       ├── validation.ts           # Input form validation rules
│       └── index.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 How to Run the App

Follow these simple steps to run the application locally from scratch:

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version, v18+ or v20+ recommended)
- `npm` (comes bundled with Node)
- **Expo Go** app installed on your Android device or iOS device, or an Android Emulator / iOS Simulator.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/rn-expense-tracker-akash.git
cd rn-expense-tracker-akash
```

### 2. Install dependencies
```bash
npm install
```
*(Note: A `.npmrc` is included to ensure clean peer-dependency resolution across all environments).*

### 3. Verify TypeScript type safety
```bash
npm run typecheck
```

### 4. Start the Expo development server
```bash
npx expo start
```

### 5. Open on your device
- **Physical Android Phone**: Open the Expo Go app and scan the QR code printed in your terminal.
- **Physical iPhone**: Open the Camera app, scan the QR code, and tap the prompt to open in Expo Go.
- **Android Emulator**: Press `a` in the terminal with an active emulator running.
- **iOS Simulator**: Press `i` in the terminal (macOS only).
- **Web Browser**: Press `w` in the terminal to view in your browser.

---

## 🧪 Testing Checklist

Try these actions to test the app's reliability:

1. **Add Expenses**: Tap `+ Add`, enter valid details, and tap `Save Expense`. It appears immediately at the top of the list.
2. **Form Validation**:
   - Try submitting with an empty title → highlights "Title is required".
   - Try entering letters or `$0` in the amount → validates "Amount must be greater than zero".
   - Try entering an invalid date format → requires valid `YYYY-MM-DD`.
3. **Delete Expense**: Tap an expense card to view details, then tap `Delete Expense`. A native alert asks for confirmation. Confirming removes it and updates the total spent.
4. **Offline Persistence**: Add a few expenses, force-close the app completely from your phone's recent apps switcher, and reopen. All expenses remain saved.

---

## 🚧 What's Not Finished Yet (Upcoming Roadmap)

Features planned for upcoming iterations:

- [ ] **Edit Existing Expenses**: Ability to modify the title, amount, category, or date of an existing transaction.
- [ ] **Category Filtering**: Filter transactions on the home screen by specific category (e.g. show only Food).
- [ ] **Monthly & Weekly Analytics**: Interactive charts showing breakdown by category and spending trends over time.
- [ ] **Search & Sort**: Search bar to query expenses by keyword, and sorting options (highest amount, lowest amount, oldest first).
- [ ] **Monthly Budget Limits**: Set a monthly budget goal with visual warnings when nearing 80% or 100% capacity.
- [ ] **Export Data**: Export transaction history to CSV or PDF for budgeting and tax purposes.
- [ ] **Biometric App Lock**: Fingerprint / Face ID unlock before opening financial records.

---

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 57)
- **Runtime**: [React Native](https://reactnative.dev/) (0.86)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Navigation**: [React Navigation 7](https://reactnavigation.org/) (Native Stack)
- **Local Storage**: [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- **Build System**: [EAS Build](https://docs.expo.dev/build/introduction/)
