# 2. Що конкретно має бути на цьому етапі

Я б **не робив одразу 20 endpoint'ів**.

Для першої версії вам достатньо:

### Backend

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Frontend

```text
/login
/register
/
```

І все.

Після цього вже можна додавати функціональність самої системи.

---

# 3. Як виглядає flow авторизації

Ось це тобі як тимліду треба розуміти найкраще.

Припустимо, користувач відкриває:

```text
http://localhost:3000/login
```

Next.js показує форму:

```text
Email
Password
[ Login ]
```

Користувач вводить:

```text
arsenii@example.com
********
```

Frontend відправляє:

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json
```

з body:

```json
{
  "email": "arsenii@example.com",
  "password": "..."
}
```

Backend отримує це.

---

## 4. Що відбувається на Backend

Умовно:

```text
POST /api/auth/login
        │
        ▼
AuthController
        │
        ▼
AuthService
        │
        ▼
Database
        │
        ▼
User found?
        │
     ┌──┴──┐
     │     │
    NO    YES
     │     │
   401    check password
           │
        ┌──┴──┐
        │     │
       NO    YES
        │     │
      401    create authentication
              │
              ▼
            200
```

Тобто Controller **не повинен сам робити всю логіку**.

Краще приблизно так:

```text
Controllers
     ↓
Services
     ↓
Repositories / EF Core
     ↓
Database
```

Наприклад:

```text
AuthController
    ↓
AuthService
    ↓
UserRepository / DbContext
    ↓
SQL Server
```

---

# 5. Що повертає Backend

Після успішного login backend повинен створити authentication state.

Для типової SPA + ASP.NET Core архітектури я б рекомендував вам **HTTP-only cookie authentication**, якщо вимоги вашого завдання це дозволяють.

Тоді flow буде приблизно:

```text
Next.js
   │
   │ POST /api/auth/login
   ▼
ASP.NET Core
   │
   │ перевіряє user/password
   │
   │ створює auth cookie
   ▼
Browser
   │
   │ cookie зберігається автоматично
   │
   ▼
Наступні API requests
```

Це означає, що тобі не обов'язково вручну зберігати якийсь JWT у `localStorage`.

---

# 6. А для чого тоді `/me`?

Оце дуже корисний endpoint:

```http
GET /api/auth/me
```

Він відповідає на питання:

> "Хто зараз залогінений?"

Наприклад:

```json
{
  "id": 42,
  "email": "arsenii@example.com",
  "name": "Arsenii"
}
```

А якщо користувач не авторизований:

```http
401 Unauthorized
```

Тоді Next.js може зробити:

```text
відкрили /
      ↓
GET /api/auth/me
      ↓
  ┌───┴────┐
  │        │
 200       401
  │        │
  ▼        ▼
Main     /login
Page
```

Це значно краще, ніж просто мати якийсь:

```ts
const isLoggedIn = true;
```

у frontend.

---

# 11. Найважливіше: домовтеся про API contract

Оскільки ти frontend, а напарник backend, **вам не треба одночасно писати код навмання**.

Спочатку ви повинні домовитися:

### `POST /api/auth/login`

Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Success:

```http
200 OK
```

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John"
}
```

Invalid credentials:

```http
401 Unauthorized
```

---

### `POST /api/auth/register`

Request:

```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

Success:

```http
201 Created
```

---

### `GET /api/auth/me`

Success:

```http
200 OK
```

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John"
}
```

Not authenticated:

```http
401 Unauthorized
```

---

### `POST /api/auth/logout`

Success:

```http
204 No Content
```

Ось це вже є **контрактом між frontend і backend**.

Після цього ви можете працювати майже незалежно.

---

# 12. Як розподілити роботу між вами

Я б запропонував так:

### Ти — Frontend

**Phase 1**

```text
Next.js project
      ↓
Routing
      ↓
Main page
      ↓
Login page
      ↓
Register page
      ↓
Forms
      ↓
API client
```

Ти можеш навіть спочатку замокати API.

Наприклад:

```ts
await login(email, password);
```

і тимчасово уявляти, що backend вже існує.

---

### Напарник — Backend

```text
ASP.NET Core Web API
       ↓
Database
       ↓
User entity
       ↓
EF Core
       ↓
Authentication
       ↓
AuthController
       ↓
AuthService
```

---

# 13. Потім ви інтегруєте

Коли обидві частини готові:

```text
                FRONTEND
                   │
             POST /login
                   │
                   ▼
                BACKEND
                   │
             validate user
                   │
                   ▼
                DATABASE
                   │
                   ▼
              authentication
                   │
                   ▼
                FRONTEND
                   │
                   ▼
                Main Page
```

І тут починається реальне тестування інтеграції.

---

# 14. А де тут CORS?

Оскільки у development у вас, скоріш за все:

```text
Next.js       http://localhost:3000
ASP.NET Core  http://localhost:5000
```

це **різні origins**.

Тому браузер може заблокувати request.

Backend повинен дозволити frontend origin через CORS.

Тобто ваш backend повинен приблизно дозволити:

```text
http://localhost:3000
```

А при cookie authentication ще треба правильно налаштувати credentials.

Це одна з перших речей, через яку frontend може сказати:

> "У мене fetch не працює!"

хоча backend насправді працює прекрасно.

---

# 15. Важлива штука: не робіть так

Я б одразу домовився з напарником, що **паролі ніколи не зберігаються у database у відкритому вигляді**.

Не:

```text
User
--------------------
Email
Password = "123456"
```

А password має бути захешований.

Для ASP.NET Core є нормальні стандартні механізми для цього — напарнику краще використовувати їх, а не писати власний алгоритм hashing.

---

# 16. Приблизна структура Backend

Для невеликого навчального/командного проєкту можна почати приблизно так:

```text
Backend/
│
├── Controllers/
│   └── AuthController.cs
│
├── Models/
│   └── User.cs
│
├── DTOs/
│   ├── LoginRequest.cs
│   ├── RegisterRequest.cs
│   └── UserResponse.cs
│
├── Services/
│   └── AuthService.cs
│
├── Data/
│   └── AppDbContext.cs
│
└── Program.cs
```

І не потрібно одразу створювати enterprise-архітектуру на 50 папок.

---

**Спочатку не код. Спочатку contract.**

Ви сідаєте на 15–30 хвилин і визначаєте:

```text
Endpoint
Method
Request
Response
Status codes
Authentication behaviour
```

Наприклад:

```text
POST /api/auth/login

Request:
{
    email: string,
    password: string
}

200:
{
    id: number,
    email: string,
    name: string
}

401:
invalid credentials
```

**Ваше перше milestone я б сформулював так:**

> **Користувач може відкрити Next.js application → зареєструватися → залогінитися → потрапити на main page → оновити сторінку й залишитися авторизованим → натиснути Logout → повернутися на Login.**

Якщо цей flow працює, у вас вже є **нормальний фундамент**, на який можна спокійно накручувати решту функціоналу.
