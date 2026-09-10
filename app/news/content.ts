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
    previous: "Предыдущая новость",
    next: "Следующая новость",
  },
  ky: {
    pageTitle: "Жаңылыктар",
    title: "Sabat коомчулугунун окуялары, баяндары жана идеялары.",
    intro: "Фонддун долбоорлору, аларды түзгөн адамдар жана билимди коомдун пайдасына багыттаган тажрыйбалар жөнүндө айтып беребиз.",
    latest: "Акыркы жарыялар",
    read: "Материалды окуу",
    imageLabel: "Материалдын сүрөтү",
    back: "Бардык жаңылыктар",
    previous: "Мурунку жаңылык",
    next: "Кийинки жаңылык",
  },
  en: {
    pageTitle: "News",
    title: "Stories, events and ideas from the Sabat community.",
    intro: "Updates on the foundation’s projects, the people behind them and the practices that help knowledge create value for society.",
    latest: "Latest stories",
    read: "Read the story",
    imageLabel: "Story image",
    back: "All news",
    previous: "Previous story",
    next: "Next story",
  },
};

type LocalizedStory = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
};

export const localizedNews: Record<Language, Record<string, LocalizedStory>> = {
  ru: {
    "new-season": { category: "Инициативы", date: "18 июня 2026", title: "Новый сезон общественных проектов Sabat", excerpt: "Запускаем встречи, открытые площадки и новые форматы совместной работы.", body: ["В новом сезоне мы сосредоточимся на небольших локальных инициативах, открытом диалоге и проектах, которые приносят практическую пользу людям.", "Программа объединит открытые встречи, командные обсуждения и практическую работу. Участники смогут определить важную для своего сообщества задачу и вместе найти реалистичный способ её решения.", "Каждая инициатива пройдёт путь от первой идеи до понятного результата. Для нас важно, чтобы этот опыт помогал молодым людям увереннее действовать, слышать друг друга и брать ответственность за общее дело."] },
    "community-meeting": { category: "События", date: "4 июня 2026", title: "Открытая встреча сообщества Sabat", excerpt: "Участники обсудили идеи, которые могут улучшить жизнь вокруг нас.", body: ["В центре разговора были взаимная поддержка, доступные общественные пространства и способы превращать хорошие идеи в реальные действия. Особое внимание уделили тому, как сделать участие в общественных проектах понятным и доступным для разных людей.", "Участники делились наблюдениями и обсуждали, какие небольшие изменения можно начать уже сейчас. Работа в малых группах помогла превратить общие пожелания в конкретные предложения. Несколько идей участники решили доработать вместе после встречи.", "Встреча стала пространством для знакомства и совместного поиска решений. Следующий шаг — собрать команды вокруг выбранных идей и определить, какую поддержку Sabat может предоставить каждой инициативе. Команда продолжит общение с участниками, поможет уточнить цели проектов и составить первые планы действий. Итоги встречи станут основой для следующих открытых обсуждений и новых совместных инициатив."] },
    "small-steps": { category: "Истории", date: "22 мая 2026", title: "Почему большие перемены начинаются с малого", excerpt: "Пять простых принципов, которые помогают инициативе стать устойчивой.", body: ["Начните с понятной задачи, соберите небольшую команду, распределите ответственность, слушайте обратную связь и отмечайте каждый достигнутый результат.", "Устойчивая работа редко начинается с большого масштаба. Небольшой, но завершённый шаг помогает проверить идею, увидеть её пользу и понять, что следует улучшить перед продолжением.", "Так команда сохраняет внимание к людям и не теряет связь с реальной задачей. Постепенное развитие делает инициативу понятнее для участников, партнёров и тех, ради кого она создаётся."] },
    partners: { category: "Партнёрство", date: "8 мая 2026", title: "Sabat открыт к новым партнёрствам", excerpt: "Приглашаем организации, экспертов и активных людей создавать полезные проекты вместе.", body: ["Мы открыты к сотрудничеству со всеми, кому близки идеи взаимного уважения, ответственности и позитивных изменений в обществе.", "Партнёры могут участвовать в образовательных программах как эксперты и наставники, поддерживать практические проекты или предлагать новые направления совместной работы.", "Нам особенно важны долгосрочные отношения, в которых каждая сторона понимает общую цель и свой вклад. Такой подход помогает создавать решения, которые продолжают работать и после завершения отдельного проекта."] },
  },
  ky: {
    "new-season": { category: "Демилгелер", date: "18-июнь, 2026", title: "Sabat коомдук долбоорлорунун жаңы сезону", excerpt: "Жолугушууларды, ачык аянтчаларды жана биргелешкен иштин жаңы форматтарын баштайбыз.", body: ["Жаңы сезондо чакан жергиликтүү демилгелерге, ачык диалогго жана адамдарга практикалык пайда алып келген долбоорлорго басым жасайбыз.", "Программа ачык жолугушууларды, командалык талкууларды жана практикалык ишти бириктирет. Катышуучулар коомчулук үчүн маанилүү маселени аныктап, аны чечүүнүн реалдуу жолун чогуу табышат.", "Ар бир демилге биринчи идеядан түшүнүктүү натыйжага чейинки жолду басып өтөт. Бул тажрыйба жаштарга ишенимдүү аракеттенүүгө, бири-бирин угууга жана жалпы иш үчүн жоопкерчилик алууга жардам берет."] },
    "community-meeting": { category: "Окуялар", date: "4-июнь, 2026", title: "Sabat коомчулугунун ачык жолугушуусу", excerpt: "Катышуучулар айланабыздагы жашоону жакшырта турган идеяларды талкуулашты.", body: ["Сүйлөшүүнүн өзөгүндө өз ара колдоо, жеткиликтүү коомдук мейкиндиктер жана жакшы идеяларды реалдуу ишке айлантуу жолдору болду. Коомдук долбоорлорго катышууну ар түрдүү адамдар үчүн түшүнүктүү жана жеткиликтүү кылууга өзгөчө көңүл бурулду.", "Катышуучулар байкоолору менен бөлүшүп, азыртан баштоого мүмкүн болгон чакан өзгөрүүлөрдү талкуулашты. Чакан топтордогу иш жалпы каалоолорду конкреттүү сунуштарга айлантууга жардам берди. Бир нече идеяны жолугушуудан кийин чогуу иштеп чыгуу чечилди.", "Жолугушуу таанышуу жана чечимдерди биргелешип издөө үчүн аянтча болду. Кийинки кадам — тандалган идеялардын айланасына командаларды чогултуу жана Sabat кандай колдоо көрсөтө аларын аныктоо. Команда катышуучулар менен байланышты улантып, долбоорлордун максаттарын тактоого жана алгачкы аракеттер планын түзүүгө жардам берет. Жолугушуунун жыйынтыктары кийинки ачык талкууларга жана жаңы биргелешкен демилгелерге негиз болот."] },
    "small-steps": { category: "Баяндар", date: "22-май, 2026", title: "Эмне үчүн чоң өзгөрүүлөр кичине кадамдардан башталат", excerpt: "Демилгенин туруктуу болушуна жардам берген беш жөнөкөй принцип.", body: ["Так милдеттен баштаңыз, чакан команда түзүңүз, жоопкерчиликти бөлүштүрүңүз, пикирлерди угуңуз жана ар бир жетишкен натыйжаны белгилеңиз.", "Туруктуу иш сейрек учурда чоң масштабдан башталат. Чакан, бирок аяктаган кадам идеяны текшерүүгө, анын пайдасын көрүүгө жана андан ары эмнени жакшыртуу керектигин түшүнүүгө жардам берет.", "Ошентип команда адамдарга жана чыныгы маселеге көңүл буруусун сактайт. Акырындык менен өнүгүү демилгени катышуучулар, өнөктөштөр жана ал түзүлгөн адамдар үчүн түшүнүктүүрөөк кылат."] },
    partners: { category: "Өнөктөштүк", date: "8-май, 2026", title: "Sabat жаңы өнөктөштүккө ачык", excerpt: "Уюмдарды, эксперттерди жана активдүү адамдарды пайдалуу долбоорлорду чогуу түзүүгө чакырабыз.", body: ["Өз ара урматтоо, жоопкерчилик жана коомдогу оң өзгөрүүлөр идеяларын бөлүшкөндөрдүн баары менен кызматташууга даярбыз.", "Өнөктөштөр билим берүү программаларына эксперт жана насаатчы катары катышып, практикалык долбоорлорду колдоп же биргелешкен иштин жаңы багыттарын сунуштай алышат.", "Биз үчүн ар бир тарап жалпы максатты жана өз салымын түшүнгөн узак мөөнөттүү мамилелер өзгөчө маанилүү. Мындай ыкма өзүнчө долбоор аяктагандан кийин да иштей берген чечимдерди түзүүгө жардам берет."] },
  },
  en: {
    "new-season": { category: "Initiatives", date: "June 18, 2026", title: "A new season of Sabat community projects", excerpt: "New meetings, open platforms and formats for working together are about to begin.", body: ["This season, we are focusing on small local initiatives, open dialogue and projects that deliver practical value for people.", "The programme will combine open meetings, team discussions and hands-on work. Participants will identify an issue that matters to their community and develop a realistic way to address it together.", "Each initiative will move from an initial idea to a clear result. We want this experience to help young people act with confidence, listen to one another and take responsibility for a shared purpose."] },
    "community-meeting": { category: "Events", date: "June 4, 2026", title: "An open meeting of the Sabat community", excerpt: "Participants discussed ideas that can improve everyday life around us.", body: ["The conversation focused on mutual support, accessible public spaces and ways to turn good ideas into practical action. Particular attention was given to making participation in community projects clear and accessible to different people.", "Participants shared observations and discussed small changes that could begin immediately. Working in small groups helped turn broad wishes into concrete proposals. Several ideas will be developed further by participants after the meeting.", "The meeting became a space for new connections and a shared search for solutions. The next step is to form teams around selected ideas and determine how Sabat can support each initiative. The team will stay in touch with participants, help refine project goals and outline the first steps. Insights from the meeting will guide future open discussions and new collaborative initiatives."] },
    "small-steps": { category: "Stories", date: "May 22, 2026", title: "Why meaningful change begins with small steps", excerpt: "Five simple principles that help an initiative become sustainable.", body: ["Start with a clear task, gather a small team, share responsibility, listen to feedback and acknowledge every result along the way.", "Sustainable work rarely begins at scale. A small but completed step helps test an idea, demonstrate its value and reveal what should improve before moving forward.", "This approach keeps the team focused on people and connected to the real problem. Gradual development also makes an initiative clearer to participants, partners and the people it is designed to serve."] },
    partners: { category: "Partnerships", date: "May 8, 2026", title: "Sabat is open to new partnerships", excerpt: "We invite organisations, experts and active citizens to create useful projects together.", body: ["We welcome collaboration with everyone who shares the values of mutual respect, responsibility and positive change in society.", "Partners can contribute to educational programmes as experts and mentors, support practical projects or propose new directions for working together.", "Long-term relationships matter most to us: each side should understand the shared goal and its contribution. This approach helps create solutions that continue to work after an individual project has ended."] },
  },
};
