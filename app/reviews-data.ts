import type { Text } from "./fleet-data";

export type Review = { author: string; date: Text; stars: number; text: Text };

const y1: Text = { en: "a year ago", ru: "год назад", ka: "ერთი წლის წინ" };
const y2: Text = { en: "2 years ago", ru: "2 года назад", ka: "2 წლის წინ" };

export const reviews: Review[] = [
  {
    author: "Dzmitry Chasnakou", date: y1, stars: 5,
    text: {
      en: "Great service! Good cars, free water, free delivery and awesome communication! Best pricing and no charge if you inform them for some delay. Also Michail provides useful tips and suggestions for your trip. I used that service for multiple times and going to use more, if I visit Batumi! Mostly recommended! Good luck!",
      ru: "Отличный сервис! Хорошие машины, бесплатная вода, бесплатная доставка и прекрасная коммуникация! Лучшие цены, и никаких доплат, если предупредить о небольшой задержке. Михаил даёт полезные советы по маршруту. Пользовался сервисом несколько раз и буду ещё, когда приеду в Батуми. Очень рекомендую!",
      ka: "შესანიშნავი სერვისი! კარგი მანქანები, უფასო წყალი, უფასო მიწოდება და მშვენიერი კომუნიკაცია! საუკეთესო ფასები და არანაირი დამატებითი გადასახადი მცირე დაგვიანებაზე, თუ წინასწარ შეატყობინებ. მიხეილი სასარგებლო რჩევებსაც გაძლევს მოგზაურობისთვის. რამდენჯერმე ვისარგებლე და კიდევ ვისარგებლებ, როცა ბათუმში ჩამოვალ. ნამდვილად გირჩევთ!",
    },
  },
  {
    author: "Shailesh Gujaran", date: y1, stars: 5,
    text: {
      en: "If you're in Batumi and need a car, this is the place, no need to look anywhere else. Cars are in great condition, free water bottle in the car, great service with a smile. He was also kind enough to accept the car late in the night without any extra charges since we had a morning train. We took a Ford EcoSport, and it couldn't have been more perfect and value for money. Registration & agreement was online.",
      ru: "Если вы в Батуми и нужна машина — это то самое место, искать дальше не нужно. Машины в отличном состоянии, в салоне бесплатная вода, сервис с улыбкой. Приняли машину поздно ночью без доплат, потому что у нас был утренний поезд. Брали Ford EcoSport — идеально и по деньгам, и по впечатлениям. Договор оформили онлайн.",
      ka: "თუ ბათუმში ხართ და მანქანა გჭირდებათ — სხვაგან ძებნა არ ღირს. მანქანები შესანიშნავ მდგომარეობაშია, სალონში უფასო წყალი, სერვისი ღიმილით. მანქანა გვიან ღამითაც დამატებითი გადასახადის გარეშე ჩაიბარეს, რადგან დილის მატარებელი გვქონდა. ავიღეთ Ford EcoSport — იდეალური იყო და ფასადაც ღირდა. ხელშეკრულება ონლაინ გავაფორმეთ.",
    },
  },
  {
    author: "Alex Sagaidakovski", date: y1, stars: 5,
    text: {
      en: "Great experience! The car was delivered to our hotel. Simple process. Michael was very nice, responsive, and flexible. Per day option is available. Thanks!",
      ru: "Отличный опыт! Машину доставили прямо в отель. Всё просто. Михаил очень приятный, отзывчивый и гибкий. Можно брать посуточно. Спасибо!",
      ka: "შესანიშნავი გამოცდილება! მანქანა პირდაპირ სასტუმროში მოგვიყვანეს. მარტივი პროცესი. მიხეილი ძალიან თავაზიანი, მყისიერი და მოქნილია. შეიძლება დღიურადაც აიღო. მადლობა!",
    },
  },
  {
    author: "Alexandr Shkuropat", date: y2, stars: 5,
    text: {
      en: "I rented a Subaru Forester for 4 days. Excellent technical condition of the car. I was also pleased with the outstanding service. I recommend this car rental.",
      ru: "Брал Subaru Forester на 4 дня. Отличное техническое состояние машины. Порадовал и сервис на высшем уровне. Рекомендую этот прокат.",
      ka: "ვიქირავე Subaru Forester 4 დღით. მანქანის შესანიშნავი ტექნიკური მდგომარეობა. სერვისითაც კმაყოფილი დავრჩი. გირჩევთ ამ გაქირავებას.",
    },
  },
  {
    author: "Irina Baskova", date: y1, stars: 5,
    text: {
      en: "I loved the service! The owner is client oriented, very nice and time respectful :)) Cars are well kept and equipped. Thanks for the nice and seamless experience!",
      ru: "Сервис очень понравился! Владелец ориентирован на клиента, очень приятный и пунктуальный :)) Машины ухоженные и укомплектованные. Спасибо за приятный и беспроблемный опыт!",
      ka: "სერვისი ძალიან მომეწონა! მფლობელი კლიენტზეა ორიენტირებული, ძალიან თავაზიანი და პუნქტუალური :)) მანქანები მოვლილი და აღჭურვილია. მადლობა სასიამოვნო და უპრობლემო გამოცდილებისთვის!",
    },
  },
  {
    author: "Anna Silvestruk", date: y1, stars: 5,
    text: {
      en: "Thank you very much Mikhail! Excellent service, the car was in good working order, with a full tank and insurance. We were very pleased.",
      ru: "Большое спасибо Михаилу! Отличный сервис, машина полностью исправна, с полным баком и страховкой. Остались очень довольны.",
      ka: "დიდი მადლობა მიხეილს! შესანიშნავი სერვისი, მანქანა სრულად გამართული, სავსე ავზით და დაზღვევით. ძალიან კმაყოფილები დავრჩით.",
    },
  },
  {
    author: "Ivan Myshlyaev", date: y2, stars: 5,
    text: {
      en: "Rented a car for one day for a trip to Keda and the waterfalls. Got a nice Lexus for a very affordable price. Definitely will rent again.",
      ru: "Брал машину на день для поездки в Кеду и к водопадам. Получил отличный Lexus за очень доступную цену. Обязательно возьму ещё.",
      ka: "ავიღე მანქანა ერთი დღით ქედასა და ჩანჩქერებზე წასასვლელად. მივიღე კარგი Lexus ძალიან ხელმისაწვდომ ფასად. აუცილებლად კიდევ ვიქირავებ.",
    },
  },
  {
    author: "Steffen Issleib", date: y2, stars: 5,
    text: {
      en: "Amazing service, bringing the car, always available, super nice, great car — about the smoothest car rental experience ever.",
      ru: "Потрясающий сервис: привозят машину, всегда на связи, очень приятные люди, отличная машина. Самый гладкий опыт аренды в моей жизни.",
      ka: "საოცარი სერვისი: მანქანას მოგიყვანენ, ყოველთვის ხელმისაწვდომები არიან, ძალიან თავაზიანები, შესანიშნავი მანქანა. ყველაზე მშვიდი გაქირავების გამოცდილება, რაც მქონია.",
    },
  },
  {
    author: "Bilal Ahmed", date: y2, stars: 5,
    text: {
      en: "The car is very smooth to drive, it doesn't slip in snow and rain. I had a wonderful time driving this car in the mountains.",
      ru: "Машина очень плавно едет, не скользит ни в снег, ни в дождь. Прекрасно провёл время, катаясь на ней по горам.",
      ka: "მანქანა ძალიან რბილად მიდის, არ ცურავს არც თოვლში და არც წვიმაში. მშვენიერი დრო გავატარე მთებში ამ მანქანით.",
    },
  },
  {
    author: "Sanjay Sunilkumar", date: y1, stars: 5,
    text: {
      en: "Great cars, humble man, does everything their customer needs. 100% customer satisfaction — one of the best car rentals in Batumi!",
      ru: "Отличные машины, скромный и внимательный человек, делает всё, что нужно клиенту. 100 % удовлетворение. Один из лучших прокатов в Батуми!",
      ka: "შესანიშნავი მანქანები, თავმდაბალი ადამიანი, ყველაფერს აკეთებს კლიენტისთვის. 100%-იანი კმაყოფილება. ერთ-ერთი საუკეთესო გაქირავება ბათუმში!",
    },
  },
  {
    author: "Madhura Banap", date: y1, stars: 5,
    text: {
      en: "Car was amazing and in great condition. And it was easy to register. Responsive and helped us with the details.",
      ru: "Машина великолепная и в отличном состоянии. Оформить было легко. Быстро отвечали и помогли со всеми деталями.",
      ka: "მანქანა შესანიშნავი და კარგ მდგომარეობაში იყო. გაფორმება მარტივი აღმოჩნდა. სწრაფად პასუხობდნენ და ყველა დეტალში დაგვეხმარნენ.",
    },
  },
  {
    author: "Don Omar Escobar", date: y1, stars: 5,
    text: {
      en: "Very clean and good car. Very good service, easy communication. I recommend it to everyone.",
      ru: "Очень чистая и хорошая машина. Отличный сервис, лёгкое общение. Рекомендую всем.",
      ka: "ძალიან სუფთა და კარგი მანქანა. ძალიან კარგი სერვისი, მარტივი კომუნიკაცია. ყველას ვურჩევ.",
    },
  },
];
