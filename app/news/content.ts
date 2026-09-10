export type Language = "ru" | "ky" | "en";

export const archiveCopy = {
  ru: {
    pageTitle: "Новости",
    title: "События, истории и идеи сообщества Sabat.",
    intro: "Рассказываем о проектах фонда, людях, которые их создают, и практиках, помогающих знаниям приносить пользу обществу.",
    latest: "Последние публикации",
    read: "Читать материал",
    imageLabel: "Фото материала",
    back: "Все новости",
  },
  ky: {
    pageTitle: "Жаңылыктар",
    title: "Sabat коомчулугунун окуялары, баяндары жана идеялары.",
    intro: "Фонддун долбоорлору, аларды түзгөн адамдар жана билимди коомдун пайдасына багыттаган тажрыйбалар жөнүндө айтып беребиз.",
    latest: "Акыркы жарыялар",
    read: "Материалды окуу",
    imageLabel: "Материалдын сүрөтү",
    back: "Бардык жаңылыктар",
  },
  en: {
    pageTitle: "News",
    title: "Stories, events and ideas from the Sabat community.",
    intro: "Updates on the foundation’s projects, the people behind them and the practices that help knowledge create value for society.",
    latest: "Latest stories",
    read: "Read the story",
    imageLabel: "Story image",
    back: "All news",
  },
};

type LocalizedStory = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body: string;
};

export const localizedNews: Record<Language, Record<string, LocalizedStory>> = {
  ru: {
    "new-season": { category: "Инициативы", date: "18 июня 2026", title: "Новый сезон общественных проектов Sabat", excerpt: "Запускаем встречи, открытые площадки и новые форматы совместной работы.", body: "В новом сезоне мы сосредоточимся на небольших локальных инициативах, открытом диалоге и проектах, которые приносят практическую пользу людям." },
    "community-meeting": { category: "События", date: "4 июня 2026", title: "Открытая встреча сообщества Sabat", excerpt: "Участники обсудили идеи, которые могут улучшить жизнь вокруг нас.", body: "В центре разговора были взаимная поддержка, доступные общественные пространства и способы превращать хорошие идеи в реальные действия." },
    "small-steps": { category: "Истории", date: "22 мая 2026", title: "Почему большие перемены начинаются с малого", excerpt: "Пять простых принципов, которые помогают инициативе стать устойчивой.", body: "Начните с понятной задачи, соберите небольшую команду, распределите ответственность, слушайте обратную связь и отмечайте каждый достигнутый результат." },
    partners: { category: "Партнёрство", date: "8 мая 2026", title: "Sabat открыт к новым партнёрствам", excerpt: "Приглашаем организации, экспертов и активных людей создавать полезные проекты вместе.", body: "Мы открыты к сотрудничеству со всеми, кому близки идеи взаимного уважения, ответственности и позитивных изменений в обществе." },
  },
  ky: {
    "new-season": { category: "Демилгелер", date: "18-июнь, 2026", title: "Sabat коомдук долбоорлорунун жаңы сезону", excerpt: "Жолугушууларды, ачык аянтчаларды жана биргелешкен иштин жаңы форматтарын баштайбыз.", body: "Жаңы сезондо чакан жергиликтүү демилгелерге, ачык диалогго жана адамдарга практикалык пайда алып келген долбоорлорго басым жасайбыз." },
    "community-meeting": { category: "Окуялар", date: "4-июнь, 2026", title: "Sabat коомчулугунун ачык жолугушуусу", excerpt: "Катышуучулар айланабыздагы жашоону жакшырта турган идеяларды талкуулашты.", body: "Сүйлөшүүнүн өзөгүндө өз ара колдоо, жеткиликтүү коомдук мейкиндиктер жана жакшы идеяларды реалдуу ишке айлантуу жолдору болду." },
    "small-steps": { category: "Баяндар", date: "22-май, 2026", title: "Эмне үчүн чоң өзгөрүүлөр кичине кадамдардан башталат", excerpt: "Демилгенин туруктуу болушуна жардам берген беш жөнөкөй принцип.", body: "Так милдеттен баштаңыз, чакан команда түзүңүз, жоопкерчиликти бөлүштүрүңүз, пикирлерди угуңуз жана ар бир жетишкен натыйжаны белгилеңиз." },
    partners: { category: "Өнөктөштүк", date: "8-май, 2026", title: "Sabat жаңы өнөктөштүккө ачык", excerpt: "Уюмдарды, эксперттерди жана активдүү адамдарды пайдалуу долбоорлорду чогуу түзүүгө чакырабыз.", body: "Өз ара урматтоо, жоопкерчилик жана коомдогу оң өзгөрүүлөр идеяларын бөлүшкөндөрдүн баары менен кызматташууга даярбыз." },
  },
  en: {
    "new-season": { category: "Initiatives", date: "June 18, 2026", title: "A new season of Sabat community projects", excerpt: "New meetings, open platforms and formats for working together are about to begin.", body: "This season, we are focusing on small local initiatives, open dialogue and projects that deliver practical value for people." },
    "community-meeting": { category: "Events", date: "June 4, 2026", title: "An open meeting of the Sabat community", excerpt: "Participants discussed ideas that can improve everyday life around us.", body: "The conversation focused on mutual support, accessible public spaces and ways to turn good ideas into practical action." },
    "small-steps": { category: "Stories", date: "May 22, 2026", title: "Why meaningful change begins with small steps", excerpt: "Five simple principles that help an initiative become sustainable.", body: "Start with a clear task, gather a small team, share responsibility, listen to feedback and acknowledge every result along the way." },
    partners: { category: "Partnerships", date: "May 8, 2026", title: "Sabat is open to new partnerships", excerpt: "We invite organisations, experts and active citizens to create useful projects together.", body: "We welcome collaboration with everyone who shares the values of mutual respect, responsibility and positive change in society." },
  },
};
