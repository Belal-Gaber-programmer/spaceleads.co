import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Plus,
  Minus,
  Search,
  ShieldCheck,
  Target,
  Instagram,
  Music2,
  Magnet,
  CalendarDays,
  Cog,
  ArrowLeft,
  PlayCircle,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

/* ════════════════════════ DATA — transcribed verbatim from strategy doc ════════════════════════ */

const funnelStages: { stage: Stage; num: string; en: string; ar: string; icon: typeof Search; body: string }[] = [
  {
    stage: 'TOF',
    num: '01',
    en: 'Discovery',
    ar: 'الاكتشاف',
    icon: Search,
    body: `في هذه المرحلة، نستهدف الأشخاص الذين يبحثون عن حلول لمشاكلهم المالية والمهنية، لكنهم قد لا يعرفون بعد مصطلح "High-Ticket Closing". نركز على آلامهم الحقيقية: الرغبة في بناء دخل من المنزل، الإحباط من المشاريع التي تتطلب رأس مال كبير، أو البحث عن مهارات عالية القيمة. الهدف هنا هو جذب المشاهد الصحيح من خلال العناوين التي تلامس واقعه مباشرة.`,
  },
  {
    stage: 'MOF',
    num: '02',
    en: 'Trust & Education',
    ar: 'الثقة والتثقيف',
    icon: ShieldCheck,
    body: `هنا نبدأ في تغيير قناعات المشاهد. نشرح له لماذا الطرق التقليدية (مثل بدء مشروع بدون خبرة) تفشل، وكيف أن إتقان سيكولوجية البيع والإقناع هو الحل الجذري. في هذه المرحلة، نستعرض منهجية "إيليت"، نشرح قواعد المبيعات التي غيّرت حياتك، ونبني سلطتك كأول مدربة عربية متخصصة في هذا المجال. هذا المحتوى يجهز المشاهد نفسياً وعقلياً للخطوة التالية.`,
  },
  {
    stage: 'BOF',
    num: '03',
    en: 'Conversion',
    ar: 'التحويل',
    icon: Target,
    body: `هذه هي مرحلة الحصاد. الفيديوهات هنا موجهة للأشخاص الذين يمتلكون نية عالية للشراء. نعالج فيها الاعتراضات الشائعة (مثل "هل هذا المجال مناسب لي؟" أو "هل السعر مبرر؟")، ونستعرض قصص نجاح حقيقية لطلاب حققوا بين ٢٠٠٠ إلى ٧٠٠٠ دولار. الهدف المباشر من هذه الفيديوهات هو توجيه المشاهد المؤهل لحجز استشارة فردية أو شراء تذكرة لحدث "الرؤية".`,
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
    title: 'ليش الشغل الأونلاين ما عم يظبط معك؟ (السر اللي ما حدا بيحكيه)',
    angle: 'كشف الخطأ الشائع في البدء بمشاريع بدون مهارة حقيقية.',
    intent: 'يبحث عن سبب فشل محاولاته السابقة لزيادة دخله.',
    premise: 'شرح لماذا يحتاج الشخص لمهارة عالية القيمة قبل التفكير في المنتجات أو رأس المال.',
    thumbnail: 'صورتك بتعبير جاد مع نص: "الخطأ الأكبر".',
    cta: 'الاشتراك لمزيد من الفيديوهات التعليمية.',
  },
  {
    stage: 'TOF',
    title: 'كيف تعمل دخل من البيت بدون رأس مال (دليل مهارة الـ High-Ticket)',
    angle: 'تقديم الحل العملي والمباشر للرغبة في الاستقلال المالي.',
    intent: 'يبحث عن طرق حقيقية للعمل من المنزل.',
    premise: 'مقدمة شاملة عن مفهوم مبيعات التذاكر العالية وكيف يمكن لأي شخص تعلمها.',
    thumbnail: 'صورة تظهرك تشرحين على لوح مع نص: "بدون رأس مال".',
    cta: 'تحميل دليل الدخول لعالم الـ High-Ticket.',
  },
  {
    stage: 'TOF',
    title: '٣ مهارات مطلوبة بالسوق رح تغيّر واقعك المالي بـ ٢٠٢٦',
    angle: 'استغلال الرغبة في مواكبة التطورات المهنية.',
    intent: 'يبحث عن المهارات التي تضمن له مستقبلاً مالياً آمناً.',
    premise: 'تسليط الضوء على المبيعات والإقناع كأهم مهارة لا يمكن استبدالها.',
    thumbnail: 'نص بارز: "مهارات ٢٠٢٦" مع خلفية احترافية.',
    cta: 'مشاهدة فيديو يشرح مهارة الإغلاق بالتفصيل.',
  },
  {
    stage: 'TOF',
    title: 'ليش التشتت عم يخليك تخسر مصاري كل يوم؟ وكيف توقفه',
    angle: 'معالجة مشكلة عقلية وذهنية تؤثر على الأداء المالي.',
    intent: 'يشعر بالضياع بين الفرص الكثيرة ويبحث عن التركيز.',
    premise: 'ربط التشتت بضياع الفرص المالية، وتقديم استراتيجية للتركيز على مهارة واحدة.',
    thumbnail: 'صورة تظهرك في لحظة تركيز مع نص: "وقف خسارة".',
    cta: 'الاشتراك في القناة.',
  },
  {
    stage: 'MOF',
    title: 'سيكولوجية العميل: ليش الزبون بيقول "غالي" وكيف ترد عليه؟',
    angle: 'الغوص في عمق سيكولوجية المبيعات التي تتقنينها.',
    intent: 'يريد معرفة كيفية التعامل مع أصعب اعتراض في المبيعات.',
    premise: 'تفكيك اعتراض السعر وكيفية تحويله إلى فرصة لإظهار القيمة الحقيقية.',
    thumbnail: 'نص: "قال غالي؟" مع تعبير واثق.',
    cta: 'مشاهدة فيديو عن أخطاء الإغلاق.',
  },
  {
    stage: 'MOF',
    title: 'الفرق بين المبيعات العادية ومبيعات التذاكر العالية (High-Ticket)',
    angle: 'بناء السلطة وشرح آليتك الخاصة.',
    intent: 'يريد فهم الفرق ولماذا يجب أن يركز على الـ High-Ticket.',
    premise: 'شرح كيف أن الـ High-Ticket يعتمد على حل المشاكل العميقة وليس مجرد الدفع.',
    thumbnail: 'مقارنة بصرية بسيطة بين مبيعات عادية وعالية.',
    cta: 'حجز مكالمة استشارية.',
  },
  {
    stage: 'MOF',
    title: 'كيف تقنع أي شخص بأي شي (بدون ما تكون بياع مزعج)',
    angle: 'كسر الصورة النمطية السلبية عن البائعين.',
    intent: 'يريد تعلم الإقناع دون الشعور بالإحراج.',
    premise: 'تقديم إطار عمل للإقناع يعتمد على الاستماع وطرح الأسئلة العميقة.',
    thumbnail: 'نص: "سر الإقناع" مع ابتسامة واثقة.',
    cta: 'تحميل سكريبت الإغلاق السري.',
  },
  {
    stage: 'MOF',
    title: 'قصة الـ ٥ مليون دولار: كيف بنيت فريق مبيعات حقق هيدا الرقم',
    angle: 'الإثبات الاجتماعي وبناء السلطة المطلقة.',
    intent: 'فضول لمعرفة كيف تم تحقيق هذا الرقم الضخم.',
    premise: 'استعراض رحلتك وكيف قمتِ بتدريب فريق لتحقيق نتائج استثنائية.',
    thumbnail: 'نص: "٥ مليون دولار بسنة" مع صورة احترافية.',
    cta: 'التسجيل في الماستر كلاس القادم.',
  },
  {
    stage: 'MOF',
    title: 'العميل ناطرك تاخد القرار عنه: كيف تقفل الصفقة بثقة',
    angle: 'التوسع في واحدة من أقوى أفكارك على إنستغرام.',
    intent: 'يريد معرفة اللحظة الحاسمة في إغلاق الصفقة.',
    premise: 'شرح كيف أن القيادة في المكالمة هي ما يحتاجه العميل لاتخاذ القرار.',
    thumbnail: 'نص: "القرار بيدك" مع لقطة من مؤتمر.',
    cta: 'حجز مكالمة لمعرفة المزيد عن البرنامج.',
  },
  {
    stage: 'MOF',
    title: 'ليش الـ Storytelling بيبيع أكتر من الأرقام؟ (Fact tells, story sells)',
    angle: 'تعليم تقنية متقدمة في المبيعات.',
    intent: 'يبحث عن طرق لجعل عروضه أكثر جاذبية.',
    premise: 'كيفية بناء قصة مقنعة تلامس مشاعر العميل وتدفعه للشراء.',
    thumbnail: 'نص: "القصة تبيع" مع صورة تعبيرية.',
    cta: 'مشاهدة فيديو سيكولوجية العميل.',
  },
  {
    stage: 'BOF',
    title: 'كيف طلاب برنامج Elite Sales Mastery عم يعملوا بين ٢٠٠٠ و ٧٠٠٠ دولار',
    angle: 'استعراض النتائج الحقيقية لبرنامجك.',
    intent: 'يبحث عن إثبات أن البرنامج يعمل لأشخاص مثله.',
    premise: 'استعراض قصص نجاح الطلاب وكيف طبقوا المهارة لتحقيق دخل حقيقي.',
    thumbnail: 'نص: "نتائج حقيقية" مع صور مصغرة للطلاب.',
    cta: 'حجز مكالمة استشارية للبرنامج.',
  },
  {
    stage: 'BOF',
    title: 'هل مهارة الـ High-Ticket Closing مناسبة إلك؟ (دليل كامل)',
    angle: 'فلترة وتأهيل العملاء المحتملين.',
    intent: 'يريد التأكد من أن هذا المجال يناسب شخصيته وظروفه.',
    premise: 'تفصيل من هو الشخص المناسب لهذه المهارة ومن يجب أن يبتعد عنها.',
    thumbnail: 'نص: "هل هالمجال إلك؟" مع تعبير جاد.',
    cta: 'تقييم مهاراتك في المبيعات (Scorecard).',
  },
];

