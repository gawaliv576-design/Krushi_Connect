# Krushi Seva Kendra - Agricultural Shop Management System

A comprehensive Spring Boot web application for managing an agricultural shop with inventory management, user roles, credit tracking, and payment management.

## 🌾 Features

### Core Features
- **User Management**
  - Admin and farmer-customer role-based access control
  - User registration and authentication
  - User profile management
  
- **Product Management**
  - Product catalog with bilingual support (English/Marathi)
  - Category management
  - Inventory tracking
  - Pricing and discount management
  - Product ratings

- **Financial Management**
  - Payment tracking
  - Udhari (Credit) ledger system
  - Payment status tracking
  - Multiple payment methods
- **Customer Enquiries**
  - Contact requests are saved to the database and manageable from Admin > Enquiries

- **Dashboard**
  - Admin dashboard with statistics
  - Farmer dashboard with personal data
  - Recent transactions overview

## 🛠️ Tech Stack

- **Backend Framework**: Spring Boot 3.1.5
- **JPA & Database**: Spring Data JPA + H2 In-Memory Database
- **Authentication**: Spring Security with BCrypt password encoding
- **Template Engine**: Thymeleaf
- **Frontend**: Bootstrap 5 + Bootstrap Icons
- **Build Tool**: Maven
- **Java Version**: 17

## Project Structure

```
src/main/java/com/krushiseva/
├── config/       # Security, locale, seed data and WhatsApp settings
├── controller/   # Public, auth, admin, customer and farmer routes
├── entity/       # Category, Enquiry, Payment, Product, Udhari and User
├── repository/   # Spring Data JPA repositories
├── security/     # User details and role mapping
└── service/      # Product, payment, Udhari, user and enquiry services

src/main/resources/
├── templates/    # Thymeleaf pages and shared layout fragments
├── static/       # CSS, JavaScript and shop/product images
├── application.properties
├── application-dev.properties
└── messages*.properties
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Git

### Installation & Setup

1. **Clone the Repository**
```bash
git clone <repository-url>
cd demo-krushi-connect
```

2. **Build the Project**
```bash
mvn clean install
```

3. **Run the Application**
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

The application will start on `http://localhost:8080`

Spring Boot DevTools is included for development restarts and live template/static-resource refresh. Thymeleaf caching is disabled; static resource caching is disabled with the `dev` profile.
For PowerShell, run `mvn.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"`.

### Database Initialization

The application seeds 8 product categories and 12 sample products when the category table is empty. Development demo accounts and sample Udhari/payment records are seeded only with the `dev` profile.
- H2 console is enabled only with the `dev` profile at `http://localhost:8080/h2-console`.
- H2 is in-memory: records, including enquiries, are reset when the app restarts.

## 👥 Demo Credentials

### Admin User
- **Email**: admin@krushiseva.com
- **Password**: admin123
- **Access**: Admin Dashboard, Product Management, Farmer Management, Payments & Credit

### Farmer User
- **Email**: ramesh@patil.com
- **Password**: farmer123
- **Role**: `ROLE_CUSTOMER` (farmer account)
- **Access**: Farmer dashboard, Udhari, UPI payment QR, payment history and profile

### Language and customer payment pages
- The first visit defaults to Marathi. Use the navbar language links to switch between Marathi and English; the selected locale is stored for the session.
- Product catalogue filters accept `categoryId`, `company`, `minPrice`, `maxPrice`, `inStock`, `keyword`, `sort`, `page`, and `size` (default 12).
- Sign in for customer pages at `/customer/udhari`, `/customer/pay`, `/customer/payments`, and `/customer/profile`.
- UPI QR images are generated on demand at `/customer/pay/qr`; the QR encodes the optional amount and note.
- The shop is physical-only. Website contact enquiries are saved in the H2 database and shown in Admin > Enquiries, then WhatsApp opens so the customer can review and send their message. Orders and delivery are not supported.

### Optional WhatsApp overdue reminders

