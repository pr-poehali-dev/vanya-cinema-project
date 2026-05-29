import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const FIXIKI_POSTER = "https://cdn.poehali.dev/projects/4c88fe95-a6ad-422a-8d6e-050f43cf5b03/bucket/1a79c0b5-7764-4aca-93cd-c171cc8d752c.jpg";
const SMESHARIKI_POSTER = "https://cdn.poehali.dev/projects/4c88fe95-a6ad-422a-8d6e-050f43cf5b03/bucket/4e93e5d5-9327-4b73-b0eb-a667638ccd07.jpg";

const CINEMA_ADDRESS = "Тамбов, Мичуринская ул., д. 203, подъезд 3, этаж 5, кв. 100";
const YANDEX_MAPS_URL = "https://yandex.ru/maps/?text=Тамбов%2C+Мичуринская+улица%2C+203";

const films = [
  {
    id: 1,
    title: "Фиксики против Кработов",
    year: 2019,
    genre: "Анимация, музыка",
    country: "Россия",
    duration: "80 мин",
    rating: "0+",
    ratingColor: "#4CAF50",
    poster: FIXIKI_POSTER,
    afishaUrl: "https://afisha.yandex.ru/moscow/film/fiksiki-protiv-krabotov",
    description: "Фиксики – маленькие добрые человечки, которые живут в машинах и приборах и заботятся о технике. В лаборатории профессора Чудакова находится школа фиксиков, о которой знают только мальчик ДимДимыч и его подруга Катя. Но однажды там появляются неуловимые существа — роботы-кработы. Кто они и кто стоит за ними? Новые друзья Мега и Альт придут на помощь, и все попадут в невероятный водоворот приключений!",
    sessions: [
      { date: "sunday", time: "18:00", isToday: false },
    ],
  },
  {
    id: 2,
    title: "Смешарики. Начало",
    year: 2011,
    genre: "Анимация, комедия",
    country: "Россия",
    duration: "86 мин",
    rating: "6+",
    ratingColor: "#FF9800",
    poster: SMESHARIKI_POSTER,
    afishaUrl: "https://afisha.yandex.ru/moscow/film/smeshariki-nachalo",
    description: "Такую экстремальную историю про Смешариков вы не могли себе представить: покинув свою уютную страну, Смешарики оказываются в современном мегаполисе в роли супергероев! Они приняли очень важное решение — спасти мир от нависшей угрозы. Этот «ответственный» шаг приводит к самому захватывающему приключению в их жизни!",
    sessions: [
      { date: "tomorrow", time: "18:00", isToday: false },
    ],
  },
];

function useCurrentTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return now;
}

function isOpen(now: Date): boolean {
  const hours = now.getHours();
  return hours >= 10 && hours < 23;
}

function formatDate(date: Date): string {
  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function getNextSundayDate(): string {
  const today = new Date();
  const day = today.getDay();
  const daysUntilSunday = day === 0 ? 7 : 7 - day;
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + daysUntilSunday);
  const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  return `${sunday.getDate()} ${months[sunday.getMonth()]} (вс)`;
}

function isTodaySunday(): boolean {
  return new Date().getDay() === 0;
}

function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  return `${tomorrow.getDate()} ${months[tomorrow.getMonth()]} (${days[tomorrow.getDay()]})`;
}

