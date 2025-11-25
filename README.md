# Ad Victoriam - Location Monitoring System 🗺️📍

> A real-time location tracking web application with role-based access control

Created for **.devHacks 2024** - A monitoring solution that enables administrators to view user locations on an interactive map.

## 📋 Overview

Ad Victoriam is a full-stack web application that implements a location monitoring system with two distinct user experiences. Regular users can share their location data, while administrators have access to a comprehensive dashboard displaying all user locations on an interactive map in real-time.

### Key Features

- 🗺️ **Interactive Map Display** - Real-time visualization of user locations
- 👥 **Role-Based Access** - Separate interfaces for admin and regular users
- 📍 **Location Tracking** - Automatic collection and storage of user location data
- 🔐 **Secure Authentication** - User management system with role permissions
- 🌐 **Web-Based Platform** - Accessible from any browser
- 🐳 **Containerized Deployment** - Docker support for easy deployment

## 🛠️ Tech Stack

### Frontend (43.7% JavaScript, 13.2% CSS, 9.3% HTML)
- **React** - Built with Create React App
- **JavaScript** - Core application logic
- **CSS** - Custom styling and responsive design
- Separate apps for monitoring (admin) and user interfaces

### Backend (33.6% Python)
- **Python** - Server-side logic and API
- RESTful API architecture
- Location data processing and storage

### DevOps (0.2% Dockerfile)
- **Docker** - Containerization for consistent deployment
- Easy setup and scaling

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Python 3.x
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Jared-Rost/Ad-Victoriam-Repository.git
   cd Ad-Victoriam-Repository
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

3. **Frontend Setup - Admin Monitoring App**
   ```bash
   cd Frontend/monitoringApp
   npm install
   npm start
   ```
   The admin dashboard will open at [http://localhost:3000](http://localhost:3000)

4. **Frontend Setup - User App**
   ```bash
   cd Frontend/userApp
   npm install
   npm start
   ```
   The user interface will open at a different port

### Docker Deployment (Optional)

```bash
docker-compose up
```

## 🏗️ Project Structure

```
Ad-Victoriam-Repository/
├── Frontend/
│   ├── monitoringApp/    # Admin dashboard with map view
│   ├── userApp/          # Regular user interface
│   └── trash/            # Development artifacts
├── backend/              # Python API server
├── Dockerfile            # Container configuration
└── README.md             # This file
```

## 👤 User Roles

### Regular Users
- Share location data
- View their own activity
- Simple, privacy-focused interface

### Admin Users
- View all user locations on map
- Real-time monitoring dashboard
- Comprehensive location history

## 💡 Use Cases

- **Team Coordination** - Track field team locations in real-time
- **Event Management** - Monitor attendee locations during large events
- **Fleet Management** - Track delivery personnel or vehicles
- **Safety Monitoring** - Ensure team member safety in remote locations
- **Resource Allocation** - Optimize dispatch based on current locations

## 🔒 Security & Privacy

- Role-based access control (RBAC)
- Secure authentication system
- Location data encryption
- User consent required for tracking

## 🎯 Hackathon Context

Built during **.devHacks 2024**, this project demonstrates:
- Full-stack development skills
- Real-time data visualization
- User authentication and authorization
- Map integration and geolocation APIs
- Team collaboration and rapid prototyping

## 📄 License

This project is available for educational and demonstration purposes.
