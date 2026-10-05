"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { fleet, classes, gallery, type Lang, type Text, type CarClass } from "./fleet-data";
import { reviews } from "./reviews-data";
import { ExpandHero } from "./hero-expand";
import { WhySection, type WhyCopy } from "./why-section";

const t = (en: string, ru: string, ka: string): Text => ({ en, ru, ka });

const phone = "+995551080184";
const phonePretty = "+995 551 08 01 84";
const waBase = "https://wa.me/995551080184";
const mapsUrl = "https://www.google.com/maps/search/?api=1&query=ARGO+RENT+Batumi&query_place_id=ChIJFVYmufePZ0ARLVXSxtcViYY";
const reviewsUrl = "https://www.google.com/maps/place/ARGO+RENT/data=!4m7!3m6!1s0x40678ff7b9265615:0x868915d7c6d2552d!8m2!3d41.6403034!4d41.617593!16s%2Fg%2F11txd_xw6l!19sChIJFVYmufePZ0ARLVXSxtcViYY";
const mapEmbed = "https://www.openstreetmap.org/export/embed.html?bbox=41.6126%2C41.6373%2C41.6226%2C41.6433&layer=mapnik&marker=41.6403%2C41.6176";

const copy = {
  en: {
    nav: ["Fleet", "Why us", "Reviews", "Gallery", "Contacts"],
    cta: "WhatsApp",
    eyebrow: "CAR RENTAL · BATUMI · GEORGIA",
    h1: "Your car in Batumi,\ndelivered to your door.",
    sub: "Subaru AWD, Ford and Jeep for the city, the coast and the mountain passes. Full tank, remote paperwork, free delivery to your hotel or the airport.",
    rating: "4.9 · 128 Google reviews",
    choose: "Choose a car",
    write: "Write on WhatsApp",
    hint: "Scroll",
    facts: [["Free delivery", "Hotel, apartment or airport"], ["Full tank", "Clean cabin, water and wipes"], ["Remote paperwork", "Contract in 5 minutes"], ["24/7", "Pick-up and return any time"]],
    fleetEyebrow: "THE FLEET",
    fleetTitle: "Pick your car",
    fleetLede: "All-wheel-drive Subaru for Svaneti and Gudauri, a compact 4WD for the city, a convertible for the boulevard.",
    perDay: "/ day",
    book: "Book",
    details: "Photo",
    fleetNote: "Prices are indicative and depend on season and rental length — the final price is confirmed in chat.",
    why: {
      eyebrow: "WHY ARGO RENT", title: "Rented like from a friend",
      route: { title: "Delivered where you are", text: "Airport at 6 a.m., hotel lobby or your apartment — we bring the car and pick it up where it suits you.", pins: ["Airport", "Hotel", "Mountains"] },
      tank: { title: "Full tank, clean cabin", text: "Every car leaves washed, fuelled, with water and wipes inside." },
      docs: { title: "Paperwork in 5 minutes", items: ["Photo of passport and licence", "Contract signed at handover", "Payment after you inspect the car"] },
      chat: { title: "Always in touch", msgs: ["Can you deliver to the airport at 6 a.m.?", "Sure — the car will wait at arrivals, full tank.", "Perfect, see you!"] },
      stats: [[4.9, "", "Google rating"], [128, "", "reviews"], [97, "%", "five-star reviews"]],
      cta: { title: "Ready to go?", text: "Tell us the dates and where to bring the car — we answer within minutes.", btn: "Write on WhatsApp", href: "https://wa.me/995551080184" },
    } as WhyCopy,
    revEyebrow: "REVIEWS",
    revTitle: "What guests say",
    revLede: "Real reviews from Google Maps.",
    revMore: "Show more",
    revGoogle: "All 128 reviews on Google",
    galEyebrow: "ON THE ROAD",
    galTitle: "Where our cars go",
    galLede: "Svaneti, Mestia, Gudauri, the Adjara passes — photos from our guests' trips.",
    conEyebrow: "CONTACTS",
    conTitle: "Book in two minutes",
    addrLabel: "Office", addr: "17 Pirosmani St, Batumi",
    phoneLabel: "Phone", hoursLabel: "Hours", hours: "Every day, 24/7",
    directions: "Directions",
    call: "Call",
    bookTitle: "Request a car",
    bookText: "Fill in the dates — the request opens in WhatsApp and we confirm availability and the price in the chat.",
    fName: "Your name", fCar: "Car", fFrom: "Pick-up date", fTo: "Return date", fAny: "Any car — advise me",
    send: "Send via WhatsApp",
    bookNote: "No prepayment. The booking is confirmed by our reply in WhatsApp.",
    waMsg: (car: string, from: string, to: string, name: string) => `Hello ARGO RENT! I'd like to rent ${car} from ${from || "…"} to ${to || "…"}. My name is ${name || "…"}.`,
    waCar: (car: string) => `Hello ARGO RENT! I'm interested in ${car}. Is it available?`,
    foot: "A concept redesign for ARGO RENT · Batumi",
    photo: "Photo",
  },
  ru: {
    nav: ["Автопарк", "Почему мы", "Отзывы", "Галерея", "Контакты"],
    cta: "WhatsApp",
    eyebrow: "ПРОКАТ АВТО · БАТУМИ · ГРУЗИЯ",
    h1: "Машина в Батуми —\nс доставкой к двери.",
    sub: "Полноприводные Subaru, Ford и Jeep для города, побережья и горных перевалов. Полный бак, договор на месте, бесплатная доставка в отель или аэропорт.",
    rating: "4.9 · 128 отзывов в Google",
    choose: "Выбрать машину",
    write: "Написать в WhatsApp",
    hint: "Листайте",
    facts: [["Бесплатная доставка", "Отель, квартира или аэропорт"], ["Полный бак", "Чистый салон, вода и салфетки"], ["Договор удалённо", "Оформление за 5 минут"], ["24/7", "Подача и возврат в любое время"]],
    fleetEyebrow: "АВТОПАРК",
    fleetTitle: "Выберите машину",
    fleetLede: "Полный привод Subaru для Сванетии и Гудаури, компактный 4WD для города, кабриолет для бульвара.",
    perDay: "/ сутки",
    book: "Забронировать",
    details: "Фото",
    fleetNote: "Цены ориентировочные и зависят от сезона и срока аренды — итоговую стоимость подтверждаем в чате.",
    why: {
      eyebrow: "ПОЧЕМУ ARGO RENT", title: "Как у друга взять",
      route: { title: "Привезём туда, где вы", text: "Аэропорт в 6 утра, лобби отеля или ваша квартира — подаём машину и забираем там, где удобно вам.", pins: ["Аэропорт", "Отель", "Горы"] },
      tank: { title: "Полный бак, чистый салон", text: "Каждая машина выезжает вымытой и заправленной, с водой и салфетками внутри." },
      docs: { title: "Оформление за 5 минут", items: ["Фото паспорта и прав", "Договор подписываем при передаче", "Оплата после осмотра машины"] },
      chat: { title: "Всегда на связи", msgs: ["Сможете подать в аэропорт в 6 утра?", "Конечно — машина будет ждать на выходе, с полным баком.", "Отлично, до встречи!"] },
      stats: [[4.9, "", "рейтинг Google"], [128, "", "отзывов"], [97, "%", "отзывов на 5 звёзд"]],
      cta: { title: "Едем?", text: "Напишите даты и куда подать машину — отвечаем в течение нескольких минут.", btn: "Написать в WhatsApp", href: "https://wa.me/995551080184" },
    } as WhyCopy,
    revEyebrow: "ОТЗЫВЫ",
    revTitle: "Что говорят гости",
    revLede: "Настоящие отзывы с Google Maps.",
    revMore: "Показать ещё",
    revGoogle: "Все 128 отзывов в Google",
    galEyebrow: "В ДОРОГЕ",
    galTitle: "Куда едут наши машины",
    galLede: "Сванетия, Местия, Гудаури, перевалы Аджарии — фото из поездок наших гостей.",
    conEyebrow: "КОНТАКТЫ",
    conTitle: "Бронь за две минуты",
    addrLabel: "Офис", addr: "ул. Пиросмани 17, Батуми",
    phoneLabel: "Телефон", hoursLabel: "Часы", hours: "Ежедневно, круглосуточно",
    directions: "Маршрут",
    call: "Позвонить",
    bookTitle: "Заявка на машину",
    bookText: "Укажите даты — заявка откроется в WhatsApp, а наличие и цену подтвердим в чате.",
    fName: "Ваше имя", fCar: "Машина", fFrom: "Дата подачи", fTo: "Дата возврата", fAny: "Любая — посоветуйте",
    send: "Отправить в WhatsApp",
    bookNote: "Без предоплаты. Бронь подтверждается нашим ответом в WhatsApp.",
    waMsg: (car: string, from: string, to: string, name: string) => `Здравствуйте, ARGO RENT! Хочу арендовать ${car} с ${from || "…"} по ${to || "…"}. Меня зовут ${name || "…"}.`,
    waCar: (car: string) => `Здравствуйте, ARGO RENT! Интересует ${car}. Свободна ли машина?`,
    foot: "Демо-редизайн для ARGO RENT · Батуми",
    photo: "Фото",
  },
  ka: {
    nav: ["ავტოპარკი", "რატომ ჩვენ", "შეფასებები", "გალერეა", "კონტაქტი"],
    cta: "WhatsApp",
    eyebrow: "ავტოს გაქირავება · ბათუმი · საქართველო",
    h1: "მანქანა ბათუმში —\nმიწოდებით კართან.",
    sub: "სრულწამყვანიანი Subaru, Ford და Jeep ქალაქისთვის, სანაპიროსა და მთის უღელტეხილებისთვის. სავსე ავზი, ხელშეკრულება ადგილზე, უფასო მიწოდება სასტუმროში ან აეროპორტში.",
    rating: "4.9 · 128 შეფასება Google-ზე",
    choose: "მანქანის არჩევა",
    write: "მოწერა WhatsApp-ზე",
    hint: "ჩამოსქროლეთ",
    facts: [["უფასო მიწოდება", "სასტუმრო, ბინა ან აეროპორტი"], ["სავსე ავზი", "სუფთა სალონი, წყალი და ხელსახოცები"], ["ხელშეკრულება ადგილზე", "გაფორმება 5 წუთში"], ["24/7", "მიწოდება და დაბრუნება ნებისმიერ დროს"]],
    fleetEyebrow: "ავტოპარკი",
    fleetTitle: "აირჩიეთ მანქანა",
    fleetLede: "სრული წამყვანი Subaru სვანეთისა და გუდაურისთვის, კომპაქტური 4WD ქალაქისთვის, კაბრიოლეტი ბულვარისთვის.",
    perDay: "/ დღე",
    book: "დაჯავშნა",
    details: "ფოტო",
    fleetNote: "ფასები სავარაუდოა და დამოკიდებულია სეზონსა და ვადაზე — საბოლოო ფასს ჩატში ვადასტურებთ.",
    why: {
      eyebrow: "რატომ ARGO RENT", title: "როგორც მეგობრისგან",
      route: { title: "მოგიტანთ იქ, სადაც ხართ", text: "აეროპორტი დილის 6-ზე, სასტუმროს ლობი ან თქვენი ბინა — მანქანას მოგიყვანთ და წავიყვანთ იქიდან, სადაც გიხერხდებათ.", pins: ["აეროპორტი", "სასტუმრო", "მთები"] },
      tank: { title: "სავსე ავზი, სუფთა სალონი", text: "ყველა მანქანა გადის გარეცხილი და გავსებული, წყლითა და ხელსახოცებით სალონში." },
      docs: { title: "გაფორმება 5 წუთში", items: ["პასპორტისა და მართვის მოწმობის ფოტო", "ხელშეკრულებას ვაფორმებთ გადაცემისას", "გადახდა მანქანის დათვალიერების შემდეგ"] },
      chat: { title: "ყოველთვის კავშირზე", msgs: ["შეძლებთ აეროპორტში დილის 6-ზე მოყვანას?", "რა თქმა უნდა — მანქანა გასასვლელთან დაგხვდებათ, სავსე ავზით.", "შესანიშნავია, შევხვდებით!"] },
      stats: [[4.9, "", "Google რეიტინგი"], [128, "", "შეფასება"], [97, "%", "ხუთვარსკვლავიანი შეფასება"]],
      cta: { title: "წავედით?", text: "მოგვწერეთ თარიღები და სად მოგიყვანოთ მანქანა — რამდენიმე წუთში გპასუხობთ.", btn: "მოწერა WhatsApp-ზე", href: "https://wa.me/995551080184" },
    } as WhyCopy,
    revEyebrow: "შეფასებები",
    revTitle: "რას ამბობენ სტუმრები",
    revLede: "ნამდვილი შეფასებები Google Maps-დან.",
    revMore: "მეტის ჩვენება",
    revGoogle: "ყველა 128 შეფასება Google-ზე",
    galEyebrow: "გზაში",
    galTitle: "სად მიდიან ჩვენი მანქანები",
    galLede: "სვანეთი, მესტია, გუდაური, აჭარის უღელტეხილები — ფოტოები სტუმრების მოგზაურობიდან.",
    conEyebrow: "კონტაქტი",
    conTitle: "დაჯავშნა ორ წუთში",
    addrLabel: "ოფისი", addr: "ფიროსმანის ქ. 17, ბათუმი",
    phoneLabel: "ტელეფონი", hoursLabel: "საათები", hours: "ყოველდღე, 24/7",
    directions: "მარშრუტი",
    call: "დარეკვა",
    bookTitle: "მანქანის მოთხოვნა",
    bookText: "მიუთითეთ თარიღები — მოთხოვნა გაიხსნება WhatsApp-ში, ხელმისაწვდომობასა და ფასს ჩატში დავადასტურებთ.",
    fName: "თქვენი სახელი", fCar: "მანქანა", fFrom: "აღების თარიღი", fTo: "დაბრუნების თარიღი", fAny: "ნებისმიერი — მირჩიეთ",
    send: "გაგზავნა WhatsApp-ით",
    bookNote: "წინასწარი გადახდის გარეშე. ჯავშანი დასტურდება ჩვენი პასუხით WhatsApp-ში.",
    waMsg: (car: string, from: string, to: string, name: string) => `გამარჯობა, ARGO RENT! მინდა ვიქირაო ${car} ${from || "…"}-დან ${to || "…"}-მდე. მე მქვია ${name || "…"}.`,
    waCar: (car: string) => `გამარჯობა, ARGO RENT! მაინტერესებს ${car}. თავისუფალია?`,
    foot: "კონცეპტუალური რედიზაინი ARGO RENT-ისთვის · ბათუმი",
    photo: "ფოტო",
  },
};
type Copy = typeof copy["en"];

