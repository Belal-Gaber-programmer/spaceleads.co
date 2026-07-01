import { useState } from 'react';
import {
  Plus,
  Minus,
  Search,
  ShieldCheck,
  Target,
  Instagram,
  Bookmark,
  MessageCircle,
  Magnet,
  CalendarDays,
  Cog,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';

/* ════════════════════════ Shared card style (design system) ════════════════════════ */
const CARD =
  'group relative rounded-[2.5rem] bg-[#FAFAFA] border border-black/[0.03] hover:border-red-500/20 hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-700';

type Stage = 'TOF' | 'MOF' | 'BOF';

const stageStyles: Record<Stage, string> = {
  TOF: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  MOF: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  BOF: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const StageBadge = ({ stage }: { stage: Stage }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${stageStyles[stage]}`}
  >
    {stage}
  </span>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs uppercase tracking-[0.4em] font-bold text-black/40 mb-5">{children}</p>
);

/* ════════════════════════ DATA — transcribed from Salah's strategy doc ════════════════════════ */

const execParagraphs: string[] = [
  'عندك ٦١ ألف متابع على إنستقرام، ٢٩٩ منشور أغلبها ريلز شغّالة. البايو يقول مين تخدم بوضوح — «أرشدت ٢١٢+ مشغول ومشغولة بـ١٢ أسبوع» — وفيه أتمتة ManyChat («راسلني إرشاد»)، ورابط البايو يودّي مباشرة لفيديو يوتيوب. يعني إنت فعلاً تسحب انتباه من إنستقرام وتصبّه في اليوتيوب بقصد، وقلت بنفسك إنه «رغم بساطته حوّل كثير» وإنك راح تركّز عليه أكثر. الاستراتيجية هذي تبني على القرار هذا بالضبط.',
  'أول شي بصراحة: القمع اللي تشغّله — إنستقرام يجيب الانتباه وإنت تصبّه في اليوتيوب عبر البايو وأتمتة «إرشاد» — ممتاز، وما نغيّره. نبني فوقه. اللي ناقص إنك تستخدم اليوتيوب نفسه بعمق، مو بس كمكان تنزل فيه فيديوهاتك. ثلاث نتائج ما تجيبها الريلز ولا أي منصة ثانية:',
];

const execOutcomes: { title: string; desc: string }[] = [
  { title: 'ترافيك عضوي دائم من البحث', desc: 'محتوى مبني على اللي الناس تكتبه فعلاً، يجيب جمهور جديد كل يوم بدون ما تنزل شي — يشتغل وإنت نايم.' },
  { title: 'ثقة وسلطة أعمق', desc: 'الطويل يخليك تثبت إنك «مرشد مو مدرب» بدل ما تقولها، فالمتردد يقتنع قبل ما يكلمك.' },
  { title: 'مكالمات دافئة جاهزة تشتري', desc: 'اللي يوصلك بعد ٣٠–٤٠ دقيقة معك يجي شبه مقفول: ما يحتاج إقناع، يحتاج بس يبدأ.' },
];

const execClosing: string[] = [
  'السبب بسيط: إنستقرام يحل مشكلة الانتباه، واليوتيوب يحل مشكلة الاقتناع. الريل يعجّب الموظف فيك وإنك «مو معضّل» وتحكي بمنطق، بس ما يكفي يخلّيه يدفع لبرنامج ١٢ أسبوع — اللي يقنعه إنه يقعد معك نص ساعة ويحس إنك فاهم حالته. وهنا عندك أصلين ما ينبنون إلا بالطويل: «مرشد مو مدرب» فرق يُثبَت بالتراكم لين يوصلك الشخص حاسّك تعرفه من شهور؛ و«مو معضّل» سلاح ثقة يشيل عن الموظف إنه لازم يصير كائن ثاني عشان ينجح.',
  'وأوضح فرصة ضايعة إن كل وصولك معلّق على خوارزمية إنستقرام — توقّف أسبوع، يوقف الانتباه. اليوتيوب يفتح لك مصدر مستقل عبر البحث: ناس يدوّرونك بنفسها الساعة ١٢ بالليل، أسهل تحويلاً من ناس ما يعرفونك، وفيديو واحد يجاوبهم يشتغل سنة وسنتين بدون ما تنزل شي. الناقص إن اليوتيوب يتحوّل من فيديوهات تحوّل بالصدفة لنظام يحوّل بقصد.',
];

const funnelStages: { stage: Stage; num: string; en: string; ar: string; icon: typeof Search; body: string }[] = [
  {
    stage: 'TOF',
    num: '01',
    en: 'Discovery',
    ar: 'الانتباه · واعي بالمشكلة',
    icon: Search,
    body: `أعلى القمع فيه مصدرين: ريلز إنستقرام (شغّال — نخليه زي ما هو، بس نوجّه جزء منه لليوتيوب بقصد)، وفيديوهات بحث على اليوتيوب (الفرصة الجديدة: مواضيع الناس تكتبها بنفسها زي «نزول الوزن بدون رجيم» و«تمارين للموظفين» — جمهور جديد يشتغل ٢٤ ساعة). هنا المشاهد واعي بمشكلته بس ما يعرف الحل، فنكلّمه عن وجعه ونخليه يحس إنك فاهمه، بدون بيع.`,
  },
  {
    stage: 'MOF',
    num: '02',
    en: 'Trust & Education',
    ar: 'الاقتناع · واعي بالحل',
    icon: ShieldCheck,
    body: `قلب اليوتيوب. هنا يوصل اللي شافك على إنستقرام وصار عنده فضول. تشرح ليش طريقتك تشتغل — السعرات بدل الرجيمات القاسية، المقاومة قبل الكارديو، ٣ أيام أذكى من ٦ — وتكسر القناعات اللي تعطّله (لازم يعذّب نفسه، لازم يكون مثالي، إنه «حالة خاصة»). وهنا مكان «مرشد مو مدرب» و«مو معضّل» — أعمق طبقة وأهمها، لأنك تبيع لواحد صار مؤمن بطريقتك قبل ما يحجز.`,
  },
  {
    stage: 'BOF',
    num: '03',
    en: 'Conversion',
    ar: 'التحويل · واعي بالمنتج',
    icon: Target,
    body: `عدد أقل، نية أعلى. الواحد شبه مقتنع وعنده سؤال أخير: «هل يناسب حالتي؟». تعالج الاعتراض، تعرض العملية بصراحة، وتقول لمن يصلح ولمن ما يصلح — الصراحة ترفع جودة الحجوزات. وأقوى نوع هنا الإثبات الحي: دراسات حالة ومقابلات متدربين — واحد كان في نفس مكان المشاهد يحكي كيف تغيّر في ١٢ أسبوع، فيقفل الاعتراض الأخير.`,
  },
];

interface VideoIdea {
  stage: Stage;
  title: string;
  angle: string;
  intent: string;
  premise: string;
  thumbnail: string;
  cta: string;
}

const videoIdeas: VideoIdea[] = [
  {
    stage: 'TOF',
    title: 'ليش وزنك يرجع كل ما تنحف؟ (السبب مو اللي تتوقعه)',
    angle: 'كل شخص جرّب رجيم عنده هالجرح، ويتبحث كثير. تعطي سبب غير متوقّع بدل اللي الكل يقوله.',
    intent: '«أنحف وأرجع… في شي غلط عندي؟»',
    premise: 'ليش النتيجة ما تثبت — غياب الزيادة التدريجية والعادات، مو ضعف الالتزام.',
    thumbnail: 'وجهك بتعبير «أوقف» + سهم ينزل ويطلع. نص: «رجع مرة ثانية؟»',
    cta: 'شوف فيديو السعرات.',
  },
  {
    stage: 'TOF',
    title: 'كارديو ولا حديد لنزول الوزن؟ الجواب بيوفّر عليك سنين',
    angle: 'سؤال يتبحث، وعندك موقف واضح مخالف للشائع.',
    intent: '«طول عمري على السير… هذا صح أصلاً؟»',
    premise: 'ليش المقاومة تختصر الوقت وتعطي نتيجة تدوم، وليش الكارديو يضيّع سنين على المشغول.',
    thumbnail: 'انقسام — سير جري / أوزان. نص: «أيهم أسرع؟»',
    cta: 'اشترك لفيديو التمارين للمشغولين.',
  },
  {
    stage: 'TOF',
    title: 'خلّني أقول لك ليش الحل أحياناً زيادة وزنك مو إنقاصه',
    angle: 'خطاف مجرّب عندك على إنستقرام وناجح — عكسي ويثير الفضول. الطويل يشرح المنطق كامل بدل ما يوقف عند الصدمة.',
    intent: '«كيف يعني أزيد وزني؟ هذا عكس كل شي سمعته.»',
    premise: 'ليش بناء العضلة والتركيز على التكوين أهم من رقم الميزان، وكيف يغيّر شكل الجسم فعلاً.',
    thumbnail: 'سهم يطلع فوق + وجهك واثق. نص: «زيد… مو نقّص؟»',
    cta: 'شوف فيديو «مو لازم تكون مثالي».',
  },
  {
    stage: 'TOF',
    title: 'لا تصدّق إنك حالة خاصة — تنزيل وزنك أسهل مما تتصوّر',
    angle: 'خطاف شغّال عندك، ويريح المشاهد نفسياً. أغلب الناس مقتنعة إن وضعها مستحيل، وإنت تكسر هالقناعة.',
    intent: '«جسمي مختلف، عمري كبير، ظروفي صعبة… أنا استثناء.»',
    premise: 'ليش «أنا حالة خاصة» غالباً عذر مو حقيقة، وكيف نفس المبادئ تشتغل مع الأغلبية.',
    thumbnail: 'وجهك متعاطف + كلمة «حالة خاصة؟» مشطوبة.',
    cta: 'شوف قصص المتدربين.',
  },
  {
    stage: 'MOF',
    title: 'الفرق بين المدرب والمرشد… وليش هذا اللي يغيّر نتيجتك',
    angle: 'هذا الفيديو يبني موقعك كله. عندك هايلايت «مرشد مو مدرب» — هنا تشرح الفكرة بعمق بدل ما تمر عليها.',
    intent: '«ليش أدفع لمرشد وأنا ألاقي برامج جاهزة ببلاش؟»',
    premise: 'المدرب يعطيك تمارين، المرشد يمشي معك ويطبّق على حالتك ووقتك — الفرق اللي يخلّي النتيجة تصير وتثبت.',
    thumbnail: '«مدرب» / «مرشد» وبينهم خط. نص: «الفرق يفرق.»',
    cta: 'لو تبي حد يمشي معك بهالطريقة — راسلني «إرشاد».',
  },
  {
    stage: 'MOF',
    title: 'أنا مرشد رياضي… بس ماني معضّل. ليش هذا في صالحك؟',
    angle: 'أقوى خطاف براندك، بس نحوّله من نكتة لحجّة. كونك «مو معضّل» دليل إن طريقتك للناس العاديين، مو لأبطال كمال الأجسام.',
    intent: '«كل المدربين أجسامهم مستحيلة… أنا ما أقدر أوصل لكذا أصلاً.»',
    premise: 'ليش ما تحتاج تصير رياضي محترف عشان تغيّر جسمك وصحتك، وليش المرشد اللي يشبهك أفهم لوضعك من المعضّل اللي عايش في الجيم.',
    thumbnail: 'إنت بشكلك الطبيعي + نص: «مو معضّل… وبفتخر.»',
    cta: 'شوف فيديو الـ٣ أيام.',
  },
  {
    stage: 'MOF',
    title: 'ليش أنا مؤمن إن السعرات هي الحل النهائي لوزنك',
    angle: 'موقف شخصي بصيغة قناعة، والقناعة تبني سلطة أكثر من المعلومة.',
    intent: '«كيتو، صيام، لو كارب… أي وحدة أختار؟»',
    premise: 'ليش نظام السعرات يتفوّق على الأنظمة القاسية المؤقتة، وليش هو الأنسب لنتيجة تدوم بلا معاناة.',
    thumbnail: 'طبق أكل عادي مو «رجيمي» + نص: «بدون رجيم قاسي.»',
    cta: 'حمّل كتيب السعرات (عندك أصلاً).',
  },
  {
    stage: 'MOF',
    title: 'مو لازم تكون مثالي عشان توصل لجسم أحلامك',
    angle: 'يكسر عقلية «الكل أو لا شي» اللي تفشّل أغلب الناس.',
    intent: '«كل ما أكسر الرجيم أحس إني خربت كل شي وأوقف.»',
    premise: 'ليش المثالية عدوة الاستمرار، وكيف البداية من «اللي تقدر عليه» تفرق في نتيجتك بعد سنة. (قصة المتدربة اللي غيّرت ملابسها بأسبوعها السابع تنفع هنا.)',
    thumbnail: 'وجهك مرتاح + نص: «الكمال مو شرط.»',
    cta: 'اشترك للفيديو الجاي.',
  },
  {
    stage: 'MOF',
    title: 'ليش تمرين ٣ أيام أفضل من ٦ (لو سويته صح)',
    angle: 'عكس المتوقّع. الناس تظن أكثر تمرين = نتيجة أسرع، وإنت تقلب المعادلة.',
    intent: '«لازم أتمرن كل يوم عشان أشوف فرق، صح؟»',
    premise: 'ليش الجودة والزيادة التدريجية تغلب الكمية، وكيف ٣ أيام مركّزة تعطي أكثر من ٦ عشوائية.',
    thumbnail: '«٣» كبيرة مقابل «٦» باهتة. نص: «أقل = أكثر؟»',
    cta: 'شوف قصص المتدربين.',
  },
  {
    stage: 'MOF',
    title: 'وزنك يزيد كل ما انشغلت؟ الحل مو الوقت… ولا التضحية',
    angle: 'يخاطب وجع شريحتك المركزية (الموظف اللي وزنه يطلع مع الضغط)، ويكسر عقلية «لازم أعاني».',
    intent: '«ما عندي وقت، وكل ما زاد شغلي زاد وزني… ما في حل يناسب حالتي.»',
    premise: 'ليش المشكلة في النظام مو في الوقت، وكيف الأفعال الصح تغلب المجهود الأعمى — بتشبيه بيئة الشغل اللي تستخدمه (العامل مقابل المدير).',
    thumbnail: 'إنت بملابس دوام + ساعة ظاهرة. نص: «مو الوقت.»',
    cta: 'راسلني «إرشاد».',
  },
  {
    stage: 'BOF',
    title: 'قبل ما تشترك بأي برنامج لياقة… شوف هذا الفيديو',
    angle: 'تأطير قبلي. تمسك الواحد في لحظة القرار وتصير المرجع في راسه.',
    intent: '«أبي أشترك بشي بس أخاف أدفع وأطلع بلا نتيجة.»',
    premise: 'المعايير اللي لازم يدوّر عليها (إرشاد شخصي، تطبيق على حالته، زيادة تدريجية) — وتنطبق طبيعياً على برنامجك.',
    thumbnail: 'وجهك جاد + نص: «قبل ما تدفع.»',
    cta: 'لو تبي حد يمشي معك كذا — احجز مكالمة (Calendly).',
  },
  {
    stage: 'BOF',
    title: 'كيف يشتغل برنامج الإرشاد؟ (ولمن يصلح ولمن لا)',
    angle: 'شفافية كاملة ترفع الثقة. جزء «لمن ما يصلح» يخلّي اللي يحجز جادّ ومناسب، فترتفع جودة المكالمات.',
    intent: '«شبه مقتنع… بس أبي أعرف بالضبط وش راح يصير وهل أنا مناسب.»',
    premise: 'جولة صريحة في العملية: كيف تبدأ المكالمة، كيف تفصّل على الحالة، والنتيجة المتوقعة خلال ١٢ أسبوع — ومين ما يناسبه.',
    thumbnail: 'إنت تشرح + نص: «العملية كاملة.»',
    cta: 'لو حسيت إنه يناسبك — احجز مكالمتك (Calendly).',
  },
  {
    stage: 'BOF',
    title: 'كيف تحوّل [اسم المتدرب] من [الوضع قبل] إلى [الوضع بعد] في [المدة] | مقابلة',
    angle: 'مقابلة كاملة مع متدرب حقيقي. المتردد يصدّق واحد يشبهه يحكي بلسانه أكثر منك إنت. اختَر متدرب كان في نفس ظرف المشاهد (موظف مشغول، جرّب وفشل).',
    intent: '«هل فيه أحد فعلاً نجح مع هذا الشخص، أو بس كلام؟»',
    premise: 'حوار طبيعي: وين كان، وش جرّب وفشل قبل، كيف كانت رحلته معك خلال [المدة]، ووش تغيّر في حياته مو بس في وزنه. يحكي هو، إنت تسأل.',
    thumbnail: 'قبل/بعد للمتدرب جنب بعض + نص: «[الوضع قبل] ← [الوضع بعد]».',
    cta: 'لو ظرفك يشبه ظرفه — احجز مكالمة (Calendly).',
  },
  {
    stage: 'BOF',
    title: 'كيف نزّل [اسم المتدرب] [الكمية] كيلو في [المدة] | دراسة حالة',
    angle: 'دراسة حالة برقم واضح. الفرق عن المقابلة إنها مبنية حولك إنت تشرح: تفكّك كيف صارت النتيجة خطوة خطوة، فتثبت الطريقة مو بس تعرض نتيجة.',
    intent: '«طيب نزّل [الكمية] كيلو… بالضبط كيف؟ وهل ينفع معي؟»',
    premise: 'تشرّح الحالة: نقطة البداية، وش عدّلتوا في الأكل والتمرين، العقبات اللي مرّت (سفر، دوام، انقطاع)، وكيف عالجتوها — فيطلع المشاهد شايف الطريقة تشتغل على أرض الواقع.',
    thumbnail: 'رقم كبير «[الكمية] كيلو» + «[المدة]» + وجه المتدرب. نص: «كيف بالضبط؟»',
    cta: 'لو تبي نفس المسار مفصّل على حالتك — احجز مكالمة (Calendly).',
  },
];

const vslMeta: { label: string; value: string }[] = [
  { label: 'الوعد الأساسي', value: 'يطلع المشاهد بخطة واضحة يطبّقها بـ٣ أيام بالأسبوع، ويفهم بالضبط ليش هالطريقة تشتغل بعد ما فشلت معه كل المحاولات.' },
  { label: 'الغرض الاستراتيجي', value: 'قلب القناة — يبني الثقة بعمق، يؤهّل الناس، ويحوّل بدون ضغط. المكان اللي يوصله الجمهور الأدفأ من إنستقرام واليوتيوب.' },
  { label: 'المشكلة اللي يحرّكها', value: 'حلقة «أنحف وأرجع» المرهقة، والإحساس إن الحل يتطلب معاناة ما يقدر عليها موظف مشغول، والاستنتاج المؤلم: «هذا وزني وخلاص».' },
  { label: 'الآلية الفريدة', value: '«طريقة صلاح» — منظومة من سبع ركائز تبدأ من فهم السلوك قبل التمرين وتنتهي بالإرشاد الشخصي (التفصيل بالأسفل).' },
];

const vslPillars: { title: string; text: string }[] = [
  { title: 'فهم السلوك قبل التمرين', text: 'نغيّر العادات، مو نعطي جدول وخلاص.' },
  { title: 'مجهود ذكي بدل التضحية', text: 'النتيجة تتطلب أفعال صح، مو معاناة.' },
  { title: 'المقاومة قبل الكارديو', text: '٣ أيام أقل من ساعة، بدل ساعات على السير.' },
  { title: 'السعرات بدل الأنظمة القاسية', text: 'استدامة بدل رجيمات مؤقتة.' },
  { title: 'الزيادة التدريجية', text: 'عشان النتيجة تثبت مو ترجع.' },
  { title: 'عادات على أرض الواقع بدل المثالية', text: 'ابدأ من اللي تقدر عليه.' },
  { title: 'إرشاد شخصي', text: 'مرشد يشبهك (مو معضّل) يمشي معك على وضعك.' },
];

const vslFormat =
  'فيديو واحد طويل (تقريباً ٤٠–٦٠ دقيقة) يشتغل كفيديو بيعي (VSL) على شكل فيديو يوتيوب عادي. المشاهد يحس إنه يتفرّج دورة مجانية قيّمة، وهو من جوّه مصمّم عشان يبني الثقة، يؤهّل، ويحوّل — بدون ما يحس إنه ينباع عليه. هذا الفيديو هو الوجهة النهائية للترافيك كله.';

const vslStructure: string[] = [
  'الخطاف / المشكلة.',
  'تكلفة إنك تظل زي ما أنت.',
  'القناعة الجديدة / الميكانيزم.',
  'الإطار (الركائز السبع).',
  'إثبات أو أمثلة (متدربين + الـ٢١٢).',
  'دعوة ناعمة للإجراء.',
];

const flywheelIntro =
  'الفكرة الاستراتيجية: بدل ما تشتّت الناس، تصبّ كل الترافيك في مكان واحد — من إنستقرام ومن باقي فيديوهات اليوتيوب (TOF و MOF) — على هذا الفيديو. تجمّع أدفأ جمهورك في نقطة وحدة، ومن هناك الثقة والتهيئة والتحويل تصير تلقائياً — يشتغل عنك ٢٤ ساعة، وكل ما نزّلت محتوى جديد يصبّ عليه ترافيك أكثر فيكبر أثره مع الوقت.';

const flywheelMechanism: { label: string; text: string }[] = [
  { label: 'إنستقرام + كل فيديوهات اليوتيوب (TOF و MOF)', text: 'كلها تنتهي بنفس الدعوة اللي تودّي لمكان واحد — «سويت دليل كامل يشرح كيف تنحف وانت مشغول، روح شوفه».' },
  { label: 'فيديو الـ Flywheel VSL', text: 'الثقة والتهيئة والتحويل تصير هنا تلقائياً، بدون ضغط بيعي.' },
  { label: 'احجز مكالمة (Calendly)', text: 'المخرج الوحيد — الخطوة الطبيعية بعد ما الفيديو أعطى قيمة كاملة.' },
];

const funnelingPlatforms: { name: string; followers: string; icon: typeof Instagram; tactics: { when: string; text: string }[] }[] = [
  {
    name: 'إنستقرام',
    followers: '٦١ ألف متابع · المحرّك',
    icon: Instagram,
    tactics: [
      { when: 'قبل النزول', text: 'ريل يفتح السؤال اللي الفيديو يجاوب عليه («ليش وزنك يرجع؟ الجواب الكامل بكرة على اليوتيوب») + ستوري تسويق مسبق. استخدم نفس أسلوبك في الخطافات بس وجّهه لليوتيوب.' },
      { when: 'يوم النزول', text: 'ستوري بستيكر رابط مباشر، وريل يقصّ أقوى ٣٠–٤٥ ثانية وينتهي بـ«الشرح الكامل على اليوتيوب، الرابط بالبايو/الستوري». وتحدّث رابط البايو للفيديو الجديد.' },
      { when: 'بعد ٢٤–٧٢ ساعة', text: 'ستوري تعيد نشر سؤال أو تعليق جاك على الفيديو، وريل ثاني بزاوية مختلفة من نفس الموضوع عشان تمسك اللي ما شافوا الأول.' },
    ],
  },
  {
    name: 'الستوري هايلايتس',
    followers: 'قمع مصغّر',
    icon: Bookmark,
    tactics: [
      { when: 'هايلايت «اليوتيوب»', text: 'عندك هايلايتس ممتازة (مرشد مو مدرب، آراء المتدربين، نتائج، كتيب السعرات). نضيف هايلايت جديد «اليوتيوب» يجمع روابط أهم الفيديوهات الطويلة، فأي زائر جديد لبروفايلك يلقى طريق واضح للعمق.' },
    ],
  },
  {
    name: 'واتساب / برودكاست',
    followers: 'جمهور دافئ',
    icon: MessageCircle,
    tactics: [
      { when: 'يوم النزول', text: 'لو عندك قائمة عملاء أو مهتمين على واتساب، رسالة برودكاست يوم النزول برابط مباشر تجيب مشاهدات مركّزة وسريعة من جمهور دافئ يشوف الفيديو كامل. لو مو موجودة، نبنيها كخطوة لاحقة.' },
    ],
  },
];

interface LeadMagnet {
  name: string;
  format: string;
  who: string;
  why: string;
  connection: string;
  path: string;
}

const leadMagnets: LeadMagnet[] = [
  {
    name: 'كتيب السعرات (موجود)',
    format: 'قالب PDF — نربطه أقوى',
    who: 'من طبّق كتيب السعرات وحسّ إنه يحتاج حد يفصّل على حالته.',
    why: 'الكتيب يعطيه المعرفة، بس هو يكتشف إن التطبيق والالتزام هو الجزء الصعب — واللي يحله الإرشاد الشخصي.',
    connection: 'فيديو السعرات (رقم ٧).',
    path: 'نخليه مخرج ثابت لفيديو السعرات، ونضيف في آخره خطوة تنقل القارئ للمكالمة: «طبّقت الكتيب وحسّيت إنك تحتاج حد يفصّل على حالتك؟ احجز مكالمة».',
  },
  {
    name: 'خطة الـ٣ أيام للموظف المشغول',
    format: 'PDF صفحة–صفحتين',
    who: 'الموظف المقتنع اللي ما يعرف من وين يبدأ ولا كيف يرتّب أسبوعه.',
    why: 'تشيل حيرة «وش أسوّي بالضبط» وتعطيه بداية ملموسة (٣ حصص مقاومة أقل من ساعة).',
    connection: 'فيديو الـ٣ أيام (٩) + «وزنك يزيد كل ما انشغلت» (١٠).',
    path: 'أول ما يجرّبها يجيه سؤال «هل هذا مضبوط لجسمي أنا ووقتي؟» — والمكالمة هي الجواب.',
  },
  {
    name: 'اختبار: ليش وزنك ما ينزل؟',
    format: 'اختبار قصير / بطاقة تشخيص',
    who: 'المحبط من حلقة «أنحف وأرجع» اللي يبي يفهم وش الخلل عنده بالذات.',
    why: 'جواب مخصّص عن سؤال يقلقه من زمان، والتخصيص يخلق التزام.',
    connection: '«ليش وزنك يرجع» (١) + «لا تصدّق إنك حالة خاصة» (٤).',
    path: 'نتيجة الاختبار تكشف الفجوة (مقاومة؟ سعرات؟ استمرارية؟) وتموضع برنامجك كحل مباشر لها.',
  },
];

const launchWeeks: { week: string; en: string; ar: string; body: string }[] = [
  {
    week: 'الأسبوع الأول',
    en: 'Week 1',
    ar: 'استراتيجية وتجهيز',
    body: 'تثبّت الموضعة (مرشد مو مدرب + مو معضّل)، تختار أول ٤–٦ مواضيع، تسوّي مخطط الـFlywheel، تجهّز إضاءة وكاميرا بسيطة، اتجاه الثمبنيلات والـ SEO، ومخارج الـ CTA (Calendly / الكتيب).',
  },
  {
    week: 'الأسبوع الثاني',
    en: 'Week 2',
    ar: 'تصوير وبناء الأصول',
    body: 'تصوّر دفعة واحدة (batch). تجهّز الثمبنيلات والأوصاف وجدول النزول. تبني كليبات إنستقرام من نفس التصوير عشان يشتغل الجسر من أول يوم.',
  },
  {
    week: 'الأسبوع الثالث',
    en: 'Week 3',
    ar: 'نزول وتوزيع',
    body: 'تنزّل الـFlywheel أو أول فيديو سلطة. تدفع من إنستقرام (ريل + ستوري + تحديث البايو). تثبّت التعليق والـ CTA. تراقب أول المؤشرات: الاحتفاظ (retention)، نسبة النقر (CTR)، والتعليقات.',
  },
  {
    week: 'الأسبوع الرابع',
    en: 'Week 4',
    ar: 'زخم وتحسين',
    body: 'تنزّل الفيديو الثاني والثالث. تستخدم التحليلات تعدّل العناوين والثمبنيلات والمواضيع. تضيف هايلايت «اليوتيوب». وتبدأ تمشّي المؤهلين ناحية المكالمة عبر أتمتة إرشاد.',
  },
];

/* ════════════════════════ Video-ideas accordion ════════════════════════ */
const VideoIdeaCard = ({ idea, isOpen, onToggle }: { idea: VideoIdea; isOpen: boolean; onToggle: () => void }) => (
  <div
    className={`rounded-[1.75rem] border transition-all duration-300 ease-out overflow-hidden ${
      isOpen ? 'bg-white border-red-500/20 shadow-lg' : 'bg-[#FAFAFA] border-black/[0.04] hover:border-red-500/10 hover:shadow-md'
    }`}
  >
    <button onClick={onToggle} className="w-full px-6 md:px-8 py-6 flex items-center gap-4 text-right group" dir="rtl">
      <div className="flex-shrink-0">
        <StageBadge stage={idea.stage} />
      </div>
      <span
        className={`flex-1 font-arabic text-base md:text-lg font-bold leading-relaxed transition-colors duration-300 ${
          isOpen ? 'text-red-500' : 'text-black group-hover:text-red-500'
        }`}
      >
        {idea.title}
      </span>
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${
          isOpen ? 'bg-red-500 rotate-180 shadow-red-500/40' : 'bg-black/[0.04] group-hover:bg-red-500/10'
        }`}
      >
        {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-black/40 group-hover:text-red-500" />}
      </div>
    </button>

    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <div className="overflow-hidden">
        <div className="px-6 md:px-8 pb-8" dir="rtl">
          <div className="w-full h-px bg-black/[0.05] mb-6" />
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 font-arabic text-right">
            {[
              { label: 'الزاوية', value: idea.angle },
              { label: 'نية المشاهد', value: idea.intent },
              { label: 'الفكرة', value: idea.premise },
              { label: 'الصورة المصغرة', value: idea.thumbnail },
            ].map((row) => (
              <div key={row.label}>
                <p className="font-arabic text-lg md:text-xl font-bold text-red-500 mb-2">{row.label}</p>
                <p className="text-sm md:text-base text-black/60 leading-relaxed font-medium">{row.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="font-arabic text-lg md:text-xl font-bold text-red-500 mb-2">أفضل إجراء (CTA)</p>
            <p className="font-arabic text-sm md:text-base text-black/60 leading-relaxed font-medium">{idea.cta}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VideoIdeasAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filter, setFilter] = useState<'ALL' | Stage>('ALL');

  const filters: ('ALL' | Stage)[] = ['ALL', 'TOF', 'MOF', 'BOF'];
  const filtered = videoIdeas
    .map((idea, i) => ({ idea, i }))
    .filter(({ idea }) => filter === 'ALL' || idea.stage === filter);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 border ${
              filter === f
                ? 'bg-black text-white border-black shadow-lg'
                : 'bg-white text-black/40 border-black/[0.06] hover:border-red-500/30 hover:text-red-500'
            }`}
          >
            {f === 'ALL' ? `All · ${videoIdeas.length}` : f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 max-w-4xl mx-auto">
        {filtered.map(({ idea, i }) => (
          <VideoIdeaCard key={i} idea={idea} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
        ))}
      </div>
    </div>
  );
};

/* ════════════════════════ Main section ════════════════════════ */
const SalahStrategyContent = () => {
  const scrollToBookCall = () => document.querySelector('#book-call')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="strategy" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 strat-reveal">
          <Eyebrow>Your Custom Game Plan</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-6">
            The 90-Day YouTube <span className="text-red-500">Sales Engine</span>
          </h2>
          <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-medium">
            A complete organic system that turns your existing influence into qualified, pre-sold calls.
          </p>
        </div>

        {/* 1 — Executive summary */}
        <div className={`${CARD} p-8 md:p-12 lg:p-16 mb-10 strat-reveal`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="h-px w-10 bg-red-500/40" />
              <Eyebrow>Why YouTube Makes Sense for Your Business</Eyebrow>
              <span className="h-px w-10 bg-red-500/40" />
            </div>
            <div className="arabic-prose space-y-6 text-base md:text-lg text-black/70">
              {execParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <ul className="space-y-3">
                {execOutcomes.map((o) => (
                  <li key={o.title} className="flex items-start gap-3 flex-row-reverse text-right">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span>
                      <span className="font-bold text-black">{o.title}</span> — {o.desc}
                    </span>
                  </li>
                ))}
              </ul>
              {execClosing.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 2 — The 90-day funnel (TOF/MOF/BOF) */}
        <div className="mb-10">
          <div className="text-center mb-10 strat-reveal">
            <Eyebrow>The 90-Day Organic Sales Funnel</Eyebrow>
            <p className="arabic-prose !text-center text-base md:text-lg text-black/50 max-w-3xl mx-auto">
              عندك أجزاء شغّالة متفرّقة — ريلز، كتيب سعرات، أتمتة إرشاد، فيديوهات يوتيوب. القمع يربطها كسلسلة تسليم، مو صناديق منفصلة، ويأخذ
              المشاهد من مرحلة الانتباه إلى قرار الحجز.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {funnelStages.map((s) => (
              <div key={s.stage} className={`${CARD} p-8 md:p-10 strat-reveal`}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-5xl font-black text-black/[0.08] leading-none">{s.num}</span>
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-black/[0.03] flex items-center justify-center group-hover:bg-red-500 transition-colors duration-500">
                    <s.icon className="w-6 h-6 text-red-500 group-hover:text-white transition-colors duration-500" strokeWidth={1.75} />
                  </div>
                </div>
                <div className="mb-4">
                  <StageBadge stage={s.stage} />
                </div>
                <h3 className="text-2xl font-black text-black mb-1">{s.en}</h3>
                <p className="font-arabic text-lg font-bold text-red-500 mb-4">{s.ar}</p>
                <p className="arabic-prose text-sm md:text-base text-black/60">{s.body}</p>
              </div>
            ))}
          </div>

          <div className={`${CARD} p-8 md:p-10 mt-8 strat-reveal`}>
            <p className="arabic-prose !text-center text-base md:text-lg text-black/70 max-w-4xl mx-auto">
              ريل إنستقرام يجيب الانتباه ← يوجّه للفيديو الطويل (بايو أو ستوري بستيكر رابط) ← الفيديو يبني الاقتناع ويعطي قيمة كاملة ← في نهايته
              المشاهد يحجز. بالتوازي، اليوتيوب يسحب جمهور بحث جديد يدخل نفس المسار. كل قطعة تسلّم للي بعدها، والمكالمة تصير آخر خطوة طبيعية مو
              قفزة. المخرج واحد دايماً: حجز مكالمة (Calendly).
            </p>
          </div>
        </div>

        {/* 3 — Video ideas */}
        <div className="mb-10 strat-reveal">
          <div className="text-center mb-10">
            <Eyebrow>14 High-Converting Video Ideas</Eyebrow>
            <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight mb-4">
              Titles Built for <span className="text-red-500">Your Voice</span>
            </h3>
            <p className="arabic-prose !text-center text-base text-black/50 max-w-2xl mx-auto">
              بنيتها على خطافاتك الشغّالة على إنستقرام، بس بصيغة يوتيوب طويلة تحوّل الانتباه لاقتناع. عناوين بلهجتك، جاهزة تصوّرها زي ما هي.
            </p>
          </div>
          <VideoIdeasAccordion />
        </div>

        {/* 4 — Flywheel VSL (dark highlight card) */}
        <div className="strat-reveal mb-10 relative rounded-[2.5rem] md:rounded-[3rem] bg-black text-white p-8 md:p-14 lg:p-16 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="absolute -top-24 -right-24 hidden md:block w-80 h-80 bg-red-500/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 hidden md:block w-80 h-80 bg-red-500/20 blur-[100px] rounded-full" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <RefreshCw className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">The Flywheel VSL Strategy</span>
            </div>

            {/* Video title */}
            <p className="font-arabic text-sm font-bold text-white/40 mb-2 text-right" dir="rtl">عنوان الفيديو</p>
            <h3 className="font-arabic text-xl md:text-2xl font-bold leading-snug mb-8 text-right" dir="rtl">
              الدليل الكامل: كيف تنحف وتثبّت وزنك وانت موظف مشغول (بدون رجيم قاسي ولا كارديو ساعات)
            </h3>

            {/* Format — highlighted callout */}
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 md:p-6 mb-10 text-right" dir="rtl">
              <p className="font-arabic text-lg md:text-xl font-bold text-red-500 mb-2">الصيغة</p>
              <p className="font-arabic text-sm md:text-base text-white/80 leading-relaxed">{vslFormat}</p>
            </div>

            {/* Meta grid */}
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6" dir="rtl">
              {vslMeta.map((m) => (
                <div key={m.label} className="text-right">
                  <p className="font-arabic text-lg md:text-xl font-bold text-red-500 mb-2">{m.label}</p>
                  <p className="font-arabic text-sm md:text-base text-white/70 leading-relaxed">{m.value}</p>
                </div>
              ))}
            </div>

            {/* طريقة صلاح — 7 pillars */}
            <div className="mt-10 pt-8 border-t border-white/10" dir="rtl">
              <p className="font-arabic text-lg md:text-xl font-bold text-red-500 mb-2 text-right">طريقة صلاح — الركائز السبع</p>
              <p className="font-arabic text-sm text-white/50 leading-relaxed mb-6 text-right">
                الركائز موجودة في محتواك بس متفرّقة — من أول اللي نسوّيه: نعطيها اسم واحد تملكه، فتصير «طريقة صلاح» بدل مجموعة أفكار متناثرة.
              </p>
              <div className="space-y-3">
                {vslPillars.map((p, i) => (
                  <div key={i} className="flex items-start gap-4 text-right">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/15 text-red-500 text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="font-arabic text-sm md:text-base text-white/80 leading-relaxed flex-1">
                      <span className="font-bold text-white">{p.title}</span> — {p.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Structure */}
            <div className="mt-10 pt-8 border-t border-white/10" dir="rtl">
              <p className="font-arabic text-lg md:text-xl font-bold text-red-500 mb-5 text-right">هيكل الفيديو المقترح</p>
              <div className="space-y-3">
                {vslStructure.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 text-right">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/15 text-red-500 text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="font-arabic text-sm md:text-base text-white/80 leading-relaxed flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How the flywheel works */}
            <div className="mt-10 pt-8 border-t border-white/10" dir="rtl">
              <p className="font-arabic text-lg md:text-xl font-bold text-red-500 mb-3 text-right">كيف يعمل الـ Flywheel (محرّك النمو والتحويل)</p>
              <p className="font-arabic text-sm md:text-base text-white/70 leading-relaxed mb-6 text-right">{flywheelIntro}</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {flywheelMechanism.map((pt, i) => (
                  <div key={i} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 text-right">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <p className="font-arabic text-base md:text-lg font-bold text-white">{pt.label}</p>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/15 text-red-500 text-[11px] font-black flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <p className="font-arabic text-sm text-white/60 leading-relaxed">{pt.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 text-right" dir="rtl">
              <span className="font-arabic text-sm text-white/50">الإجراء المطلوب:</span>
              <span className="font-arabic text-sm md:text-base font-bold text-white">
                احجز مكالمة — بلا ضغط، لأن الفيديو نفسه أعطى قيمة كاملة.
              </span>
            </div>
          </div>
        </div>

        {/* 5 — Audience funneling */}
        <div className="mb-10">
          <div className="text-center mb-10 strat-reveal">
            <Eyebrow>Audience Funneling Strategy</Eyebrow>
            <p className="arabic-prose !text-center text-base md:text-lg text-black/50 max-w-3xl mx-auto">
              إنستقرام (٦١ ألف متابع) هو المحرّك الأساسي، ريلز يومية شغّالة، أتمتة ManyChat على كلمة «إرشاد»، ورابط بايو يودّي لفيديو يوتيوب. النقص
              مو في الانتباه، بل في إن الجسر من إنستقرام لليوتيوب يشتغل بأعلى تحويل ممكن، وإن اليوتيوب يبني له مصدر مستقل.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {funnelingPlatforms.map((p) => (
              <div key={p.name} className={`${CARD} p-8 md:p-10 strat-reveal`} dir="rtl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-black/[0.03] flex items-center justify-center group-hover:bg-red-500 transition-colors duration-500">
                    <p.icon className="w-6 h-6 text-red-500 group-hover:text-white transition-colors duration-500" strokeWidth={1.75} />
                  </div>
                  <div className="text-right">
                    <h3 className="font-arabic text-xl font-bold text-black">{p.name}</h3>
                    <p className="font-arabic text-sm text-black/40">{p.followers}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  {p.tactics.map((t) => (
                    <div key={t.when} className="text-right">
                      <span className="inline-block font-arabic text-[11px] font-black px-3 py-1 rounded-full bg-red-500/10 text-red-600 mb-2">
                        {t.when}
                      </span>
                      <p className="font-arabic text-sm md:text-base text-black/60 leading-relaxed">{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 — Lead magnets */}
        <div className="mb-10">
          <div className="text-center mb-10 strat-reveal">
            <Eyebrow>3 Strategic Lead Magnet Concepts</Eyebrow>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {leadMagnets.map((lm, i) => (
              <div key={lm.name} className={`${CARD} p-8 md:p-10 flex flex-col strat-reveal`} dir="rtl">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-black/[0.03] flex items-center justify-center group-hover:bg-red-500 transition-colors duration-500">
                    <Magnet className="w-5 h-5 text-red-500 group-hover:text-white transition-colors duration-500" strokeWidth={1.75} />
                  </div>
                  <span className="text-4xl font-black text-black/[0.07] leading-none font-sans">0{i + 1}</span>
                </div>
                <h3 className="font-arabic text-xl font-bold text-black mb-2 text-right">{lm.name}</h3>
                <span className="self-start font-arabic text-[11px] font-bold px-3 py-1 rounded-full bg-black/[0.04] text-black/50 mb-6">
                  {lm.format}
                </span>
                <div className="space-y-4 text-right flex-1">
                  {[
                    { label: 'لمن هذا؟', value: lm.who },
                    { label: 'لماذا يريدونه؟', value: lm.why },
                    { label: 'الارتباط بالفيديو', value: lm.connection },
                    { label: 'مسار التحويل', value: lm.path },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-black/35 mb-1 font-sans">{row.label}</p>
                      <p className="font-arabic text-sm text-black/60 leading-relaxed">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 — 30-day launch plan */}
        <div className="mb-10">
          <div className="text-center mb-10 strat-reveal">
            <Eyebrow>30-Day Channel Launch Plan</Eyebrow>
            <p className="arabic-prose !text-center text-base md:text-lg text-black/50 max-w-3xl mx-auto">
              مبنية عشان تركّب النظام جنب اللي تسويه، مو تبدأ من الصفر. إنت أصلاً تنزل ريلز — الشغل الجديد هو أصول اليوتيوب والربط.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {launchWeeks.map((w) => (
              <div key={w.en} className={`${CARD} p-7 md:p-8 strat-reveal`} dir="rtl">
                <div className="flex items-center gap-3 mb-5">
                  <CalendarDays className="w-5 h-5 text-red-500" strokeWidth={1.75} />
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-black/40">{w.en}</span>
                </div>
                <h3 className="font-arabic text-lg font-bold text-black mb-1 text-right">{w.week}</h3>
                <p className="font-arabic text-sm font-bold text-red-500 mb-4 text-right">{w.ar}</p>
                <p className="font-arabic text-sm text-black/60 leading-relaxed text-right">{w.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 8 — What SpaceLeads handles */}
        <div className={`${CARD} p-8 md:p-12 lg:p-16 strat-reveal`} dir="rtl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white shadow-sm border border-black/[0.03] flex items-center justify-center">
              <Cog className="w-8 h-8 text-red-500" strokeWidth={1.5} />
            </div>
            <p className="font-sans text-xs uppercase tracking-[0.4em] font-bold text-black/40 mb-6">What SpaceLeads Handles</p>
            <p className="arabic-prose !text-center text-base md:text-lg text-black/70 mb-6">
              نحن في SpaceLeads نتولّى بناء هذا النظام وإدارته بالكامل: من وضع الاستراتيجية وبحث المواضيع وصياغة العناوين وتوجيه هيكلة
              الفيديوهات، وصولاً إلى الإشراف على التحرير (Editing) وتصميم الصور المصغّرة وتحسين محركات البحث (SEO) وبناء مسارات التحويل
              (Funnels) التي تنقل المشاهد من يوتيوب إلى مكالمة المبيعات.
            </p>
            <p className="arabic-prose !text-center text-lg md:text-xl font-bold text-black">
              كل ما عليك هو التركيز على خبرتك والوقوف أمام الكاميرا.
            </p>
          </div>
        </div>

        {/* 9 — Next step bridge into Calendly */}
        <div className="text-center mt-16 strat-reveal" dir="rtl">
          <p className="arabic-prose !text-center text-base md:text-lg text-black/60 max-w-3xl mx-auto mb-4">
            يوتيوب مو بس منصة نشر؛ هو الأصل اللي يحوّل انتباهك الحالي على إنستقرام إلى نظام عملاء دائم — يبني الثقة، يؤهّل، ويجهّز المتردد قبل ما
            يوصلك.
          </p>
          <p className="arabic-prose !text-center text-base md:text-lg text-black/60 max-w-3xl mx-auto mb-10">
            عشان نرسم لك مسار التنفيذ الأوضح لـ B.Fit وبرنامج الإرشاد في ١٢ أسبوع، احجز مكالمة استراتيجية مجانية.
          </p>
          <button
            onClick={scrollToBookCall}
            className="cool-button group relative inline-flex justify-center items-center gap-4 bg-black text-white px-12 py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(239,68,68,0.5)] hover:scale-[1.02] transition-all duration-500"
            dir="ltr"
          >
            <span className="relative z-10">Book Your Free Strategy Call</span>
            <ArrowLeft className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:-translate-x-2" />
          </button>
        </div>
      </div>

      {/* Background accents */}
      <div className="absolute top-1/4 left-0 hidden md:block w-72 h-72 bg-red-500/5 blur-[120px] rounded-full -ml-36 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 hidden md:block w-72 h-72 bg-red-500/5 blur-[120px] rounded-full -mr-36 pointer-events-none" />
    </section>
  );
};

export default SalahStrategyContent;
