# 👤 Kullanıcı Yönetim Uygulaması (Angular 19.2)

Bu proje, Angular 19.2 kullanılarak ASIS Elektronik mülakatı için geliştirilmiş **kullanıcı listeleme ve detay görüntüleme** uygulamasıdır.  
Uygulama, `https://jsonplaceholder.typicode.com/users` API’sinden veri çekerek kullanıcıları listeler, arama yapar ve detay sayfasında bilgileri gösterir.
Bu proje yalnızca demo ve değerlendirme amaçlıdır.

---

## 🚀 Özellikler

✅ Kullanıcı listesi (API üzerinden dinamik olarak çekilir)  
✅ İsim bazlı **arama ve filtreleme**  
✅ Kullanıcı detay sayfası (`/users/:id`)  
✅ Loading ve hata durumları  
✅ Responsive tasarım
✅ Reusable component yapısı (CardList, CardOne, Loader, Header, Footer)  
✅ Modern UI (ASIS renk paleti + Font Awesome ikonlar)

---

## 🧩 Kullanılan Teknolojiler

- **Angular 19.2**
- **TypeScript**
- **RxJS (Reactive Programming)**
- **SCSS (Responsive UI)**
- **Font Awesome (ikonlar için)**
- **HTML5 + CSS3 (modern web standartları)**

---

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları izleyin:

### 1️⃣ Repoyu klonlayın
```bash
git clone https://github.com/dcebeci/Study.git

### 2️⃣ Proje dizinine gidin
cd Study

### 3️⃣ Bağımlılıkları yükleyin
npm install

### 4️⃣ Geliştirme sunucusunu başlatın
ng serve