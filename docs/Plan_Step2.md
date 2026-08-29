# Airbnb Clone — план проєкту до вівторка

## 1. Ціль MVP

До кінця проєкту маємо показати повний сценарій:

**User → додає житло → житло отримує Pending → Admin перевіряє → Approve/Reject → Approved житло з'являється на головній сторінці.**

Також потрібно:

- отримувати дані користувача разом із token після login;
- мати окрему сторінку житла;
- дати користувачу можливість переглядати свої житла та їхній статус.

---

## 2. Backend

### Користувачі та ролі

- Додати `Role` до User: `User` / `Admin`.
- Звичайний користувач після реєстрації отримує роль `User`.
- Створити Admin через backend (для MVP достатньо seed).
- Login має повертати:

```json
{
  "token": "...",
  "user": {
    "id": 1,
    "name": "Arsenii",
    "role": "User"
  }
}
```

### Accommodation

Поля:

- `Id`
- `OwnerId`
- `Title`
- `Description`
- `Price`
- `Location`
- `ImageUrl`
- `Status`
- `CreatedAt`

Статуси:

- `Pending`
- `Approved`
- `Rejected`

### API

```text
POST  /api/accommodations
GET   /api/accommodations
GET   /api/accommodations/{id}
GET   /api/accommodations/my

GET   /api/admin/accommodations/pending
PATCH /api/admin/accommodations/{id}/approve
PATCH /api/admin/accommodations/{id}/reject
```

Важливо:

- `OwnerId` брати з авторизованого користувача, а не з frontend.
- `GET /api/accommodations` повертає тільки `Approved`.
- Admin endpoints доступні тільки користувачам з роллю `Admin`.

---

## 3. Frontend

### Сторінки

```text
/
 /login
 /register
 /accommodations/[id]
 /add-accommodation
 /my-accommodations
 /admin/accommodations
```

### Основний UI flow

**Add accommodation**

- Форма: title, description, location, price, image URL.
- Після відправки житло має статус `Pending`.

**My accommodations**

- Показувати власні житла.
- Показувати статус: Pending / Approved / Rejected.

**Admin panel**

- Список Pending житла.
- Для кожного: перегляд, Approve, Reject.

**Accommodation details**

- Фото
- Назва
- Опис
- Локація
- Ціна

**Header**

- Показувати ім'я залогіненого користувача.
- Для Admin показувати посилання на Admin Panel.

## 4. Integration / Testing

### Перевірити повний User flow

```text
Register/Login
→ Add accommodation
→ Pending
→ My accommodations
→ Admin login
→ Admin Panel
→ Approve
→ Main page
→ Open accommodation
```

### Перевірити Reject flow

```text
User creates accommodation
→ Admin Reject
→ Rejected
→ Не показується на Main Page
→ Користувач бачить Rejected у My accommodations
```

### Перевірити авторизацію

- Неавторизований користувач не може додавати житло.
- User не може викликати Admin endpoints.
- User не може сам призначити собі Admin.
- User не може змінити `OwnerId`.

---

# 5. План на 3 дні

## День 1 — Backend

1. User roles + Admin.
2. Accommodation entity + migration.
3. Accommodation API.
4. Admin API.
5. Login response `token + user`.

## День 2 — Frontend

1. Accommodation details.
2. Add accommodation.
3. My accommodations.
4. Admin Panel.
5. Login/user data integration.
6. Main page → real API.

## День 3 — Integration

1. Повний user flow.
2. Тестування ролей та permissions.
3. Bug fixing.
4. Невеликий UI cleanup.
5. Підготовка demo.

---

# 6. Сценарій демонстрації

1. Увійти як звичайний User.
2. Показати головну сторінку.
3. Відкрити існуюче житло.
4. Додати нове житло.
5. Показати статус `Pending`.
6. Вийти та увійти як Admin.
7. Відкрити Admin Panel.
8. Підтвердити житло.
9. Повернутися до Main Page.
10. Показати нове житло та відкрити його деталі.

## Що не робимо зараз

До демонстрації не витрачаємо час на:

- бронювання;
- оплату;
- reviews;
- favorites;
- chat;
- Google Maps;
- складні filters/search;
- справжній upload фотографій.

Головне — стабільно працюючий flow **User → Pending → Admin → Approved → Main Page**.
