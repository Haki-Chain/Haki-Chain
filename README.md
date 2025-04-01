# Haki Chain - Decentralized Legal Aid Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)  
[![Discord](https://img.shields.io/discord/1234567890?label=Join%20our%20Discord&logo=discord&color=7289DA)](https://discord.gg/hakichain)

---

## 🌟 Overview

Haki Chain is a **decentralized legal aid platform** built on **Django**, **Hedera Hashgraph**, and **Next.js**. It connects **lawyers**, **NGOs**, and **donors** to provide legal assistance to underserved communities. By leveraging **Hedera's fast and secure blockchain**, **smart contracts**, and **community-driven collaboration**, Haki Chain democratizes access to justice globally.

This GitHub repository contains the core codebase for Haki Chain, including smart contracts (Hedera), backend APIs (Django), frontend interfaces (Next.js), and AI-powered tools. We invite developers, legal professionals, and blockchain enthusiasts to contribute to this project and help us expand access to justice worldwide.

---

## 📋 Table of Contents

1. [Key Features](#key-features)  
2. [Repository Structure](#repository-structure)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running the Project](#running-the-project)  
4. [Hedera Smart Contracts](#hedera-smart-contracts)  
5. [Django Backend](#django-backend)  
6. [Next.js Frontend](#nextjs-frontend)  
7. [AI-Powered Assistance](#ai-powered-assistance)  
8. [Team Members](#team-members)  
9. [Contributing](#contributing)  
10. [License](#license)  
11. [Contact & Support](#contact--support)  

---

## 🔑 Key Features

- **Decentralized Legal Bounties**: NGOs can create bounties for legal cases, donors can fund them, and lawyers can claim and resolve them.  
- **Hedera Blockchain Security**: All transactions and case records are stored immutably on Hedera Hashgraph.  
- **Smart Contract Automation**: Automates fund disbursement and milestone tracking for legal cases.  
- **HAKI Token Integration**: The utility token powers the ecosystem, enabling governance and incentivizing participation.  
- **AI Assistant**: Provides real-time guidance for users, including legal terminology explanations and bounty creation support.  

---

## 📂 Repository Structure

The repository is organized into the following directories:  

```
hakichain/
├── contracts/          # Hedera smart contracts (Solidity/Hedera SDK)
├── backend/            # Django-based backend
│   ├── apps/           # Django apps (e.g., users, bounties, tokens)
│   ├── settings.py     # Django configuration
│   └── manage.py       # Django management script
├── frontend/           # Next.js-based frontend
│   ├── pages/          # Next.js pages (e.g., home, bounties, profile)
│   ├── components/     # Reusable React components
│   └── styles/         # CSS/SCSS styles
├── ai-assistant/       # AI-powered chatbot logic
├── docs/               # Documentation (API, architecture, etc.)
├── tests/              # Unit and integration tests
├── scripts/            # Deployment and utility scripts
└── README.md           # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** (v3.9 or higher) for Django backend  
- **Node.js** (v16 or higher) for Next.js frontend  
- **Hedera Testnet Account** (for smart contract deployment)  
- **MetaMask** (for wallet integration with Hedera)  
- **PostgreSQL** (for Django database)  

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/hakichain/hakichain.git
   cd hakichain
   ```

2. Install dependencies:  
   - Backend:  
     ```bash
     cd backend
     pip install -r requirements.txt
     ```  
   - Frontend:  
     ```bash
     cd frontend
     npm install
     ```  
   - AI Assistant:  
     ```bash
     cd ai-assistant
     npm install
     ```

3. Set up environment variables:  
   Create a `.env` file in the `backend/` directory and add the following:  
   ```
   HEDERA_OPERATOR_ID=your_hedera_operator_id
   HEDERA_OPERATOR_KEY=your_hedera_operator_key
   DATABASE_URL=postgres://user:password@localhost:5432/hakichain
   SECRET_KEY=your_django_secret_key
   HAKI_TOKEN_ADDRESS=your_haki_token_address
   ```

4. Migrate Django database:  
   ```bash
   cd backend
   python manage.py migrate
   ```

5. Deploy Hedera smart contracts:  
   Use the Hedera SDK to deploy smart contracts to the testnet. Refer to the `contracts/` directory for details.

### Running the Project

1. Start the Django backend:  
   ```bash
   cd backend
   python manage.py runserver
   ```

2. Start the Next.js frontend:  
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the platform at `http://localhost:3000`.

---

## 🔗 Hedera Smart Contracts

The `contracts/` directory contains the smart contracts that power Haki Chain, written using **Solidity** and deployed on **Hedera Hashgraph**.  

- **BountyManager.sol**: Manages the creation, funding, and resolution of legal bounties.  
- **HAKIToken.sol**: ERC-20 token implementation for the HAKI token.  
- **Escrow.sol**: Handles secure fund holding and milestone-based payouts.  

### Testing Smart Contracts

Run unit tests for smart contracts using the Hedera SDK:  
```bash
cd contracts
npm test
```

---

## 🖥️ Django Backend

The backend is built with **Django** and provides RESTful APIs for interacting with the Hedera blockchain and managing user data.  

### Key Features:
- User authentication and authorization.  
- Bounty creation, funding, and resolution APIs.  
- Integration with Hedera for transaction handling.  

### Running the Backend
Start the Django development server:  
```bash
cd backend
python manage.py runserver
```

---

## 🌐 Next.js Frontend

The frontend is built with **Next.js** and provides a responsive, user-friendly interface for interacting with the platform.  

### Key Features:
- Pages for bounty browsing, case management, and donor contributions.  
- Integration with MetaMask for wallet connectivity.  
- Real-time updates using WebSockets for milestone tracking.  

### Running the Frontend
Start the Next.js development server:  
```bash
cd frontend
npm run dev
```

---

## 🤖 AI-Powered Assistance

The AI assistant is built using **LangChain** and **OpenAI APIs**. It provides:  
- Guidance on creating effective legal bounties.  
- Explanations of complex legal terminology and processes.  
- Recommendations for relevant bounties based on user profiles.  

To run the AI assistant locally:  
```bash
cd ai-assistant
npm start
```

---

## 👥 Team Members

Here are the key contributors to the Haki Chain project:

1. **@olusiekwin**  
   - Role: Frontend Developer  
   - GitHub: [@olusiekwin](https://github.com/olusiekwin)  

2. **@MercyMurigi**  
   - Role: Project Manager  
   - GitHub: [@MercyMurigi](https://github.com/MercyMurigi)  

3. **Kelvin-Wepo**  
   - Role: Web3 Developer  
   - Contribution: Smart contract development and Hedera integration  

---

## 🤝 Contributing

We welcome contributions from developers, legal professionals, and blockchain enthusiasts! To contribute:  

1. Fork the repository.  
2. Create a branch for your feature or bug fix:  
   ```bash
   git checkout -b feature/your-feature-name
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add your descriptive commit message"
   ```  
4. Push to your fork:  
   ```bash
   git push origin feature/your-feature-name
   ```  
5. Submit a pull request.  

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

For questions or support, please reach out via:  
- **Email**: support@hakichain.org  
- **Discord**: [Join our Discord](https://discord.gg/hakichain)  
- **Twitter**: [@HakiChain](https://twitter.com/hakichain)  

---

## 🌍 Join the Movement

Help us transform access to justice through blockchain technology!  

🌟 **Ready to Make a Difference?**  
[Create an Account](https://www.hakichain.org/signup) | [Browse Bounties](https://www.hakichain.org/bounties)  

---

**Thank you for supporting Haki Chain!**
