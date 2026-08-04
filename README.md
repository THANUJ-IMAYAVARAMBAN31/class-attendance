# Class Attendance Management System

A full-stack MERN application for managing student attendance using QR code scanning and role-based access control.

The system is designed for educational institutions to simplify attendance tracking through secure authentication, QR-based attendance marking, and department-wise class management.
---
Live @ [[https://class-attendance-ten.vercel.app/]]
---
## Features

### Authentication & Security

* JWT-based authentication
* Password hashing using bcrypt
* Role-Based Access Control (RBAC)
* Protected routes for all dashboards
* Separate access credentials for Head and Security roles
* Student approval workflow before system access

### Student Management

* Student registration with department selection
* Approval/Rejection system managed by Head
* Pending status for newly registered users
* Re-registration allowed after rejection
* Unique QR code generated after approval

### Class Management

* Create classes with:

  * Class Name
  * Department
  * Date
  * Start Time
  * End Time
* Support for multiple classes at the same time
* Department-specific scheduling
* Class-wise attendance tracking

### QR-Based Attendance

* Unique QR code assigned to each student
* Webcam-based QR scanning
* First scan recorded as **In Time**
* Second scan recorded as **Out Time**
* Duration inside class calculated automatically
* Students with no scans are marked absent automatically

### Attendance Monitoring

* View attendance by class
* Department-wise attendance records
* Present students list
* Absent students list
* In Time records
* Out Time records
* Attendance duration tracking

## User Roles

### Head

The Head acts as the administrator of the system.

Responsibilities:

* Approve student registration requests
* Reject student registration requests
* Create classes
* Schedule department-wise classes
* View attendance reports
* Monitor present and absent students
* Review class-wise attendance records

### Security

The Security role manages attendance entry and exit tracking.

Responsibilities:

* Access webcam scanner
* Scan student QR codes
* Record student entry time
* Record student exit time
* Update attendance records automatically

### Student

Students can access the platform after approval.

Responsibilities:

* Register for system access
* Wait for Head approval
* View personal profile
* Access unique QR code
* View attendance history
* Track attendance records

## Workflow

### Student Registration

1. Student creates an account.
2. Account status is marked as **Waiting**.
3. Head reviews registration request.
4. Head approves or rejects the request.
5. Approved students receive access to their dashboard.

### Class Creation

1. Head creates a class.
2. Selects department.
3. Sets class date.
4. Sets start time.
5. Sets end time.
6. Class becomes available for attendance tracking.

### Attendance Process

1. Student arrives and presents QR code.
2. Security scans the QR code.
3. First scan records In Time.
4. Student attends class.
5. Student exits.
6. Security scans the QR code again.
7. Second scan records Out Time.
8. Duration is calculated automatically.
9. Students without scans are marked absent.

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

### Additional Features

* QR Code Generation
* QR Code Scanning
* Webcam Integration
* REST API Architecture

## Project Structure

```text
client/
├── src/
├── components/
├── pages/
├── services/

server/
├── routes/
├── controllers/
├── models/
├── middleware/
├── config/
```

## Installation

### Clone Repository

```bash
git clone https://github.com/THANUJ-IMAYAVARAMBAN31/class-attendance
cd class-attendance
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm run dev
```

## Deployment

### Frontend

Deployed on Vercel.

### Backend

Deployed on Render.

## Screenshots

### Landing Page

* Modern landing page
* Login access
* New registration request option

### Head Dashboard

* Student approval and rejection
* Class creation panel
* Department-wise class management
* Attendance monitoring

### Security Dashboard

* Webcam QR scanner
* Attendance entry/exit tracking

### Student Dashboard

* Personal information
* Department details
* Unique QR code
* Attendance history

## Security Features

* JWT Authentication
* Password Hashing with bcrypt
* Protected Routes
* Role-Based Authorization
* Secure Attendance Access
* Department-Based Attendance Validation

## Future Improvements

* Attendance percentage analytics
* Export attendance reports to PDF
* Excel attendance downloads
* Email notifications
* Dashboard statistics and charts
* Mobile responsive enhancements
* Real-time attendance updates using WebSockets
* Multi-department administration support

## Learning Outcomes

This project helped in understanding:

* MERN Stack Development
* Authentication & Authorization
* JWT Security
* Password Hashing
* REST API Design
* MongoDB Data Modeling
* QR Code Integration
* Webcam Access APIs
* Role-Based Access Control
* Full Stack Deployment

## Author
THANUJ IMAYAVARAMBAN M
Developed as a full-stack MERN project for managing classroom attendance through QR-based verification and role-based access control.

---

⭐ If you found this project useful, consider giving it a star.