function getTodayDate(): string {
  const today = new Date();
  const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  return `${today.getDate()} ${months[today.getMonth()]} (${days[today.getDay()]})`;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openBuyTicket(afishaUrl: string) {
  window.open(afishaUrl, "_blank");
}

export default function Index() {
  const now = useCurrentTime();
  const open = isOpen(now);

  return (
    <div className="min-h-screen font-nunito" style={{ background: "var(--bg-main)" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 shadow-lg" style={{ background: "var(--header-bg)" }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎬</span>
            <div>
              <div className="font-oswald text-xl font-bold text-white leading-none tracking-wide">
                Кинотеатр Вани
              </div>
              <div className="text-xs font-semibold" style={{ color: "var(--accent-yellow)" }}>
                для всей семьи
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
            style={{
              background: open ? "rgba(76,175,80,0.2)" : "rgba(244,67,54,0.2)",
              color: open ? "#4CAF50" : "#F44336",
              border: `2px solid ${open ? "#4CAF50" : "#F44336"}`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: open ? "#4CAF50" : "#F44336",
                boxShadow: open ? "0 0 6px #4CAF50" : "0 0 6px #F44336",
                animation: "pulse-dot 1.5s infinite",
              }}
            />
            {open ? "Открыто" : "Закрыто"}
          </div>

          <nav className="flex gap-2">
            <button
              onClick={() => scrollTo("schedule")}
              className="px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "var(--accent-pink)", color: "#fff" }}
            >
              Расписание
            </button>
            <button
              onClick={() => scrollTo("films")}
              className="px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "var(--accent-blue)", color: "#fff" }}
            >
              Фильмы
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden py-12 px-4"
        style={{ background: "linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 100%)" }}
      >
        {/* decorative circles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20" style={{ background: "var(--accent-yellow)" }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15" style={{ background: "var(--accent-pink)" }} />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10" style={{ background: "var(--accent-blue)" }} />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Live clock */}
          <div
            className="inline-flex flex-col items-center mb-6 px-6 py-3 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <div className="font-oswald text-4xl font-bold text-white tracking-widest tabular-nums">
              {formatTime(now)}
            </div>
            <div className="text-sm font-semibold mt-1" style={{ color: "var(--accent-yellow)" }}>
              {formatDate(now)}
            </div>
          </div>

          {/* Open/closed banner */}
          <div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-2xl text-lg font-bold"
            style={{
              background: open
                ? "linear-gradient(90deg, #4CAF50, #66BB6A)"
                : "linear-gradient(90deg, #F44336, #EF5350)",
              color: "#fff",
              boxShadow: open ? "0 4px 20px rgba(76,175,80,0.5)" : "0 4px 20px rgba(244,67,54,0.5)",
            }}
          >
            <Icon name={open ? "DoorOpen" : "DoorClosed"} size={24} />
            {open
              ? "Кинотеатр Вани уже открыт сегодня для вас!"
              : "Кинотеатр закрыт. Ждём вас завтра с 10:00!"}
          </div>

          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Смотрите любимые фильмы<br />
            <span style={{ color: "var(--accent-yellow)" }}>в нашем кинотеатре!</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Лучшие мультфильмы для детей и всей семьи. Уютный зал, яркий экран, незабываемые впечатления!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo("schedule")}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: "var(--accent-yellow)", color: "#1a1a2e" }}
            >
              <Icon name="Calendar" size={22} />
              Расписание сеансов
            </button>
            <button
              onClick={() => window.open(YANDEX_MAPS_URL, "_blank")}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)" }}
            >
              <Icon name="MapPin" size={22} />
              Открыть на карте
            </button>
          </div>

          {/* Work hours */}
          <div className="mt-8 flex justify-center gap-6 text-white/70 text-sm font-semibold">
            <div className="flex items-center gap-1.5">
              <Icon name="Clock" size={16} />
              Режим работы: 10:00 — 23:00
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="Star" size={16} />
              пн — вс
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-oswald text-3xl font-bold text-center mb-8" style={{ color: "var(--text-heading)" }}>
            🎟 Расписание сеансов
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {films.map((film) => (
              <div
                key={film.id}
                className="rounded-3xl overflow-hidden shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                style={{ background: "var(--card-bg)", border: "2px solid var(--card-border)" }}
                onClick={() => openBuyTicket(film.afishaUrl)}
              >
                <div className="flex gap-4 p-5">
                  <img
                    src={film.poster}
                    alt={film.title}
                    className="w-24 h-36 object-cover rounded-2xl shadow-md flex-shrink-0"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-oswald text-lg font-bold leading-tight" style={{ color: "var(--text-heading)" }}>
                          {film.title}
                        </h3>
                        <span
                          className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-lg"
                          style={{ background: film.ratingColor, color: "#fff" }}
                        >
                          {film.rating}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                        {film.genre} · {film.duration}
                      </p>
                    </div>

                    {film.sessions.map((session, i) => {
                      const [h, m] = session.time.split(":").map(Number);
                      const isSunday = session.date === "sunday";
                      const isTomorrow = session.date === "tomorrow";
                      const isToday = session.date === "today";
                      const sessionPassed = isToday && (now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m));
                      const sundayPassed = isSunday && isTodaySunday() && (now.getHours() > h || (now.getHours() === h && now.getMinutes() >= m));

                      let dateLabel = "";
                      if (sessionPassed) dateLabel = `Следующий сеанс завтра, ${getTomorrowDate()}`;
                      else if (sundayPassed) dateLabel = `Следующий сеанс в воскресенье, ${getNextSundayDate()}`;
                      else if (isToday) dateLabel = `Сегодня, ${getTodayDate()}`;
                      else if (isTomorrow) dateLabel = `Завтра, ${getTomorrowDate()}`;
                      else if (isSunday) dateLabel = isTodaySunday() ? `Сегодня (вс), ${getTodayDate()}` : `В воскресенье, ${getNextSundayDate()}`;

                      const isPast = sessionPassed || sundayPassed;

                      return (
                        <div key={i} className="mb-2">
                          <div className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
                            {dateLabel}
                          </div>
                          {isPast ? (
                            <div
                              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm w-full justify-center"
                              style={{ background: "var(--section-alt-bg)", color: "var(--text-muted)", border: "2px dashed var(--card-border)" }}
                            >
                              <Icon name="Clock" size={16} />
                              Следующий сеанс в {session.time}
                            </div>
                          ) : (
                            <button
                              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 w-full justify-center"
                              style={{
                                background: isToday || (isSunday && isTodaySunday()) ? "var(--accent-pink)" : "var(--accent-blue)",
                                color: "#fff",
                                boxShadow: isToday || (isSunday && isTodaySunday()) ? "0 4px 14px rgba(233,30,99,0.4)" : "0 4px 14px rgba(33,150,243,0.4)",
                              }}
                              onClick={(e) => { e.stopPropagation(); openBuyTicket(film.afishaUrl); }}
                            >
                              <Icon name="Ticket" size={16} />
                              {session.time} — Купить билет
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILMS CATALOG */}
      <section id="films" className="py-12 px-4" style={{ background: "var(--section-alt-bg)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="font-oswald text-3xl font-bold text-center mb-8" style={{ color: "var(--text-heading)" }}>
            🎥 Каталог фильмов
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {films.map((film) => (
              <div
                key={film.id}
                className="rounded-3xl overflow-hidden shadow-xl transition-all hover:scale-[1.01] cursor-pointer"
                style={{ background: "var(--card-bg)", border: "2px solid var(--card-border)" }}
                onClick={() => openBuyTicket(film.afishaUrl)}
              >
                <div className="relative">
                  <img
                    src={film.poster}
                    alt={film.title}
                    className="w-full h-72 object-cover object-top"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 40%, transparent 100%)" }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-oswald text-2xl font-bold text-white drop-shadow-lg">
                      {film.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-white/80 text-sm">{film.year}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/80 text-sm">{film.genre}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/80 text-sm">{film.country}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/80 text-sm">{film.duration}</span>
                    </div>
                  </div>
                  <span
                    className="absolute top-4 right-4 text-sm font-bold px-3 py-1 rounded-xl shadow-lg"
                    style={{ background: film.ratingColor, color: "#fff" }}
                  >
                    {film.rating}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-body)" }}>
                    {film.description}
                  </p>
                  <button
                    className="w-full py-3 rounded-2xl font-bold text-base transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(90deg, var(--accent-pink), var(--accent-purple))",
                      color: "#fff",
                      boxShadow: "0 4px 18px rgba(233,30,99,0.35)",
                    }}
                    onClick={(e) => { e.stopPropagation(); openBuyTicket(film.afishaUrl); }}
                  >
                    🎟 Купить билет
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-oswald text-3xl font-bold mb-6" style={{ color: "var(--text-heading)" }}>
            🏠 О кинотеатре
          </h2>
          <div
            className="rounded-3xl p-8 shadow-lg"
            style={{ background: "var(--card-bg)", border: "2px solid var(--card-border)" }}
          >
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-body)" }}>
              <strong style={{ color: "var(--text-heading)" }}>Кинотеатр Вани</strong> — уютное место для семейного отдыха!
              Мы показываем лучшие детские мультфильмы и семейные фильмы. Приходите всей семьёй и погружайтесь в мир сказки и приключений!
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: "Clock", label: "10:00 — 23:00", sub: "пн — вс" },
                { icon: "Star", label: "Семейный", sub: "кинотеатр" },
                { icon: "Heart", label: "Уютный зал", sub: "для детей" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2"
                    style={{ background: "linear-gradient(135deg, var(--accent-pink), var(--accent-purple))" }}
                  >
                    <Icon name={item.icon} size={22} className="text-white" />
                  </div>
                  <div className="font-bold text-sm" style={{ color: "var(--text-heading)" }}>{item.label}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{item.sub}</div>
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-center gap-2 mb-5 px-4 py-3 rounded-2xl text-sm font-semibold"
              style={{ background: "var(--section-alt-bg)", color: "var(--text-body)" }}
            >
              <Icon name="MapPin" size={16} style={{ color: "var(--accent-pink)", flexShrink: 0 }} />
              {CINEMA_ADDRESS}
            </div>

            <button
              onClick={() => window.open(YANDEX_MAPS_URL, "_blank")}
              className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl font-bold text-base transition-all hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #FC4C2F, #FF6B35)",
                color: "#fff",
                boxShadow: "0 4px 18px rgba(252,76,47,0.4)",
              }}
            >
              <Icon name="MapPin" size={20} />
              Открыть на карте
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 px-4 text-center" style={{ background: "var(--header-bg)" }}>
        <div className="text-white/60 text-sm font-semibold">
          © 2024 Кинотеатр Вани · Работаем пн — вс с 10:00 до 23:00
        </div>
      </footer>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}