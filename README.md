# Campus Market – Kurulum Rehberi 

Bu doküman, **hiçbir şey kurulu değilmiş** varsayımıyla hazırlanmıştır. Adımları sırayla takip etmeniz yeterlidir.

---

## Proje Repoları

- **Frontend (React):** [Campus Market Frontend](https://github.com/YusufZiyaKural/campusMarketFrontend)
- **Backend (Java / Spring Boot):** [Campus Market Backend](https://github.com/YusufZiyaKural/CampusMarketBackend)

---

## Gereksinimler

* Java JDK (tercihen Java 17 veya proje hangi sürümü istiyorsa)
* PostgreSQL
* Node.js (npm ile birlikte)
* Git

---

## 1. Java JDK Kurulumu

Bilgisayarınızda Java yoksa:

* Uygun Java JDK sürümünü indirip kurun
* Kurulumdan sonra terminalde aşağıdaki komutla kontrol edin:

```bash
java -version
```

---

## 2. PostgreSQL Kurulumu

* PostgreSQL’i indirip kurun
* Kurulum sırasında:

  * **Kullanıcı adı:** `postgres` (değiştirmemeniz önerilir)
  * **Şifre:** Belirlediğiniz şifreyi mutlaka not alın

---

## 3. Projeyi İndirme

GitHub üzerinden projeyi bilgisayarınıza klonlayın:

```bash
git clone <repo_link>
```

---

## 4. Backend Ayarları

Backend klasöründe şu dosyayı açın:

```
backend/src/main/resources/application.properties
```

Aşağıdaki alanları, PostgreSQL kurulumunda kullandığınız bilgilere göre düzenleyin:

```properties
spring.datasource.username=postgres
spring.datasource.password=ŞİFRENİZ
```

---

## 5. Veritabanı Oluşturma

1. **pgAdmin**’i açın
2. Databases üzerine sağ tıklayın → **Create → Database**
3. Veritabanı adını **kesinlikle** şu şekilde girin:

```
campusmarket_db
```

> Şifre sorulursa PostgreSQL kurulumunda belirlediğiniz şifreyi girin.

---

## 6. Backend Çalıştırma

* Backend projesini IDE üzerinden veya terminalden çalıştırın
* Uygulama hata vermeden ayağa kalkıyorsa backend hazırdır

---

## 7. Frontend Kurulumu ve Çalıştırma

Frontend klasörüne girin:

```bash
cd frontend
```

Bağımlılıkları yükleyin:

```bash
npm install
```

Projeyi başlatın:

```bash
npm run dev
```

Terminalde verilen adresi tarayıcıda açın.

---

## 🎉 Sonuç

Backend ve frontend başarıyla çalışıyorsa **Campus Market** artık kullanıma hazır.

Bir sorun yaşarsanız logları kontrol etmeyi unutmayın.