Automated reminders are disabled by default. To enable them, configure `WHATSAPP_REMINDERS_ENABLED=true`, a Meta Cloud API access token, phone-number ID, API version, approved template name and language. Customers must explicitly opt in from their profile; the scheduler sends only to opted-in customers with valid phone numbers. Configure credentials through environment variables, never in source files.

## 📦 Entities

### User
```java
- id (Long)
- name (String)
- email (String) - Unique
- password (String) - Encrypted
- role (ROLE_ADMIN, ROLE_FARMER, ROLE_CUSTOMER)
- village (String)
- district (String)
- phone (String)
- isActive (Boolean)
- createdAt, updatedAt (LocalDateTime)
```

### Product
```java
- id (Long)
- name (String) - English
- nameMr (String) - Marathi
- company (String)
- category (Category)
- price (BigDecimal)
- discountPrice (BigDecimal)
- gstRate (BigDecimal)
- stockQuantity (Integer)
- minimumStock (Integer)
- image (String)
- rating (Double)
- status (ACTIVE, INACTIVE, OUT_OF_STOCK)
- mrp, batchNumber, expiryDate
- createdAt, updatedAt (LocalDateTime)
```

### Category
```java
- id (Long)
- name (String)
- nameMr (String)
- description (String)
- createdAt (LocalDateTime)
```

### Enquiry
```java
- name, phone, message
- handled (Boolean)
- createdAt (LocalDateTime)
```

### Udhari (Credit)
```java
- id (Long)
- user (User)
- amount (BigDecimal)
- dueDate (LocalDate)
- status (PENDING, PARTIAL, PAID, OVERDUE)
- createdAt, updatedAt (LocalDateTime)
```

### Payment
```java
- id (Long)
- user (User)
- amount (BigDecimal)
- paymentDate (LocalDateTime)
- method (CASH, CHECK, BANK_TRANSFER, UPI, CREDIT_CARD)
- status (PENDING, SUCCESS, FAILED, CANCELLED)
- transactionId (String)
- description (String)
- createdAt (LocalDateTime)
```

## 🔐 Security

- **Authentication**: Form-based login with session management
- **Authorization**: Role-based access control (ADMIN, FARMER, CUSTOMER)
- **Password Security**: BCrypt encryption
- **CSRF Protection**: Enabled
- **Session Management**: Spring Security session handling

## 📱 Pages & Routes

### Public Pages
- `/` - Home page
- `/login` - Login page
- `/register` - User registration
- `/h2-console` - H2 Database console (dev profile only)

### Admin Routes (`/admin/**`)
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Product management
- `/admin/categories` - Category management
- `/admin/farmers` - Farmer directory
- `/admin/payments` - Payment tracking
- `/admin/udhari` - Credit management
- `/admin/enquiries` - Contact enquiry inbox

### Farmer Routes (`/farmer/**`)
- `/farmer/dashboard` - Farmer dashboard
- `/farmer/products` - Browse products
- `/farmer/payments` - Payment history
- `/farmer/udhari` - Credit ledger

### Customer Routes (`/customer/**`)
- `/customer/pay` - UPI QR and payment links
- `/customer/profile` - User profile

## 🎨 Frontend Features

- **Responsive Design**: Mobile-friendly Bootstrap 5 layout
- **Bilingual Support**: English and Marathi language support
- **Icon Integration**: Bootstrap Icons for intuitive UI
- **Form Validation**: Client and server-side validation
- **Status Badges**: Visual status indicators
- **Data Tables**: Responsive tables with hover effects

## 📊 Sample Data

The application seeds 12 sample products across 8 categories when the category table is empty:

### Categories
1. **Seeds** (बियाणे)
2. **Fertilizers** (खते)
3. **Pesticides** (कीटकनाशके)
4. **Equipment** (अवजारे)
5. **Irrigation** (सिंचन)
6. **Animal Feed** (पशुखाद्य)
7. **Organic** (सेंद्रिय)
8. **Horticulture** (फलोत्पादन)

