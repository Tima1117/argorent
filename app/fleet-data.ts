export type Lang = "en" | "ru" | "ka";
export type Text = Record<Lang, string>;
const t = (en: string, ru: string, ka: string): Text => ({ en, ru, ka });

export type CarClass = "suv" | "sedan" | "sport";
export type Car = {
  id: string;
  name: string;
  cls: CarClass;
  photo: string;
  drive: Text;
  gearbox: Text;
  seats: number;
  fuel: Text;
  price: number;
  tag?: Text;
};

const awd = t("AWD", "Полный привод", "სრული წამყვანი");
const fwd = t("FWD", "Передний привод", "წინა წამყვანი");
const rwd = t("RWD", "Задний привод", "უკანა წამყვანი");
const auto = t("Automatic", "Автомат", "ავტომატი");
const petrol = t("Petrol", "Бензин", "ბენზინი");

export const fleet: Car[] = [
  { id: "forester", name: "Subaru Forester", cls: "suv", photo: "/images/car-forester.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 55, tag: t("Guests' favourite", "Любимец гостей", "სტუმრების რჩეული") },
  { id: "outback", name: "Subaru Outback", cls: "suv", photo: "/images/car-outback.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 60 },
  { id: "legacy", name: "Subaru Legacy", cls: "sedan", photo: "/images/car-legacy.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 45 },
  { id: "xv", name: "Subaru XV", cls: "suv", photo: "/images/car-xv.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 45 },
  { id: "ecosport", name: "Ford EcoSport 4WD", cls: "suv", photo: "/images/car-ecosport.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 40, tag: t("City & mountains", "Город и горы", "ქალაქი და მთები") },
  { id: "cherokee", name: "Jeep Cherokee", cls: "suv", photo: "/images/car-cherokee.webp", drive: awd, gearbox: auto, seats: 5, fuel: petrol, price: 65 },
  { id: "mustang", name: "Ford Mustang Convertible", cls: "sport", photo: "/images/car-mustang.webp", drive: rwd, gearbox: auto, seats: 4, fuel: petrol, price: 120, tag: t("Open top", "Кабриолет", "კაბრიოლეტი") },
];

export const classes: { id: CarClass | "all"; label: Text }[] = [
  { id: "all", label: t("All cars", "Все машины", "ყველა") },
  { id: "suv", label: t("SUV & AWD", "Кроссоверы 4x4", "ჯიპები 4x4") },
  { id: "sedan", label: t("Sedans", "Седаны", "სედანები") },
  { id: "sport", label: t("Sport", "Спорт", "სპორტი") },
];

export const gallery = [
  { src: "/images/g-svaneti.webp", cap: t("Svaneti road trip", "Поездка в Сванетию", "მოგზაურობა სვანეთში"), cls: "wide" },
  { src: "/images/g-mountains.webp", cap: t("Mountain passes", "Горные перевалы", "მთის უღელტეხილები"), cls: "" },
  { src: "/images/g-mustang.webp", cap: t("Mustang in Batumi", "Mustang в Батуми", "Mustang ბათუმში"), cls: "" },
  { src: "/images/g-legacy-sign.webp", cap: t("Mestia", "Местия", "მესტია"), cls: "" },
  { src: "/images/g-forest-road.webp", cap: t("Adjara forest roads", "Лесные дороги Аджарии", "აჭარის ტყის გზები"), cls: "wide" },
  { src: "/images/g-cliff.webp", cap: t("Along the gorge", "Вдоль ущелья", "ხეობის გასწვრივ"), cls: "" },
  { src: "/images/g-forest-2.webp", cap: t("Weekend in the hills", "Выходные в горах", "შაბათ-კვირა მთებში"), cls: "" },
  { src: "/images/g-dash.webp", cap: t("Full tank, clean cabin", "Полный бак, чистый салон", "სავსე ავზი, სუფთა სალონი"), cls: "" },
  { src: "/images/car-xv.webp", cap: t("Snow season", "Снежный сезон", "თოვლის სეზონი"), cls: "wide" },
];
