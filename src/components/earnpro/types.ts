export type View = "home" | "dashboard";
export type ModalType = "none" | "login" | "register";

export interface User {
  name: string;
  email: string;
  balance: number;
  level: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  badge: string | null;
  badgeColor: string;
  return: string;
  risk: string;
}

export const MOCK_USER: User = {
  name: "Александр",
  email: "alex@example.com",
  balance: 24850,
  level: "Профессионал",
};

export const SERVICES: Service[] = [
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