## 🔧 Configuration

Edit `application.properties` for customization:
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:krushiseva
spring.jpa.hibernate.ddl-auto=create-drop
app.shop.name=Saptashrungi Agro Services
app.shop.phone=+91 8600813827
```

### Automatic WhatsApp overdue reminders

Reminders use the Meta WhatsApp Cloud API and are disabled by default. To enable them, create an approved WhatsApp utility template with four body parameters in this order: farmer name, amount, due date, and shop name. The scheduler checks daily at 9:00 AM (server time), sends at most one overdue reminder per credit record, and only sends to farmers who have opted in from their profile. Keep the access token in environment configuration; never commit it to source control.

Set these environment variables in the application runtime:

```text
WHATSAPP_REMINDERS_ENABLED=true
WHATSAPP_CLOUD_API_ACCESS_TOKEN=<Meta permanent or system-user access token>
WHATSAPP_PHONE_NUMBER_ID=<Cloud API sender phone-number ID>
WHATSAPP_GRAPH_API_VERSION=v22.0
WHATSAPP_REMINDER_TEMPLATE_NAME=<approved utility template name>
WHATSAPP_REMINDER_TEMPLATE_LANGUAGE=en
WHATSAPP_REMINDER_CRON=0 0 9 * * *
```

The template name and language must match the approved template in Meta Business Manager. If these settings are incomplete or invalid while reminders are enabled, the application fails startup rather than silently claiming that reminders are active. Customers can withdraw consent from their profile. Automated delivery requires a valid customer phone number and applicable WhatsApp opt-in.

## 📚 API Endpoints

### Admin Endpoints
```
GET  /admin/dashboard          - Admin dashboard
GET  /admin/products            - List products
POST /admin/products/save       - Create product
GET  /admin/products/edit/{id}  - Edit product form
POST /admin/products/update/{id}- Update product
GET  /admin/products/delete/{id}- Delete product
GET  /admin/categories          - List categories
GET  /admin/farmers             - List farmers
GET  /admin/payments            - List payments
GET  /admin/udhari              - List credit entries
```

### Farmer Endpoints
```
GET  /farmer/dashboard          - Farmer dashboard
GET  /farmer/products           - Browse products
GET  /farmer/products/{id}      - Product details
GET  /farmer/payments           - Payment history
GET  /farmer/udhari             - Credit history
GET  /farmer/pay                - UPI payment page
GET  /farmer/profile            - User profile
POST /farmer/profile/update     - Update profile
POST /farmer/profile/password   - Change password
```

## 🚨 Error Handling

- Login validation
- User registration duplicate email check
- Product inventory management
- Payment status tracking
- Credit ledger validation

## 📝 Future Enhancements

- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Email notifications
- [ ] SMS alerts for credit due dates
- [ ] Advanced reporting & analytics
- [ ] Inventory low stock alerts
- [ ] Mobile app (React Native)
- [ ] Payment gateway integration (Razorpay, PayPal)
- [ ] PDF invoice generation
- [ ] Admin approval workflow for credits

## 🐛 Troubleshooting

### Application won't start
```bash
# Clear Maven cache
mvn clean
mvn spring-boot:run
```

### H2 Console access issues
- Ensure CSRF is disabled for H2 console in SecurityConfig
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:krushiseva

### Login issues
- Check that user accounts are initialized
- Verify password encoding is working (BCrypt)
- Clear browser session/cookies

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributors

- Development Team - Krushi Seva Kendra
- Shop Details: Saptashrungi Agro Services, Vaijapur

## 📞 Contact

**Saptashrungi Agro Services**
- Phone: +91 8600813827
- Location: Mirakhnagar, Vaijapur, Chhatrapati Sambhajinagar, Maharashtra - 423703

## 📖 Documentation

For detailed API documentation and usage guides, refer to the inline code comments and Thymeleaf templates.

---

**Version**: 1.0.0  
**Last Updated**: 2024
