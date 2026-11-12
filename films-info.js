// ================= FILM VA SERIAL HAQIDA MA'LUMOTLAR =================
// Har bir filmning alohida sahifasi shu yerdan to'ldiriladi. Kalit — script.js dagi "title" bilan aynan bir xil.
// Yangi film qo'shganda shu yerga ham bitta yozuv qo'shing (bo'lmasa sahifada faqat asosiy ma'lumot chiqadi).
const FILM_INFO = {
  // ---------- Filmlar ----------
  "Dune: Part Two": {
    director: "Denis Vilnyov",
    cast: ["Timoti Shalame", "Zendaya", "Rebekka Ferguson", "Xavyer Bardem", "Ostin Batler"],
    country: "AQSh, Kanada", age: "13+",
    desc: "Pol Atreydes oilasini yo'q qilganlardan o'ch olish uchun Arrakis sahrosidagi fremenlarga qo'shiladi. Sevgisi va butun koinot taqdiri o'rtasida tanlov qilishga to'g'ri kelganda, u o'zi ko'rgan dahshatli kelajakning oldini olishga urinadi.",
  },
  "Oppenheimer": {
    director: "Kristofer Nolan",
    cast: ["Killian Merfi", "Emili Blant", "Mett Deymon", "Robert Dauni Jr.", "Florens Pyu"],
    country: "AQSh, Buyuk Britaniya", age: "18+",
    desc: "Ikkinchi jahon urushi yillarida fizik Robert Oppengeymer birinchi atom bombasini yaratish loyihasiga rahbarlik qiladi. Film olimning g'alabasi, vijdon azobi va keyinchalik unga qarshi boshlangan siyosiy kurash haqida hikoya qiladi.",
  },
  "Interstellar": {
    director: "Kristofer Nolan",
    cast: ["Metyu Makkonahi", "En Xeteuey", "Jessika Cheysten", "Maykl Keyn"],
    country: "AQSh, Buyuk Britaniya", age: "13+",
    desc: "Yer yashash uchun yaroqsiz bo'lib borayotgan kelajakda sobiq uchuvchi Kuper bir guruh olimlar bilan chuvalchang teshigi orqali insoniyat uchun yangi uy izlashga otlanadi. Vaqt uning farzandlariga qarshi ishlay boshlaydi.",
  },
  "Inception": {
    director: "Kristofer Nolan",
    cast: ["Leonardo DiKaprio", "Jozef Gordon-Levitt", "Elliot Peyj", "Tom Xardi", "Marion Kotiyar"],
    country: "AQSh, Buyuk Britaniya", age: "13+",
    desc: "Kobb odamlarning tushiga kirib, sirlarini o'g'irlaydigan mohir mutaxassis. Unga o'tmishini tozalash imkoni taklif etiladi, buning evaziga u imkonsizdek tuyuladigan ishni bajarishi kerak: birovning ongiga yangi g'oya joylashtirish.",
  },
  "The Dark Knight": {
    director: "Kristofer Nolan",
    cast: ["Kristian Beyl", "Xit Ledjer", "Aaron Ekxart", "Maykl Keyn", "Gari Oldman"],
    country: "AQSh, Buyuk Britaniya", age: "13+",
    desc: "Betmen Gotem jinoyatchiligiga qarshi kurashda yutuqlarga erishayotgan bir paytda shaharda Joker paydo bo'ladi. Bu betartiblik ustasi qahramonni o'z tamoyillari va shaharni qutqarish o'rtasida og'ir tanlov qarshisiga qo'yadi.",
  },
  "Joker": {
    director: "Todd Fillips",
    cast: ["Xoakin Feniks", "Robert De Niro", "Zazi Bits", "Frensis Konroy"],
    country: "AQSh", age: "18+",
    desc: "Omadsiz masxaraboz Artur Flek 1980-yillar Gotemida odamlarni kuldirishni orzu qiladi, ammo jamiyat uni e'tiborsiz qoldiradi va xo'rlaydi. Uning asta-sekin aqldan ozib borishi butun shaharni larzaga soladigan voqealarga olib keladi.",
  },
  "It": {
    director: "Andy Muskyetti",
    cast: ["Bill Skarsgord", "Jeyden Martell", "Sofiya Lillis", "Finn Vulfard"],
    country: "AQSh", age: "18+",
    desc: "Derri shaharchasida bolalar birin-ketin g'oyib bo'la boshlaydi. Bir guruh o'smirlar buning ortida odamlarning qo'rquvidan oziqlanadigan va masxaraboz qiyofasiga kiradigan qadimiy mavjudot turganini bilib, unga qarshi chiqishga qaror qiladi.",
  },
  "Blade Runner 2049": {
    director: "Denis Vilnyov",
    cast: ["Rayan Gosling", "Xarrison Ford", "Ana de Armas", "Silviya Xuks", "Jared Leto"],
    country: "AQSh, Kanada", age: "18+",
    desc: "Yangi avlod bleyd-ranneri K jamiyat poydevorini ag'darib yuborishi mumkin bo'lgan uzoq vaqt yashirilgan sirni topadi. Haqiqatni izlash uni o'ttiz yil oldin g'oyib bo'lgan sobiq ranner Rik Dekardning oldiga olib boradi.",
  },
  "Avengers: Endgame": {
    director: "Entoni va Jo Russo",
    cast: ["Robert Dauni Jr.", "Kris Evans", "Mark Ruffalo", "Kris Xemsvort", "Skarlett Yoxansson"],
    country: "AQSh", age: "13+",
    desc: "Tanos koinot aholisining yarmini yo'q qilganidan keyin omon qolgan Qasoskorlar mag'lubiyat bilan yashashga majbur. Yangi imkoniyat paydo bo'lganda, ular yo'qotilganlarni qaytarish uchun so'nggi va eng xavfli rejaga kirishadi.",
  },
  "Parasite": {
    director: "Pon Jun Xo",
    cast: ["Son Gan Xo", "Li Son Gyun", "Cho Yo Jon", "Choy U Shik", "Pak So Dam"],
    country: "Janubiy Koreya", age: "18+",
    desc: "Yerto'lada yashovchi kambag'al Kim oilasi birin-ketin boy Pak xonadoniga ishga kirib oladi. Hammasi ular o'ylagandek ketayotgandek tuyulganda, kutilmagan topilma bu xavfli o'yinni butunlay boshqa yo'nalishga buradi.",
  },
  "A Quiet Place": {
    director: "Jon Krasinski",
    cast: ["Emili Blant", "Jon Krasinski", "Millisent Simmonds", "Noa Jup"],
    country: "AQSh", age: "13+",
    desc: "Eng kichik tovushni ham eshitib ovlaydigan mavjudotlar dunyoni egallab olgan. Bir oila sukunat ichida yashashni o'rgangan, ammo yangi hayot kutilayotgan bir paytda omon qolish tobora qiyinlashadi.",
  },
  "The Matrix": {
    director: "Lana va Lilli Vachovski",
    cast: ["Kianu Rivz", "Lorens Fishbern", "Kerri-Enn Moss", "Xyugo Viving"],
    country: "AQSh, Avstraliya", age: "18+",
    desc: "Dasturchi Neo tanish dunyosi aslida mashinalar yaratgan sun'iy reallik ekanini bilib qoladi. U isyonchilar safiga qo'shiladi va insoniyatni qutqara oladigan tanlangan odam bo'lishi mumkinligini anglaydi.",
  },
  "The Batman": {
    director: "Mett Rivz",
    cast: ["Robert Pattinson", "Zoi Kravits", "Pol Dano", "Jeffri Rayt", "Kolin Farrell"],
    country: "AQSh", age: "13+",
    desc: "Faoliyatining ikkinchi yilida Betmen Gotem amaldorlarini birma-bir o'ldirayotgan Tilsimchini tergov qiladi. Izlar uni shahar korrupsiyasining tubiga va o'z oilasi tarixiga olib boradi.",
  },
  "Spider-Man: Across the Spider-Verse": {
    director: "Xoakim Dos Santos, Kemp Pauers, Jastin K. Tompson",
    cast: ["Shameyk Mur", "Xeyli Steynfeld", "Oskar Ayzek", "Jeyk Jonson"],
    country: "AQSh", age: "6+",
    desc: "Mayls Morales turli olamlar bo'ylab sayohat qilib, ularni himoya qiluvchi O'rgimchak-odamlar jamoasiga duch keladi. Qahramonlik nima ekani haqida fikrlari to'qnashganda, u o'z yaqinlarini qutqarish uchun hammaga qarshi chiqadi.",
  },
  "Avatar: The Way of Water": {
    director: "Jeyms Kemeron",
    cast: ["Sem Uortington", "Zoi Saldanya", "Sigurni Uiver", "Stiven Lang", "Keyt Uinslet"],
    country: "AQSh", age: "13+",
    desc: "Jeyk Salli va Neytiri oilasi eski xavf qaytgach, o'z o'rmonini tark etishga majbur bo'ladi. Ular Pandoraning okean xalqi orasidan boshpana topadi va suv yo'lini o'rganib, yana urushga tortiladi.",
  },

  // ---------- Seriallar ----------
  "Breaking Bad": {
    creators: "Vins Gilligan", years: "2008–2013", rating: 9.5, genres: ["Drama", "Kriminal", "Triller"],
    cast: ["Brayan Krenston", "Aaron Pol", "Anna Gann", "Bob Odenkirk"],
    country: "AQSh", age: "18+",
    desc: "Saraton tashxisi qo'yilgan kimyo o'qituvchisi Uolter Uayt oilasini ta'minlash uchun sobiq shogirdi bilan metamfetamin tayyorlashni boshlaydi. Oddiy odam asta-sekin jinoyat olamining qo'rqinchli siymosiga aylanadi.",
  },
  "Game of Thrones": {
    creators: "Devid Benioff, D. B. Vayss", years: "2011–2019", rating: 9.2, genres: ["Drama", "Fantastika", "Sarguzasht"],
    cast: ["Emiliya Klark", "Kit Xarington", "Piter Dinklidj", "Lina Xedi"],
    country: "AQSh, Buyuk Britaniya", age: "18+",
    desc: "Vesterosning qudratli oilalari Temir taxt uchun shafqatsiz kurash olib boradi. Ular bir-biri bilan urushayotgan paytda shimoldagi Devor ortida butun tiriklarga tahdid soladigan qadimiy xavf uyg'onmoqda.",
  },
  "Stranger Things": {
    creators: "Daffer birodarlar", years: "2016–2025", rating: 8.6, genres: ["Fantastika", "Drama", "Qo'rqinchli"],
    cast: ["Milli Bobbi Braun", "Finn Vulfard", "Vinona Rayder", "Devid Xarbor"],
    country: "AQSh", age: "16+",
    desc: "1980-yillar, Xokins shaharchasi. Bir bola sirli ravishda g'oyib bo'lgach, do'stlari g'ayrioddiy kuchga ega qiz bilan tanishadi va shahar ostida yashirin tajribalar hamda dahshatli boshqa olam borligini bilib qoladi.",
  },
  "The Last of Us": {
    creators: "Kreyg Meyzin, Nil Drakmann", years: "2023–", rating: 8.7, genres: ["Drama", "Fantastika", "Sarguzasht"],
    cast: ["Pedro Paskal", "Bella Remzi"],
    country: "AQSh", age: "18+",
    desc: "Qo'ziqorin infeksiyasi tsivilizatsiyani vayron qilganidan yigirma yil o'tib, qattiqqo'l omon qoluvchi Joel o'smir qiz Ellini xavfli karantin zonasidan olib chiqishni o'z zimmasiga oladi. Bu safar ikkalasining hayotini o'zgartiradi.",
  },
  "Arcane": {
    creators: "Kristian Link, Aleks Yi", years: "2021–2024", rating: 9.0, genres: ["Multfilm", "Fantastika", "Jangari"],
    cast: ["Xeyli Steynfeld", "Ella Parnell", "Kevin Alexandro", "Keti Lyung", "Garri Lloyd"],
    country: "AQSh, Fransiya", age: "16+",
    desc: "Boy Piltover va uning qashshoq yer osti shahri Zaun o'rtasidagi ziddiyat ikki opa-singilni qarama-qarshi tomonlarga ajratadi. Sehrli texnologiyaning kashf etilishi bu kurashni urush yoqasiga olib keladi.",
  },
  "Wednesday": {
    creators: "Alfred Gou, Mayls Millar", years: "2022–", rating: 8.0, genres: ["Komediya", "Detektiv", "Fantastika"],
    cast: ["Jenna Ortega", "Emma Mayers", "Gvendolin Kristi", "Ketrin Zeta-Jons"],
    country: "AQSh", age: "16+",
    desc: "Uensdey Addams g'ayrioddiy o'smirlar uchun yopiq maktab Nevermorga o'qishga keladi. U ruhiy qobiliyatlarini o'zlashtirish bilan birga shaharchadagi qotilliklar va ota-onasi bilan bog'liq eski sirni tergov qiladi.",
  },
  "Dark": {
    creators: "Baran bo Odar, Yantye Frize", years: "2017–2020", rating: 8.7, genres: ["Fantastika", "Drama", "Triller"],
    cast: ["Lui Xofmann", "Liza Vikari", "Oliver Masucci"],
    country: "Germaniya", age: "16+",
    desc: "Nemis shaharchasida ikki bolaning g'oyib bo'lishi to'rt oilaning sirlarini ochib yuboradi. Tergov shu avlodlarni bir necha o'n yillik vaqt oralig'ida bog'lab turgan sayohat va qarindoshlik jumbog'iga olib boradi.",
  },
};