const vslStructure: string[] = [
  'الخطاف (Hook): طرح المشكلة مباشرة (التشتت والبحث عن فرصة حقيقية بدون تعقيدات المشاريع).',
  'تكلفة البقاء في نفس المكان: ماذا يحدث إذا استمريت في تجربة كل شيء بدون إتقان مهارة واحدة؟',
  'القناعة الجديدة: المبيعات الحديثة (High-Ticket) هي المهارة الوحيدة التي تمنحك القوة لصناعة الفرص.',
  'الإطار العملي: شرح مبسط لمنهجية الإغلاق وبناء القيمة.',
  'الإثبات: الإشارة إلى الـ ٤٠٠٠ متدرب، ونتائج طلاب برنامج "إيليت".',
  'دعوة ناعمة للإجراء: توجيه المشاهد المؤهل لاتخاذ الخطوة التالية.',
];

const vslMeta: { label: string; value: string }[] = [
  { label: 'الوعد الأساسي', value: 'كيف تبني دخلاً حقيقياً ومستقلاً من المنزل، بدون رأس مال أو منتج، من خلال إتقان مهارة الإغلاق عالية القيمة.' },
  { label: 'الهدف الاستراتيجي', value: 'هذا الفيديو هو "الجندي المجهول" الذي يعمل على مدار الساعة؛ فهو يثقّف العميل البارد، ويكسر حواجزه الذهنية، ويثبت سلطتك، ويؤهله تماماً قبل أن يحجز مكالمة المبيعات.' },
  { label: 'المشكلة التي يعالجها', value: 'الإرهاق من محاولة بدء مشاريع تجارية معقدة، التشتت بين الفرص الكثيرة، والشعور بالإحباط من عدم القدرة على تحقيق دخل ثابت رغم الجهد المبذول.' },
  { label: 'الآلية الفريدة', value: 'منهجية "إيليت سايلز ماستري" التي تعتمد على سيكولوجية البيع، الاستماع العميق، وحل المشاكل بدلاً من أساليب الضغط التقليدية.' },
];