const wa = (text: string) => `${waBase}?text=${encodeURIComponent(text)}`;
const lines = (s: string) => s.split("\n").map((l, i) => <span key={i} style={{ display: "block" }}>{i === 1 ? <em>{l}</em> : l}</span>);

const Ico = {
  car: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14M5 17a2 2 0 0 1-2-2v-3l2.3-5.2A2 2 0 0 1 7.1 5.6h9.8a2 2 0 0 1 1.8 1.2L21 12v3a2 2 0 0 1-2 2M5 17v2M19 17v2M7 13h.01M17 13h.01" /></svg>,
  fuel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M4 21h10M6 10h6M14 8l3 2v7a2 2 0 0 0 4 0V9l-3-3" /></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>,
  wa: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>,
};

function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, [reduce]);
  return null;
}

function Fleet({ lang, c, onPhoto }: { lang: Lang; c: Copy; onPhoto: (src: string) => void }) {
  const [cls, setCls] = useState<CarClass | "all">("all");
  const cars = cls === "all" ? fleet : fleet.filter(x => x.cls === cls);
  return (
    <section className="fleet" id="fleet">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{c.fleetEyebrow}</p><h2 className="section-title">{c.fleetTitle}</h2></div>
          <p className="section-lede">{c.fleetLede}</p>
        </div>
        <div className="tabs" role="tablist" style={{ marginBottom: 28 }}>
          {classes.map(k => <button key={k.id} role="tab" aria-selected={cls === k.id} className={`tab${cls === k.id ? " active" : ""}`} onClick={() => setCls(k.id)}>{k.label[lang]}</button>)}
        </div>
        <motion.div key={cls} className="cars" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {cars.map((car, i) => (
            <motion.article key={car.id} className="car" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
              <button className="car-photo" onClick={() => onPhoto(car.photo)} aria-label={`${c.photo}: ${car.name}`}>
                {car.tag && <span className="car-tag">{car.tag[lang]}</span>}
                <Image src={car.photo} alt={car.name} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              </button>
              <div className="car-body">
                <div className="car-top">
                  <h3>{car.name}</h3>
                  <span className="car-price">${car.price}<small>{c.perDay}</small></span>
                </div>
                <div className="specs">
                  <span>{car.drive[lang]}</span><span>{car.gearbox[lang]}</span><span>{car.seats} 👤</span><span>{car.fuel[lang]}</span>
                </div>
                <div className="car-actions">
                  <a className="btn btn-wa" href={wa(c.waCar(car.name))} target="_blank" rel="noopener noreferrer">{Ico.wa}{c.book}</a>
                  <button className="btn btn-outline" onClick={() => onPhoto(car.photo)}>{c.details}</button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        <p className="fleet-note">{c.fleetNote}</p>
      </div>
    </section>
  );
}

function Reviews({ lang, c }: { lang: Lang; c: Copy }) {
  const [n, setN] = useState(6);
  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{c.revEyebrow}</p><h2 className="section-title">{c.revTitle}</h2></div>
          <p className="section-lede">{c.revLede}</p>
        </div>
        <div className="rev-grid">
          {reviews.slice(0, n).map((r, i) => (
            <motion.article key={r.author + i} className="rev" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}>
              <div className="rev-stars">{"★".repeat(r.stars)}</div>
              <p>{r.text[lang]}</p>
              <div className="rev-meta">
                <span className="rev-ava">{r.author.trim().charAt(0).toUpperCase()}</span>
                <div><b>{r.author}</b>{r.date[lang]} · Google</div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="rev-more">
          {n < reviews.length && <button className="btn btn-outline" onClick={() => setN(n + 6)}>{c.revMore}</button>}
          <a className="btn btn-navy" href={reviewsUrl} target="_blank" rel="noopener noreferrer">{c.revGoogle} ↗</a>
        </div>
      </div>
    </section>
  );
}

function Gallery({ lang, c, onPhoto }: { lang: Lang; c: Copy; onPhoto: (src: string) => void }) {
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{c.galEyebrow}</p><h2 className="section-title">{c.galTitle}</h2></div>
          <p className="section-lede">{c.galLede}</p>
        </div>
        <div className="gal-grid">
          {gallery.map((g, i) => (
            <motion.button key={g.src} className={`gal-item ${g.cls}`} onClick={() => onPhoto(g.src)} whileHover={{ scale: 1.01 }} aria-label={`${c.photo} ${i + 1}`}>
              <Image src={g.src} alt={g.cap[lang]} fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectFit: "cover" }} />
              <span className="gal-cap">{g.cap[lang]}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts({ lang, c }: { lang: Lang; c: Copy }) {
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const msg = c.waMsg(car || c.fAny, from, to, name);
  return (
    <section className="contacts" id="contacts">
      <div className="container">
        <div className="contacts-grid">
          <div>
            <p className="eyebrow light">{c.conEyebrow}</p>
            <h2 className="section-title light" style={{ marginBottom: 28 }}>{c.conTitle}</h2>
            <div className="contact-list">
              <div className="contact-row"><span className="strip-ico">{Ico.pin}</span><div><b>{c.addrLabel}</b><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.addr}</a></div></div>
              <div className="contact-row"><span className="strip-ico">{Ico.phone}</span><div><b>{c.phoneLabel}</b><a href={`tel:${phone}`}>{phonePretty}</a></div></div>
              <div className="contact-row"><span className="strip-ico">{Ico.clock}</span><div><b>{c.hoursLabel}</b><span>{c.hours}</span></div></div>
            </div>
            <div className="contact-actions">
              <a className="btn btn-wa" href={waBase} target="_blank" rel="noopener noreferrer">{Ico.wa}WhatsApp</a>
              <a className="btn btn-ghost" href={`tel:${phone}`}>{c.call}</a>
              <a className="btn btn-ghost" href={mapsUrl} target="_blank" rel="noopener noreferrer">{c.directions} ↗</a>
            </div>
          </div>
          <form className="book" onSubmit={e => { e.preventDefault(); window.open(wa(msg), "_blank", "noopener"); }}>
            <h3>{c.bookTitle}</h3>
            <p>{c.bookText}</p>
            <div className="book-grid">
              <div className="field full"><label htmlFor="f-name">{c.fName}</label><input id="f-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></div>
              <div className="field full"><label htmlFor="f-car">{c.fCar}</label>
                <select id="f-car" value={car} onChange={e => setCar(e.target.value)}>
                  <option value="">{c.fAny}</option>
                  {fleet.map(x => <option key={x.id} value={x.name}>{x.name} — ${x.price}{c.perDay}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="f-from">{c.fFrom}</label><input id="f-from" type="date" value={from} onChange={e => setFrom(e.target.value)} /></div>
              <div className="field"><label htmlFor="f-to">{c.fTo}</label><input id="f-to" type="date" value={to} onChange={e => setTo(e.target.value)} min={from || undefined} /></div>
            </div>
            <button className="btn btn-wa" type="submit">{Ico.wa}{c.send}</button>
            <p className="book-note">{c.bookNote}</p>
          </form>
        </div>
      </div>
      <div className="map-wrap" data-lenis-prevent>
        <iframe src={mapEmbed} title="ARGO RENT on the map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const c = copy[lang];
  const navIds = useMemo(() => ["fleet", "why", "reviews", "gallery", "contacts"], []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const facts = c.facts;
  const factPhotos = ["/images/g-cherokee.webp", "/images/g-dash.webp", "/images/g-handover.webp", "/images/g-night.webp"];

  return (
    <>
      <SmoothScroll />
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top"><i aria-hidden />ARGO<em>RENT</em></a>
          <nav className={`nav${open ? " open" : ""}`}>
            {c.nav.map((label, i) => <a key={navIds[i]} href={`#${navIds[i]}`} onClick={() => setOpen(false)}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <div className="languages">
              {(["en", "ru", "ka"] as Lang[]).map(l => <button key={l} className={lang === l ? "active" : ""} onClick={() => { setLang(l); setOpen(false); }} aria-pressed={lang === l}>{l === "ka" ? "GE" : l.toUpperCase()}</button>)}
            </div>
            <a className="header-cta" href={waBase} target="_blank" rel="noopener noreferrer">{Ico.wa}<span>{c.cta}</span></a>
            <button className="mobile-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
          </div>
        </div>
      </header>

      <main id="top">
        <ExpandHero
          words={["ARGO", "RENT"]}
          eyebrow={c.eyebrow}
          headline={lines(c.h1)}
          sub={c.sub}
          rating={c.rating}
          primary={{ label: c.choose, href: "#fleet" }}
          secondary={{ label: c.write, href: waBase }}
          hint={c.hint}
        />

        <div className="strip">
          <div className="container strip-grid">
            {facts.map(([b, sub], i) => (
              <motion.div key={b} className="fact" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Image src={factPhotos[i]} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                <div className="fact-shade" />
                <div className="fact-text"><b>{b}</b><span>{sub}</span></div>
              </motion.div>
            ))}
          </div>
        </div>

        <Fleet lang={lang} c={c} onPhoto={setLightbox} />

        <WhySection c={c.why} />

        <Reviews lang={lang} c={c} />
        <Gallery lang={lang} c={c} onPhoto={setLightbox} />
        <Contacts lang={lang} c={c} />
      </main>

      <footer>
        <div className="container footer-inner">
          <a className="brand" href="#top"><i aria-hidden />ARGO<em>RENT</em></a>
          <span>{c.foot}</span>
          <a href={reviewsUrl} target="_blank" rel="noopener noreferrer">Google Maps ↗</a>
        </div>
      </footer>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setLightbox(null)}>
            <motion.div className="lightbox-img" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} transition={{ duration: 0.2 }} onClick={e => e.stopPropagation()}>
              <Image src={lightbox} alt="" fill style={{ objectFit: "contain" }} sizes="100vw" />
              <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
