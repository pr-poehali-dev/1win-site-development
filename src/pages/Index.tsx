import { useState } from "react";
import Icon from "@/components/ui/icon";

type View = "home" | "dashboard";

interface User {
  name: string;
  email: string;
  balance: number;
  level: string;
}

const MOCK_USER: User = {
  name: "Александр",
  email: "alex@example.com",
  balance: 24850,
  level: "Профессионал",
};

export default function Index() {
  const [view, setView] = useState<View>("home");
  const [modal, setModal] = useState<"none" | "login" | "register">("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [activeService, setActiveService] = useState<number | null>(null);

  const handleLogin = () => {
    setUser(MOCK_USER);
    setIsLoggedIn(true);
    setModal("none");
    setView("dashboard");
  };

  const handleRegister = () => {
    setUser({ ...MOCK_USER, name: form.name || "Пользователь", email: form.email || MOCK_USER.email });
    setIsLoggedIn(true);
    setModal("none");
    setView("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setView("home");
  };

  const services = [
    {
      icon: "TrendingUp",
      title: "Инвестиции",
      description: "Вложите средства в проверенные инструменты с доходностью от 15% годовых",
      badge: "Популярно",
      badgeColor: "bg-amber-500",
      return: "15–40%",
      risk: "Низкий",
    },
    {
      icon: "BarChart2",
      title: "Трейдинг",
      description: "Торговля на финансовых рынках с поддержкой опытных аналитиков",
      badge: "Топ",
      badgeColor: "bg-cyan-500",
      return: "20–80%",
      risk: "Средний",
    },
    {
      icon: "Briefcase",
      title: "Фриланс-биржа",
      description: "Продавайте свои навыки и выполняйте заказы от клиентов по всему миру",
      badge: null,
      badgeColor: "",
      return: "По договору",
      risk: "Нет риска",
    },
    {
      icon: "Users",
      title: "Реферальная программа",
      description: "Приглашайте друзей и получайте 10% с каждой их операции навсегда",
      badge: "Выгодно",
      badgeColor: "bg-green-500",
      return: "10% навсегда",
      risk: "Нет риска",
    },
    {
      icon: "BookOpen",
      title: "Обучение",
      description: "Курсы по финансовой грамотности и методам пассивного дохода",
      badge: "Новинка",
      badgeColor: "bg-purple-500",
      return: "Знания",
      risk: "Нет риска",
    },
    {
      icon: "Cpu",
      title: "Авто-торговля",
      description: "ИИ-боты торгуют за вас круглосуточно без вашего участия",
      badge: "ИИ",
      badgeColor: "bg-blue-500",
      return: "10–35%",
      risk: "Средний",
    },
  ];

  const stats = [
    { value: "124 000+", label: "Участников" },
    { value: "₽2.8 млрд", label: "Выплачено" },
    { value: "4.9★", label: "Рейтинг" },
    { value: "6 лет", label: "На рынке" },
  ];

  const reviews = [
    { name: "Мария К.", text: "Вывела первые 50 000₽ уже через месяц. Очень довольна!", stars: 5 },
    { name: "Дмитрий П.", text: "Прошёл курс по трейдингу — теперь зарабатываю стабильно.", stars: 5 },
    { name: "Ольга С.", text: "Реферальная программа — просто находка! Уже 12 человек в команде.", stars: 5 },
  ];

  if (view === "dashboard" && isLoggedIn && user) {
    return <Dashboard user={user} onLogout={handleLogout} services={services} />;
  }

  return (
    <div className="min-h-screen grid-lines relative overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(7,7,16,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,184,0,0.08)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)" }}>
            <span className="text-black font-bold text-sm" style={{ fontFamily: "Oswald" }}>EP</span>
          </div>
          <span className="text-xl font-bold text-gradient-gold" style={{ fontFamily: "Oswald" }}>EarnPro</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Услуги", "Статистика", "Отзывы"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-amber-400"
              style={{ color: "rgba(255,232,160,0.6)", fontFamily: "Golos Text" }}>
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button onClick={() => setView("dashboard")}
              className="btn-neon-gold px-5 py-2 rounded-lg text-sm">
              Кабинет
            </button>
          ) : (
            <>
              <button onClick={() => setModal("login")}
                className="btn-outline-gold px-4 py-2 rounded-lg text-sm">
                Войти
              </button>
              <button onClick={() => setModal("register")}
                className="btn-neon-gold px-5 py-2 rounded-lg text-sm">
                Начать
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/df9d7d36-9010-4a1f-9a4d-7faa6f803631/files/cf3a23ab-46b5-4d14-9832-4c4ccc534410.jpg"
            alt="hero"
            className="w-full h-full object-cover opacity-15"
            style={{ filter: "blur(2px)" }}
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, #070710 70%)" }} />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in"
            style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium" style={{ color: "#FFB800", fontFamily: "Golos Text" }}>
              Сейчас онлайн: 4 127 участников
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in delay-100" style={{ fontFamily: "Oswald", lineHeight: 1.05 }}>
            <span className="text-gradient-gold">ЗАРАБАТЫВАЙ</span>
            <br />
            <span style={{ color: "rgba(255,232,160,0.9)" }}>УМНЕЕ, А НЕ</span>
            <br />
            <span className="text-gradient-blue">БОЛЬШЕ</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 animate-fade-in delay-200 max-w-2xl mx-auto"
            style={{ color: "rgba(255,232,160,0.55)", fontFamily: "Golos Text", lineHeight: 1.7 }}>
            Профессиональная платформа для онлайн-заработка: инвестиции, трейдинг, фриланс и пассивный доход в одном месте
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center animate-fade-in delay-300">
            <button onClick={() => setModal("register")}
              className="btn-neon-gold px-8 py-4 rounded-xl text-lg w-full sm:w-auto">
              Начать зарабатывать
            </button>
            <button onClick={() => setModal("login")}
              className="btn-outline-gold px-8 py-4 rounded-xl text-lg w-full sm:w-auto">
              Войти в кабинет
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-3xl mx-auto animate-fade-in delay-400">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl card-glow">
              <div className="stat-counter text-2xl md:text-3xl text-gradient-gold mb-1">{s.value}</div>
              <div className="text-xs" style={{ color: "rgba(255,232,160,0.45)", fontFamily: "Golos Text" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="услуги" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#FFB800", fontFamily: "Oswald" }}>
              ЧТО МЫ ПРЕДЛАГАЕМ
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4" style={{ fontFamily: "Oswald" }}>
              НАШИ УСЛУГИ
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,232,160,0.5)", fontFamily: "Golos Text" }}>
              Выберите подходящий инструмент или комбинируйте несколько для максимального дохода
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i}
                className="card-glow rounded-2xl p-6 cursor-pointer relative overflow-hidden"
                onClick={() => setActiveService(activeService === i ? null : i)}>
                {s.badge && (
                  <span className={`absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full text-white ${s.badgeColor}`}
                    style={{ fontFamily: "Oswald", fontSize: "10px", letterSpacing: "0.05em" }}>
                    {s.badge}
                  </span>
                )}
                <div className="service-icon-bg w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={s.icon} fallback="Star" size={22} className="text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gradient-gold" style={{ fontFamily: "Oswald" }}>
                  {s.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,232,160,0.55)", fontFamily: "Golos Text", lineHeight: 1.6 }}>
                  {s.description}
                </p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,184,0,0.1)" }}>
                  <div>
                    <span className="text-xs" style={{ color: "rgba(255,232,160,0.35)", fontFamily: "Golos Text" }}>Доходность</span>
                    <div className="text-sm font-semibold text-amber-400" style={{ fontFamily: "Oswald" }}>{s.return}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs" style={{ color: "rgba(255,232,160,0.35)", fontFamily: "Golos Text" }}>Риск</span>
                    <div className="text-sm font-semibold text-cyan-400" style={{ fontFamily: "Oswald" }}>{s.risk}</div>
                  </div>
                </div>
                {activeService === i && (
                  <div className="mt-4 animate-fade-in">
                    <button onClick={(e) => { e.stopPropagation(); setModal("register"); }}
                      className="btn-neon-gold w-full py-3 rounded-xl text-sm">
                      Подключить услугу
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section id="статистика" className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/df9d7d36-9010-4a1f-9a4d-7faa6f803631/files/1823c48e-32de-4969-a3ea-312ed1b69d58.jpg"
            alt="dashboard"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #070710 0%, transparent 30%, transparent 70%, #070710 100%)" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#00C8FF", fontFamily: "Oswald" }}>
            ВАШИ РЕЗУЛЬТАТЫ
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Oswald", color: "rgba(255,232,160,0.95)" }}>
            СЛЕДИТЕ ЗА ДОХОДОМ<br />
            <span className="text-gradient-gold">В РЕАЛЬНОМ ВРЕМЕНИ</span>
          </h2>
          <p className="text-base mb-10" style={{ color: "rgba(255,232,160,0.5)", fontFamily: "Golos Text" }}>
            Личный кабинет с аналитикой, историей транзакций, реферальной статистикой и инструментами управления активами
          </p>
          <button onClick={() => setModal("register")}
            className="btn-neon-gold px-10 py-4 rounded-xl text-lg animate-glow-pulse">
            Открыть кабинет бесплатно
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="отзывы" className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: "#FFB800", fontFamily: "Oswald" }}>
              ОТЗЫВЫ
            </p>
            <h2 className="text-4xl font-bold text-gradient-gold" style={{ fontFamily: "Oswald" }}>
              ЧТО ГОВОРЯТ УЧАСТНИКИ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="card-glow rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array(r.stars).fill(0).map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm mb-4" style={{ color: "rgba(255,232,160,0.7)", fontFamily: "Golos Text", lineHeight: 1.6 }}>
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)", color: "#070710", fontFamily: "Oswald" }}>
                    {r.name[0]}
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#FFB800", fontFamily: "Golos Text" }}>{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-gold" style={{ fontFamily: "Oswald" }}>
            ГОТОВ НАЧАТЬ?
          </h2>
          <p className="mb-8 text-base" style={{ color: "rgba(255,232,160,0.5)", fontFamily: "Golos Text" }}>
            Регистрация бесплатна. Первый вывод средств — уже через 14 дней
          </p>
          <button onClick={() => setModal("register")}
            className="btn-neon-gold px-12 py-5 rounded-2xl text-xl">
            Зарегистрироваться
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(255,184,0,0.08)" }}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)" }}>
            <span className="text-black font-bold text-xs" style={{ fontFamily: "Oswald" }}>EP</span>
          </div>
          <span className="font-bold text-gradient-gold" style={{ fontFamily: "Oswald" }}>EarnPro</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,232,160,0.2)", fontFamily: "Golos Text" }}>
          © 2024 EarnPro. Все права защищены.
        </p>
      </footer>

      {/* Modal */}
      {modal !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
          onClick={() => setModal("none")}>
          <div className="w-full max-w-md rounded-2xl p-8 animate-scale-in relative"
            style={{ background: "#0E0E1C", border: "1px solid rgba(255,184,0,0.2)", boxShadow: "0 20px 80px rgba(0,0,0,0.8)" }}
            onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal("none")}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ color: "rgba(255,232,160,0.4)", background: "rgba(255,255,255,0.05)" }}>
              <Icon name="X" size={16} />
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)" }}>
                <Icon name={modal === "login" ? "LogIn" : "UserPlus"} size={20} className="text-black" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-gold mb-1" style={{ fontFamily: "Oswald" }}>
                {modal === "login" ? "ВОЙТИ В КАБИНЕТ" : "РЕГИСТРАЦИЯ"}
              </h2>
              <p className="text-sm" style={{ color: "rgba(255,232,160,0.4)", fontFamily: "Golos Text" }}>
                {modal === "login" ? "Введите ваши данные для входа" : "Создайте аккаунт бесплатно"}
              </p>
            </div>

            <div className="space-y-4">
              {modal === "register" && (
                <div>
                  <label className="text-xs font-medium block mb-2" style={{ color: "rgba(255,232,160,0.5)", fontFamily: "Golos Text" }}>
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    placeholder="Александр"
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-medium block mb-2" style={{ color: "rgba(255,232,160,0.5)", fontFamily: "Golos Text" }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-2" style={{ color: "rgba(255,232,160,0.5)", fontFamily: "Golos Text" }}>
                  Пароль
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <button
                onClick={modal === "login" ? handleLogin : handleRegister}
                className="btn-neon-gold w-full py-4 rounded-xl text-base mt-2">
                {modal === "login" ? "Войти" : "Создать аккаунт"}
              </button>
            </div>

            <p className="text-center text-sm mt-6" style={{ color: "rgba(255,232,160,0.35)", fontFamily: "Golos Text" }}>
              {modal === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
              <button
                className="font-medium hover:underline"
                style={{ color: "#FFB800" }}
                onClick={() => setModal(modal === "login" ? "register" : "login")}>
                {modal === "login" ? "Зарегистрироваться" : "Войти"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface Service {
  icon: string;
  title: string;
  description: string;
  badge: string | null;
  badgeColor: string;
  return: string;
  risk: string;
}

function Dashboard({ user, onLogout, services }: { user: User; onLogout: () => void; services: Service[] }) {
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "referrals">("overview");

  const transactions = [
    { type: "Пополнение", amount: "+5 000₽", date: "28 марта", color: "text-green-400" },
    { type: "Доход от инвестиций", amount: "+1 240₽", date: "27 марта", color: "text-green-400" },
    { type: "Вывод средств", amount: "-3 000₽", date: "25 марта", color: "text-red-400" },
    { type: "Реферальный бонус", amount: "+380₽", date: "24 марта", color: "text-amber-400" },
  ];

  return (
    <div className="min-h-screen grid-lines" style={{ background: "#070710" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4"
        style={{ borderBottom: "1px solid rgba(255,184,0,0.1)", background: "rgba(7,7,16,0.95)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)" }}>
            <span className="text-black font-bold text-sm" style={{ fontFamily: "Oswald" }}>EP</span>
          </div>
          <span className="text-lg font-bold text-gradient-gold" style={{ fontFamily: "Oswald" }}>EarnPro</span>
          <span className="hidden md:block text-xs px-2 py-1 rounded-full ml-2"
            style={{ background: "rgba(255,184,0,0.1)", color: "#FFB800", fontFamily: "Golos Text" }}>
            Личный кабинет
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <div className="text-sm font-semibold" style={{ color: "rgba(255,232,160,0.9)", fontFamily: "Golos Text" }}>{user.name}</div>
            <div className="text-xs" style={{ color: "#FFB800", fontFamily: "Golos Text" }}>{user.level}</div>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)", color: "#070710", fontFamily: "Oswald" }}>
            {user.name[0]}
          </div>
          <button onClick={onLogout}
            className="btn-outline-gold px-3 py-2 rounded-lg text-xs flex items-center gap-1">
            <Icon name="LogOut" size={14} />
            <span className="hidden md:inline">Выйти</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        {/* Balance card */}
        <div className="rounded-2xl p-8 mb-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,rgba(255,184,0,0.12),rgba(255,140,0,0.04))", border: "1px solid rgba(255,184,0,0.25)" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
            style={{ background: "radial-gradient(circle,#FFB800,transparent)", transform: "translate(30%,-30%)" }} />
          <p className="text-sm mb-2" style={{ color: "rgba(255,232,160,0.5)", fontFamily: "Golos Text" }}>Общий баланс</p>
          <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4" style={{ fontFamily: "Oswald" }}>
            ₽{user.balance.toLocaleString("ru")}
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn-neon-gold px-6 py-2 rounded-xl text-sm">Пополнить</button>
            <button className="btn-outline-gold px-6 py-2 rounded-xl text-sm">Вывести</button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Заработано сегодня", value: "+₽420", icon: "TrendingUp", color: "text-green-400" },
            { label: "Активные инвестиции", value: "₽8 000", icon: "BarChart2", color: "text-cyan-400" },
            { label: "Рефералов", value: "7", icon: "Users", color: "text-amber-400" },
            { label: "Дней на платформе", value: "42", icon: "Calendar", color: "text-purple-400" },
          ].map((item, i) => (
            <div key={i} className="card-glow rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name={item.icon} fallback="Star" size={16} className={item.color} />
                <span className="text-xs" style={{ color: "rgba(255,232,160,0.4)", fontFamily: "Golos Text" }}>{item.label}</span>
              </div>
              <div className={`text-xl font-bold ${item.color}`} style={{ fontFamily: "Oswald" }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,184,0,0.1)" }}>
          {([["overview", "Обзор"], ["services", "Услуги"], ["referrals", "Рефералы"]] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                fontFamily: "Oswald",
                letterSpacing: "0.05em",
                background: activeTab === tab ? "linear-gradient(135deg,#FFB800,#FF8C00)" : "transparent",
                color: activeTab === tab ? "#070710" : "rgba(255,232,160,0.5)",
              }}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-glow rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-gradient-gold" style={{ fontFamily: "Oswald" }}>
                Последние операции
              </h3>
              <div className="space-y-3">
                {transactions.map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-3"
                    style={{ borderBottom: "1px solid rgba(255,184,0,0.06)" }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: "rgba(255,232,160,0.8)", fontFamily: "Golos Text" }}>{t.type}</div>
                      <div className="text-xs" style={{ color: "rgba(255,232,160,0.3)", fontFamily: "Golos Text" }}>{t.date}</div>
                    </div>
                    <div className={`font-semibold text-sm ${t.color}`} style={{ fontFamily: "Oswald" }}>{t.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-glow rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-gradient-gold" style={{ fontFamily: "Oswald" }}>
                Мой уровень
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: "linear-gradient(135deg,rgba(255,184,0,0.2),rgba(255,140,0,0.05))", border: "1px solid rgba(255,184,0,0.3)" }}>
                  🏆
                </div>
                <div>
                  <div className="text-xl font-bold text-gradient-gold" style={{ fontFamily: "Oswald" }}>{user.level}</div>
                  <div className="text-xs" style={{ color: "rgba(255,232,160,0.4)", fontFamily: "Golos Text" }}>До следующего уровня: ₽5 150</div>
                </div>
              </div>
              <div className="mb-2 flex justify-between text-xs" style={{ color: "rgba(255,232,160,0.4)", fontFamily: "Golos Text" }}>
                <span>Прогресс</span><span>76%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full" style={{ width: "76%", background: "linear-gradient(90deg,#FFB800,#FF8C00)" }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div key={i} className="card-glow rounded-2xl p-5">
                <div className="service-icon-bg w-10 h-10 rounded-xl flex items-center justify-center mb-3">
                  <Icon name={s.icon} fallback="Star" size={18} className="text-amber-400" />
                </div>
                <h3 className="font-bold mb-1 text-gradient-gold" style={{ fontFamily: "Oswald" }}>{s.title}</h3>
                <p className="text-xs mb-4" style={{ color: "rgba(255,232,160,0.5)", fontFamily: "Golos Text" }}>{s.description}</p>
                <button className="btn-neon-gold w-full py-2 rounded-lg text-sm">Открыть</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "referrals" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-glow rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gradient-gold mb-4" style={{ fontFamily: "Oswald" }}>Ваша реферальная ссылка</h3>
              <div className="flex gap-2">
                <input
                  readOnly
                  value="https://earnpro.ru/ref/alex123"
                  className="input-dark flex-1 px-3 py-2 rounded-xl text-xs"
                />
                <button className="btn-neon-gold px-4 py-2 rounded-xl text-sm">
                  <Icon name="Copy" size={16} />
                </button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.1)" }}>
                  <div className="text-2xl font-bold text-amber-400" style={{ fontFamily: "Oswald" }}>7</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,232,160,0.4)", fontFamily: "Golos Text" }}>Рефералов</div>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ background: "rgba(255,184,0,0.05)", border: "1px solid rgba(255,184,0,0.1)" }}>
                  <div className="text-2xl font-bold text-green-400" style={{ fontFamily: "Oswald" }}>₽2 140</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,232,160,0.4)", fontFamily: "Golos Text" }}>Заработано</div>
                </div>
              </div>
            </div>
            <div className="card-glow rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gradient-gold mb-4" style={{ fontFamily: "Oswald" }}>Как это работает</h3>
              <div className="space-y-4">
                {[
                  { step: "1", text: "Поделитесь своей ссылкой с друзьями" },
                  { step: "2", text: "Друг регистрируется и начинает зарабатывать" },
                  { step: "3", text: "Вы получаете 10% с каждой его операции" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#FFB800,#FF8C00)", color: "#070710", fontFamily: "Oswald" }}>
                      {item.step}
                    </div>
                    <p className="text-sm" style={{ color: "rgba(255,232,160,0.6)", fontFamily: "Golos Text" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}