const funnelingPlatforms: { name: string; followers: string; icon: typeof Instagram; tactics: { when: string; text: string }[] }[] = [
  {
    name: 'إنستغرام',
    followers: '٢١٤ ألف متابع',
    icon: Instagram,
    tactics: [
      { when: 'قبل النشر', text: 'استخدام الـ Stories لمشاركة كواليس تصوير فيديو يوتيوب القادم، مع طرح سؤال تفاعلي (Poll) حول موضوع الفيديو (مثلاً: "مين بيعاني من اعتراض السعر؟").' },
      { when: 'يوم النشر', text: 'نشر Reel قصير يقتطع أقوى لحظة أو "صدمة ذهنية" من فيديو يوتيوب، مع توجيه واضح في النهاية: "الرابط بالبايو لتحضروا الشرح الكامل".' },
      { when: 'بعد ٤٨ ساعة', text: 'استخدام الـ Broadcast Channel لمشاركة رسالة صوتية سريعة تشرح فكرة إضافية لم تُذكر في الفيديو، مع وضع رابط الفيديو للمزيد من التفاصيل.' },
    ],
  },
  {
    name: 'تيك توك',
    followers: '٧٣.٥ ألف متابع',
    icon: Music2,
    tactics: [
      { when: 'يوم النشر', text: 'نشر مقطع مدته ٦٠ ثانية يركز على المشكلة والحل بشكل سريع، مع تثبيت تعليق (Pinned Comment) يوجه المتابعين إلى رابط قناة يوتيوب في البايو لمشاهدة التدريب الكامل.' },
      { when: 'التفاعل', text: 'الرد على أسئلة المتابعين في تيك توك بتوجيههم لمشاهدة فيديو يوتيوب الذي يجيب على أسئلتهم بالتفصيل.' },
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
    name: 'سكريبت الإغلاق السري',
    format: 'قالب PDF عملي',
    who: 'الأشخاص الذين يواجهون صعوبة في الرد على الاعتراضات.',
    why: 'يوفر لهم إجابات جاهزة ومدروسة نفسياً للتعامل مع العملاء.',
    connection: 'كيف تقنع أي شخص بأي شي.',
    path: 'بعد تحميل السكريبت، يتلقون سلسلة إيميلات تشرح أن السكريبت أداة، لكن "الاحتراف" يحتاج لتدريب، مع رابط لحجز مكالمة.',
  },
  {
    name: 'تقييم مهاراتك في المبيعات',
    format: 'اختبار قصير (Scorecard)',
    who: 'المبتدئون الذين يتساءلون إذا كان المجال يناسبهم.',
    why: 'يعطيهم وضوحاً حول نقاط قوتهم وضعفهم في التواصل.',
    connection: 'هل مهارة الـ High-Ticket Closing مناسبة إلك؟',
    path: 'النتيجة تخبرهم بمستواهم الحالي، وتعرض عليهم حجز مكالمة لمناقشة خطة تطوير مخصصة.',
  },
  {
    name: 'دليل الدخول لعالم الـ High-Ticket',
    format: 'فيديو تدريبي قصير + قائمة تحقق',
    who: 'المهتمون بزيادة الدخل من المنزل بدون خبرة سابقة.',
    why: 'يختصر عليهم الطريق ويوضح لهم الخطوات الأولى للبدء.',
    connection: 'كيف تعمل دخل من البيت بدون رأس مال.',
    path: 'الفيديو التدريبي ينتهي بدعوة مباشرة للتقديم على برنامج "إيليت".',
  },
];

const launchWeeks: { week: string; en: string; ar: string; body: string }[] = [
  {
    week: 'الأسبوع الأول',
    en: 'Week 1',
    ar: 'الاستراتيجية والتحضير',
    body: 'التركيز على تحديد أول ٤ مواضيع للفيديوهات (مزيج من الاكتشاف والثقة). يتم وضع الهيكل الأساسي لفيديو الـ Flywheel VSL. تحضير مساحة التصوير، الاتفاق على أسلوب الصور المصغرة (Thumbnails)، وتجهيز فكرة الـ Lead Magnet الأول.',
  },
  {
    week: 'الأسبوع الثاني',
    en: 'Week 2',
    ar: 'التصوير وتجهيز الأصول',
    body: 'تصوير الفيديوهات الأربعة في جلسة واحدة (Batch Recording) لتوفير الوقت. بينما يتم تحرير الفيديوهات، يتم تجهيز الصور المصغرة، كتابة العناوين المحسنة للبحث (SEO)، وتجهيز المحتوى القصير الذي سيُنشر على إنستغرام وتيك توك للترويج.',
  },
  {
    week: 'الأسبوع الثالث',
    en: 'Week 3',
    ar: 'الإطلاق والتوزيع',
    body: 'نشر فيديو الـ Flywheel VSL أو أول فيديو يبني السلطة. توجيه الجمهور من إنستغرام وتيك توك لمشاهدته. تثبيت التعليقات التي تحتوي على دعوات الإجراء (CTAs). مراقبة التفاعل الأولي والرد على التعليقات الاستراتيجية.',
  },
  {
    week: 'الأسبوع الرابع',
    en: 'Week 4',
    ar: 'الزخم والتحسين',
    body: 'نشر الفيديو الثاني والثالث. استخدام بيانات المشاهدة لتحسين عناوين الفيديوهات القادمة. تفعيل الـ Lead Magnet وبدء جمع بيانات المهتمين، وتوجيه المشاهدين المؤهلين نحو حجز مكالمات استشارية للبرنامج.',
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
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-1.5">{row.label}</p>
                <p className="text-sm md:text-base text-black/60 leading-relaxed font-medium">{row.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/[0.07] border border-red-500/15">
            <PlayCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="font-arabic text-sm font-bold text-red-600">{idea.cta}</span>
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
const StrategyContent = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.strat-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToBookCall = () => document.querySelector('#book-call')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="strategy" ref={sectionRef} className="relative py-24 md:py-32 bg-white overflow-hidden">
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
              <p>
                يتّضح من محتواك الحالي ومن النجاح الضخم الذي حققته على منصات مثل إنستغرام (٢١٤ ألف متابع) وتيك توك (أكثر من ٧٣ ألف متابع)، أن
                علامتك التجارية مبنية بالكامل على الثقة والسلطة والنتائج الحقيقية. أنتِ لا تبيعين مجرد معلومات؛ أنتِ تبيعين تحولاً جذرياً يتمثل
                في إتقان مهارة الـ High-Ticket Sales، عبر برنامج "Elite Sales Mastery".
              </p>
              <p>
                المحتوى القصير (Short-form) الذي تقدمينه ممتاز في جذب الانتباه وبناء الوعي الأولي. الفيديوهات التي تشرح سيكولوجية العميل
                وتكسر الحواجز الذهنية تجذب مئات الآلاف من المشاهدات. لكن عندما نتحدث عن مبيعات عالية الثمن (High-Ticket)، فإن الانتباه السريع
                لا يكفي وحده لإغلاق صفقة. فالعميل المحتمل الذي يكتشفك عبر فيديو مدته ٦٠ ثانية على تيك توك يحتاج إلى مساحة أعمق يفهم فيها
                المنهجية، ويرى الإثباتات، ويبني ثقة كافية قبل أن يقرر استثمار مئات أو آلاف الدولارات في تدريبك.
              </p>
              <p>
                الفرصة الأوضح هنا هي غياب مكتبة ثقة دائمة (Evergreen Trust Library). فحالياً، المسار الوحيد لتعميق العلاقة مع العميل يمرّ عبر
                تحديات البث المباشر (مثل الماستر كلاس) أو صفحات البيع المباشرة. وهنا تحديداً يبرز دور يوتيوب كحلقة مفقودة تحوّل خبرتك في الإقناع
                وسيكولوجية البيع إلى أصول لا تنتهي صلاحيتها. فهو ليس منصة لمطاردة المشاهدات السريعة، بل أداة بيع تعمل بصمت على فلترة العملاء
                المحتملين وتثقيفهم وإقناعهم قبل أن يصلوا إلى مكالمة المبيعات أو صفحة الدفع، فتجذب الأشخاص المناسبين وتؤهلهم وتحوّلهم مع مرور الوقت.
              </p>
            </div>
          </div>
        </div>

        {/* 2 — The 90-day funnel (TOF/MOF/BOF) */}
        <div className="mb-10">
          <div className="text-center mb-10 strat-reveal">
            <Eyebrow>The 90-Day Organic Sales Funnel</Eyebrow>
            <p className="arabic-prose !text-center text-base md:text-lg text-black/50 max-w-3xl mx-auto">
              لبناء محرك مبيعات متكامل عبر يوتيوب، لا يمكننا الاعتماد على نشر محتوى عشوائي. الاستراتيجية تعتمد على مسار واضح يأخذ المشاهد من
              مرحلة الاكتشاف إلى مرحلة اتخاذ القرار.
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
              هذه الطبقات الثلاث تعمل معاً كنظام مبيعات واحد؛ ففيديوهات الاكتشاف تجلب دماً جديداً، وفيديوهات الثقة تبني العلاقة، وفيديوهات
              التحويل تغلق الصفقة، تماماً كما تفعلين في مكالمات المبيعات، ولكن على نطاق واسع ومستمر.
            </p>
          </div>
        </div>

        {/* 3 — 12 video ideas */}
        <div className="mb-10 strat-reveal">
          <div className="text-center mb-10">
            <Eyebrow>12 High-Converting Video Ideas</Eyebrow>
            <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight mb-4">
              Titles Built for <span className="text-red-500">Your Voice</span>
            </h3>
            <p className="arabic-prose !text-center text-base text-black/50 max-w-2xl mx-auto">
              تم تصميم هذه الأفكار لتناسب أسلوبك المباشر والواثق، مع استخدام المصطلحات التي يتفاعل معها جمهورك.
            </p>
          </div>
          <VideoIdeasAccordion />
        </div>

        {/* 4 — Flywheel VSL (dark highlight card) */}
        <div className="strat-reveal mb-10 relative rounded-[2.5rem] md:rounded-[3rem] bg-black text-white p-8 md:p-14 lg:p-16 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-500/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-500/20 blur-[100px] rounded-full" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <PlayCircle className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">The Flywheel VSL Strategy</span>
            </div>
            <h3 className="font-arabic text-2xl md:text-4xl font-bold leading-snug mb-3 text-right" dir="rtl">
              الدليل الشامل لاحتراف مبيعات التذاكر العالية{' '}
              <span className="text-red-500">(High-Ticket Sales)</span> في ٢٠٢٦
            </h3>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 mt-10" dir="rtl">
              {vslMeta.map((m) => (
                <div key={m.label} className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2 font-sans">{m.label}</p>
                  <p className="font-arabic text-sm md:text-base text-white/70 leading-relaxed">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10" dir="rtl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-5 text-right font-sans">الهيكلية المقترحة</p>
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

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 text-right" dir="rtl">
              <span className="font-arabic text-sm text-white/50">الإجراء المطلوب:</span>
              <span className="font-arabic text-sm md:text-base font-bold text-white">
                حجز مكالمة استشارة مجانية لمناقشة الانضمام لبرنامج Elite Sales Mastery.
              </span>
            </div>
          </div>
        </div>

        {/* 5 — Audience funneling */}
        <div className="mb-10">
          <div className="text-center mb-10 strat-reveal">
            <Eyebrow>Audience Funneling Strategy</Eyebrow>
            <p className="arabic-prose !text-center text-base md:text-lg text-black/50 max-w-3xl mx-auto">
              بناءً على تحليل تواجدك الرقمي، المنصات الأكثر نشاطاً وتأثيراً هي إنستغرام وتيك توك. فيسبوك لا يمثل أولوية حالياً. الهدف هو تحويل
              الانتباه السريع من هذه المنصات إلى مشاهدات طويلة وعميقة على يوتيوب.
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
              خطة واقعية مصممة لمدربة ورائدة أعمال تدير برامج ضخمة ولا تملك الوقت لإدارة التفاصيل التقنية يومياً.
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
              الفيديوهات، وصولاً إلى الإشراف على التحرير (Editing) وتصميم الصور المصغرة وتحسين محركات البحث (SEO) وبناء مسارات التحويل
              (Funnels) التي تنقل المشاهد من يوتيوب إلى مكالمة المبيعات.
            </p>
            <p className="arabic-prose !text-center text-lg md:text-xl font-bold text-black">
              كل ما عليكِ هو التركيز على خبرتك والوقوف أمام الكاميرا.
            </p>
          </div>
        </div>

        {/* 9 — Next step bridge into Calendly */}
        <div className="text-center mt-16 strat-reveal" dir="rtl">
          <p className="arabic-prose !text-center text-base md:text-lg text-black/60 max-w-3xl mx-auto mb-4">
            يوتيوب ليس مجرد منصة لنشر المحتوى؛ إنه الأداة التي ستحوّل تأثيرك الحالي إلى نظام مبيعات دائم يعمل لصالحك، ويثقّف عملاءك، ويؤهلهم
            قبل أن يتحدثوا معك.
          </p>
          <p className="arabic-prose !text-center text-base md:text-lg text-black/60 max-w-3xl mx-auto mb-10">
            لتحديد كيف يمكننا تنفيذ هذه الاستراتيجية بشكل مخصص لبرنامج "إيليت سايلز ماستري" ومؤتمر "الرؤية"، أدعوكِ لحجز مكالمة استراتيجية
            مجانية لنرسم مسار التنفيذ الأوضح لعملك.
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
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-red-500/5 blur-[120px] rounded-full -ml-36 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-red-500/5 blur-[120px] rounded-full -mr-36 pointer-events-none" />
    </section>
  );
};

export default StrategyContent;
