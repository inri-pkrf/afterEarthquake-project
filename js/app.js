/* =====================================================================
   הגדרות — כאן משנים לוגו, ברירות מחדל ותוכן התרחישים
   ===================================================================== */
const CONFIG = {
  logoSrc: "images/logo.png", // נתיב הלוגו. להחלפה: מחליפים את הקובץ images/logo.png או משנים כאן
  timerDefaultOn: true, // האם הטיימר פעיל כברירת מחדל
  hintDurationMs: 6000, // כמה זמן הרמז מהבהב
  countdownSeconds: 120, // זמן הספירה לאחור לכל תרחיש, בשניות
};

/* אזורי לחיצה: [מרכז-X%, מרכז-Y%, רוחב%, גובה%] יחסית לתמונה. אפשר כמה אזורים לאותה סכנה.
   התוכן המקצועי הוא סיכום כללי — יש לאמת מול הנחיות פיקוד העורף העדכניות ונהלי המוסד. */
const LEVELS = {
  high: { label: "סכנה גבוהה" },
  med: { label: "סכנה בינונית" },
};

const SCENARIOS = [
  {
    id: "campus-plaza",
    name: "רחבת הקמפוס",
    image: "images/scenario-1.jpg",
    hazards: [
      {
        id: "cables",
        title: "כבלי חשמל קרועים",
        level: "high",
        areas: [[21, 38, 17, 26]],
        danger:
          "כבל קרוע עלול להישאר תחת מתח גם כשאין ניצוצות והוא נראה תקין. מגע, או קרבה למים ולחפצי מתכת סמוכים, עלולים לגרום להתחשמלות ולשריפה.",
        actions: [
          'אל תתקרבו ואל תיגעו בכבל — גם לא בחפץ "מבודד". שמרו מרחק בטוח.',
          "גדרו או סמנו את האזור והציבו איש צוות שיסיט אנשים.",
          "דווחו מיד לחברת החשמל (103) ולמוקדי החירום (100 / 101 / 102).",
          "אל תנסו לנתק או להזיז כבלים בעצמכם.",
        ],
      },
      {
        id: "glass",
        title: "שברי זכוכית",
        level: "med",
        areas: [
          [27, 72, 26, 11],
          [50, 75, 28, 11],
          [82, 68, 20, 10],
        ],
        danger:
          "שברי חלונות וחזיתות זכוכית פזורים על דרכי המעבר וגורמים לחתכים. בהדהוד (רעידת המשך) עלולים ליפול שברים נוספים מהקומות העליונות.",
        actions: [
          "אל תעמדו ואל תעברו מתחת לחזיתות זכוכית פגועות.",
          "סמנו את האזור והפנו את האנשים למסלול עוקף.",
          "נקו רק לאחר שהאזור אושר, בנעליים סגורות ובכפפות.",
          'פצועים — מד"א 101.',
        ],
      },
      {
        id: "beam",
        title: "אלמנט מתכתי רופף",
        level: "high",
        areas: [[75, 57, 16, 15]],
        danger:
          "קונסטרוקציה או חלק מבנה שנעקרו ונשענים באי-יציבות עלולים ליפול בכל הדהוד ולפגוע במי שנמצא מתחתם.",
        actions: [
          "אל תעמדו, אל תעברו ואל תחנו מתחת לאלמנט.",
          "גדרו אזור ביטחון רחב ומנעו כניסה.",
          "אל תנסו לייצב או לפרק אותו בעצמכם — המתינו לחוות דעת מהנדס וכוחות הצלה.",
          "דווחו על המיקום המדויק.",
        ],
      },
      {
        id: "dust",
        title: "ענן אבק ועשן",
        level: "med",
        areas: [[52, 26, 36, 22]],
        danger:
          "אבק ועשן מעידים על קריסה, שריפה או נזק במבנה. הם פוגעים בראייה ובנשימה ומסתירים סכנות נוספות.",
        actions: [
          "התרחקו מהענן, רצוי נגד כיוון הרוח.",
          "כסו אף ופה בבד לח וסייעו לאנשים עם קשיי נשימה.",
          "אם יש ריח גז — אל תפעילו חשמל או אש והתרחקו מיד.",
          "דווחו למוקד כבאות והצלה (102).",
        ],
      },
      {
        id: "slab",
        title: "גושי בטון והריסות",
        level: "med",
        areas: [[12, 80, 20, 9]],
        danger:
          "פסולת וגושי בטון חוסמים צירי פינוי, גורמים למעידות ופציעות, ועלולים להסתיר אנשים לכודים.",
        actions: [
          "פתחו ושמרו על צירי מילוט חלופיים וסמנו אותם.",
          "אל תזיזו גושים כבדים בעצמכם.",
          "אם יש חשד ללכודים — דווחו לכוחות ההצלה ואל תיכנסו לערימה לא יציבה.",
          "הציבו מכוונים בצמתים.",
        ],
      },
      {
        id: "tree",
        title: "עץ וענפים שקרסו",
        level: "med",
        areas: [[91, 58, 14, 13]],
        danger:
          "עץ שנעקר חוסם מעבר, ולעיתים נשען על כבלי חשמל או על מבנה ויוצר סכנת מתח או קריסה נוספת.",
        actions: [
          "בדקו אם הוא נוגע בכבלים לפני כל התקרבות — אם כן, התייחסו לכל כבל כאל חי.",
          "אל תנסו לחתוך או להזיז אותו.",
          "סמנו את האזור והסיטו את התנועה.",
          "דווחו לרשות המקומית ולחברת החשמל.",
        ],
      },
    ],
  },
  {
    id: "building-passage",
    name: "מעבר בין מבנים",
    image: "images/scenario-2.jpg",
    hazards: [
      {
        id: "cables2",
        title: "כבלים תלויים מעל המעבר",
        level: "high",
        areas: [
          [33, 22, 18, 26],
          [42, 50, 22, 14],
        ],
        danger:
          "כבלים שקרסו נמוך מעל נתיב ההליכה עלולים לגעת בעוברים או להישאר תחת מתח. במעבר מקורה קשה לראות אותם.",
        actions: [
          "אל תעברו מתחתם.",
          "חסמו את המעבר בשני קצותיו והציבו מכוון.",
          "הניחו שהכבלים תחת מתח ודווחו לחברת החשמל (103).",
          "נתבו את האנשים לציר חלופי.",
        ],
      },
      {
        id: "facade",
        title: "סדק וחלק שנתלש בחזית",
        level: "high",
        areas: [[68, 14, 11, 15]],
        danger:
          "סדקים וחלקי חיפוי שנתלשו מצביעים על פגיעה מבנית. בהדהוד עלולים ליפול חלקים מהחזית על מי שעובר בצמוד לבניין.",
        actions: [
          "התרחקו מקירות הבניין והרחיקו אנשים.",
          "אל תיכנסו לבניין ללא אישור מהנדס מבנים או כוחות הצלה.",
          "סמנו גבול ביטחון סביב החזית הפגועה.",
          "דווחו על המיקום המדויק — פיקוד העורף (104).",
        ],
      },
      {
        id: "glass2",
        title: "שברי זכוכית על הרצפה",
        level: "med",
        areas: [
          [47, 75, 24, 11],
          [65, 82, 30, 12],
        ],
        danger:
          "שברי זכוכית חדים פזורים על דרך ההליכה וגורמים לחתכים, במיוחד למי שהולך בנעליים פתוחות או נמלט בבהלה.",
        actions: [
          "סמנו את האזור והפנו את התנועה לציר נקי.",
          "אל תלכו יחפים או בסנדלים.",
          "נקו רק לאחר אישור האזור, בכפפות ובנעליים סגורות.",
          'טפלו בחתכים או הזעיקו מד"א (101).',
        ],
      },
      {
        id: "rebar",
        title: "הריסות וברזלי זיון חשופים",
        level: "high",
        areas: [[83, 69, 22, 11]],
        danger:
          "ברזל חשוף וקצוות חדים עלולים לדקור ולחתוך. חשיפת ברזל מעידה על פגיעה מבנית, והערימה עלולה להיות לא יציבה ולהסתיר לכודים.",
        actions: [
          "אל תטפסו ואל תתקרבו לערימה.",
          "סמנו וגדרו את האזור.",
          "דווחו לכוחות הצלה — ייתכנו לכודים.",
          "אל תזיזו פצוע אלא אם יש סכנה מיידית, כמו אש.",
        ],
      },
      {
        id: "dust2",
        title: "אבק בקצה המעבר",
        level: "med",
        areas: [[56, 59, 22, 12]],
        danger:
          "אבק שמסתיר את קצה המעבר עלול להעיד על קריסה או נזק מתמשך, ובנראות נמוכה עולה סכנת מעידה ופגיעה.",
        actions: [
          "אל תכניסו אנשים למעבר עד שהאבק מתפזר ומקורו ידוע.",
          "כסו אף ופה בבד לח.",
          "בררו אם מקור האבק קריסה, צנרת או שריפה.",
          "פתחו ציר חלופי לפינוי.",
        ],
      },
      {
        id: "floor",
        title: "פסולת וגושים על הרצפה",
        level: "med",
        areas: [[20, 70, 22, 10]],
        danger:
          "מכשולים על ציר המעבר מעלים סכנת מעידה ופוגעים בפינוי, במיוחד של אנשים עם מוגבלות או המתניידים בכיסא גלגלים.",
        actions: [
          "שמרו על צירי מילוט פנויים וסמנו מכשולים.",
          "הקצו מלווים לאנשים עם מוגבלות.",
          "ודאו שקיר או תקרה סמוכים לא נפגעו לפני פינוי.",
          "אל תנסו להזיז גושים כבדים לבד.",
        ],
      },
    ],
  },
  {
    id: "street-collapse",
    name: "כביש שקע ועמוד נטוי",
    image: "images/scenario-3.jpg",
    hazards: [
      {
        id: "pole",
        title: "עמוד ותמרור נטויים",
        level: "high",
        areas: [
          [57, 13, 32, 14],
          [79, 24, 10, 24],
          [88, 40, 12, 16],
        ],
        danger:
          "עמוד שנטה ונשען על כבלים עלול להתמוטט בכל רעידת המשך, ליפול על עוברים ולמשוך אחריו כבלי חשמל נוספים.",
        actions: [
          "אל תעמדו ואל תעברו מתחת לעמוד ולתמרור, וגם לא בקרבתם.",
          "גדרו או סמנו אזור ביטחון רחב והציבו איש צוות שיסיט אנשים.",
          "אל תנסו לייצב, לדחוף או להזיז את העמוד.",
          "דווחו על המיקום המדויק לחברת החשמל (103) ולמוקדי החירום (100 / 101 / 102).",
        ],
      },
      {
        id: "sparks",
        title: "כבלי חשמל חשופים וניצוצות",
        level: "high",
        areas: [
          [67, 81, 26, 14],
          [86, 62, 28, 16],
        ],
        danger:
          "כבלים קרועים ששוכבים על הכביש עלולים להישאר תחת מתח. ניצוצות מעידים על זרם פעיל, ומים או אספלט רטוב מגדילים את הסכנה להתחשמלות ולשריפה.",
        actions: [
          "הניחו שכל כבל תחת מתח. אל תיגעו בו ואל תתקרבו אליו.",
          "אם אתם בקרבה, התרחקו בצעדים קטנים ורצופים ולא בריצה.",
          "אל תכבו את הניצוצות במים. דווחו מיד לחברת החשמל (103) ולכבאות והצלה (102).",
          "גדרו את האזור והציבו איש צוות שימנע כניסה.",
        ],
      },
      {
        id: "crater",
        title: "כביש סדוק ושקע בקרקע",
        level: "high",
        areas: [
          [38, 48, 22, 10],
          [10, 64, 18, 16],
        ],
        danger:
          "סדקים עמוקים ושקיעה בכביש מעידים על קרקע לא יציבה. שולי הבור עלולים להתמוטט תחת משקל אדם או רכב, והסדקים מסתירים סכנות בתוכם.",
        actions: [
          "אל תעמדו על שולי הבור ואל תחצו את הכביש הסדוק.",
          "סמנו וגדרו את האזור כולו וחסמו כניסת רכבים.",
          "נתבו את התנועה לציר חלופי יציב.",
          "דווחו לרשות המקומית ולמוקד העירוני.",
        ],
      },
      {
        id: "pipes",
        title: "צנרת חשופה ושבורה",
        level: "high",
        areas: [[27, 76, 24, 22]],
        danger:
          "צינורות שנחשפו עלולים להיות צנרת מים, ביוב, גז או חשמל שנפגעה. דליפה עלולה לגרום לשיטפון, להידרדרות הקרקע, או להתלקחות וחנק במקרה של גז.",
        actions: [
          "אל תתקרבו ואל תיגעו בצנרת או במים שבבור.",
          "אם יש ריח גז או שריקה, התרחקו מיד נגד כיוון הרוח ואל תפעילו חשמל או אש.",
          "דווחו לכבאות והצלה (102) ולמוקד העירוני.",
          "אל תנסו לסגור ברזים או לתקן בעצמכם.",
        ],
      },
      {
        id: "concrete-pole",
        title: "עמוד בטון שקרס",
        level: "med",
        areas: [[72, 55, 40, 13]],
        danger:
          "אלמנט בטון כבד שקרס חוסם את הציר, עלול להתגלגל או לזוז, ולהפיל חלקים נוספים. סביבו נמצאים לרוב כבלים שנקרעו.",
        actions: [
          "אל תעמדו, אל תשבו ואל תטפסו על האלמנט.",
          "בדקו אם כבלים נוגעים בו לפני כל התקרבות.",
          "סמנו את האזור והסיטו את התנועה.",
          "אל תנסו להזיז אותו בעצמכם. המתינו לכוחות הצלה ולציוד כבד.",
        ],
      },
    ],
  },
 
  /* ===== תרחיש 4 — מעבדה: חומרים מסוכנים (images/scenario-4.jpg) ===== */
  {
    id: "lab-hazmat",
    name: "מעבדה וחומרים מסוכנים",
    image: "images/scenario-4.jpg",
    hazards: [
      {
        id: "cabinet",
        title: "ארון חומרים דליקים שהתהפך",
        level: "high",
        areas: [[20, 42, 36, 25]],
        danger:
          "ארון שמכיל חומרים דליקים התהפך, וייתכן שבקבוקים נשברו או נפתחו. אדים דליקים וחומרים שנשפכו עלולים להתלקח מניצוץ אחד.",
        actions: [
          "אל תפעילו חשמל, מתגים, טלפונים או אש בקרבת הארון.",
          "התרחקו ופנו את האנשים מהאזור.",
          "אל תנסו להעמיד את הארון או לאסוף בקבוקים.",
          "דווחו לכבאות והצלה (102) ולממונה הבטיחות של המוסד.",
        ],
      },
      {
        id: "spill",
        title: "שפך כימי על הרצפה",
        level: "high",
        areas: [
          [25, 70, 36, 16],
          [70, 76, 30, 16],
          [34, 57, 14, 7],
        ],
        danger:
          "נוזלים כימיים צבעוניים נשפכו על הרצפה. הם עלולים להיות רעילים, צורבים או דליקים, ולהתפשט ולהתאדות. מגע או נשימה עלולים לפגוע בעור, בעיניים ובנשימה.",
        actions: [
          "אל תיגעו בנוזל ואל תדרכו בו. הימנעו מנשימת האדים.",
          "התרחקו נגד כיוון הרוח או החוצה, והרחיקו אנשים מהאזור.",
          "דווחו לכבאות והצלה (102) וציינו מה ידוע על החומר.",
          "מי שנחשף: הרחיקו אותו לאוויר צח, הסירו בגדים מזוהמים ושטפו במים. הזעיקו מד\"א (101).",
        ],
      },
      {
        id: "gas-pipe",
        title: "צינור גז במעבדה",
        level: "high",
        areas: [[88, 28, 18, 30]],
        danger:
          "צנרת הגז נמצאת בקיר שנפגע. סדק או ניתוק בחיבורים עלולים לגרום לדליפת גז, והצטברות גז במקום סגור מסכנת בהתפוצצות והתלקחות.",
        actions: [
          "אם יש ריח גז או שריקה: אל תפעילו חשמל או אש, פתחו חלונות והתרחקו.",
          "אם אפשר ובטוח, סגרו את ברז הגז הראשי בדרך החוצה.",
          "אל תשתמשו בטלפון או בציוד חשמלי בתוך האזור.",
          "דווחו לכבאות והצלה (102).",
        ],
      },
      {
        id: "debris",
        title: "שברי זכוכית וציוד מעבדה",
        level: "med",
        areas: [
          [44, 51, 28, 12],
          [62, 33, 28, 10],
        ],
        danger:
          "זכוכית שבורה וכלי מעבדה פזורים על הרצפה ועל השולחנות. הם גורמים לחתכים, ושברים עלולים להכיל שאריות כימיות שמעבירות רעלים דרך פצע.",
        actions: [
          "אל תלכו יחפים או בנעליים פתוחות.",
          "אל תנקו בידיים. נקו רק לאחר אישור האזור, בכפפות ובציוד מגן.",
          "טפלו בחתכים והזעיקו מד\"א (101) לפצועים.",
          "סמנו את האזור והפנו אנשים לציר עוקף.",
        ],
      },
      {
        id: "hood",
        title: "מנדף כימי פגוע",
        level: "med",
        areas: [[58, 18, 24, 11]],
        danger:
          "זכוכית המנדף התנפצה ומערכת השאיבה עלולה לא לפעול. אדים שנוצרו בתוך המנדף עלולים לדלוף אל החדר, והמבנה עצמו עלול לא להיות יציב.",
        actions: [
          "אל תפתחו את המנדף ואל תפעילו אותו.",
          "אל תעמדו מתחתיו או לידו.",
          "אוורו את החדר אם בטוח, והרחיקו אנשים.",
          "דווחו לממונה בטיחות ולכבאות והצלה (102).",
        ],
      },
    ],
  },
 
  /* ===== תרחיש 5 — מסדרון פגוע (images/scenario-5.jpg) ===== */
  {
    id: "damaged-corridor",
    name: "מסדרון פגוע",
    image: "images/scenario-5.jpg",
    hazards: [
      {
        id: "light-fixtures",
        title: "גופי תאורה ותקרה תלויים",
        level: "high",
        areas: [
          [57, 18, 20, 18],
          [31, 35, 26, 10],
          [19, 9, 26, 18],
        ],
        danger:
          "גופי תאורה, לוחות תקרה וכבלים נתלשו ותלויים באוויר. רעידת המשך או רטט קל עלולים להפיל אותם על העוברים במסדרון.",
        actions: [
          "אל תעברו מתחת לגופים התלויים. הקפידו על מסלול בטוח.",
          "אל תיגעו בגופי התאורה או בכבלים. ייתכן שהם תחת מתח.",
          "סמנו וחסמו את המעבר והפנו אנשים לציר חלופי.",
          "דווחו על המיקום המדויק לצוות התחזוקה ולפיקוד העורף (104).",
        ],
      },
      {
        id: "window",
        title: "חלון זכוכית מנופץ",
        level: "high",
        areas: [[88, 56, 24, 45]],
        danger:
          "זכוכית סדוקה עלולה להתפרק ללא התראה, במיוחד בהדהוד, ולפזר רסיסים וקצוות חדים. נפילה של לוח זכוכית עלולה לגרום לחתכים חמורים.",
        actions: [
          "התרחקו מהחלון ומהזכוכית הסדוקה.",
          "אל תיגעו בזכוכית ואל תנסו להסיר אותה.",
          "סמנו גבול ביטחון והרחיקו אנשים מהצד של החלון.",
          "דווחו לצוות התחזוקה. פצועים: מד\"א (101).",
        ],
      },
      {
        id: "floor-glass",
        title: "שברי זכוכית ופסולת על הרצפה",
        level: "med",
        areas: [
          [38, 82, 44, 16],
          [72, 91, 44, 12],
        ],
        danger:
          "הרצפה מכוסה זכוכית, רסיסים ופסולת. הם גורמים לחתכים ולמעידות, במיוחד באפלה או בנסיגה בבהלה.",
        actions: [
          "אל תלכו יחפים או בסנדלים.",
          "נקו רק לאחר שהאזור אושר, בנעליים סגורות ובכפפות.",
          "הניחו מסלול עוקף מסומן.",
          "פצועים: הזעיקו מד\"א (101).",
        ],
      },
      {
        id: "panel",
        title: "לוח ומחיצה שנשמטו",
        level: "med",
        areas: [[20, 64, 14, 11]],
        danger:
          "לוח כבד נשען על הקיר בצורה לא יציבה ועלול ליפול על מי שעובר או מתקרב אליו, ואפשר שמאחוריו עוד נזק מבני.",
        actions: [
          "אל תיגעו בלוח ואל תנסו להזיז אותו.",
          "הרחיקו אנשים משטח הנפילה האפשרי.",
          "סמנו את האזור.",
          "דווחו לצוות התחזוקה ולהנדסה.",
        ],
      },
      {
        id: "dust-end",
        title: "אבק וראות ירודה בקצה המסדרון",
        level: "med",
        areas: [[46, 58, 28, 14]],
        danger:
          "אבק וחשכה מסתירים את המשך המעבר. בראות נמוכה קל לפספס מכשולים וחורים, ואבק עשוי להעיד על נזק או קריסה מתמשכים.",
        actions: [
          "אל תיכנסו לקצה המסדרון עד שהאבק מתפזר ומקורו ידוע.",
          "כסו אף ופה בבד לח.",
          "השתמשו בפנס אישי ולא בלהבה גלויה.",
          "פתחו ציר חלופי לפינוי.",
        ],
      },
    ],
  },
 
  /* ===== תרחיש 6 — גרם מדרגות פגוע (images/scenario-6.jpg) ===== */
  {
    id: "damaged-stairs",
    name: "גרם מדרגות פגוע",
    image: "images/scenario-6.jpg",
    hazards: [
      {
        id: "stairs",
        title: "מדרגות סדוקות ושבורות",
        level: "high",
        areas: [[42, 54, 58, 16]],
        danger:
          "מדרגות שנסדקו עלולות להתמוטט תחת משקל אדם, ולגרום לנפילה ולפציעות קשות. אין לדעת אילו מדרגות עדיין נושאות עומס.",
        actions: [
          "אל תעלו ואל תרדו במדרגות הפגועות.",
          "חסמו את המדרגות והציבו שלט או איש צוות.",
          "הפנו את האנשים למסלול פינוי חלופי.",
          "דווחו למהנדס מבנים ולצוות התחזוקה.",
        ],
      },
      {
        id: "slab",
        title: "גוש בטון שקרס",
        level: "high",
        areas: [[64, 70, 48, 28]],
        danger:
          "חלק מבטון המדרגה או המעקה קרס ונשען באי-יציבות. הוא כבד מאוד, עלול להישמט שוב, ולפגוע במי שנמצא מתחתיו או לידו.",
        actions: [
          "אל תעמדו, אל תעברו ואל תטפסו עליו או לידו.",
          "גדרו אזור ביטחון והרחיקו אנשים.",
          "אל תנסו להזיז אותו. המתינו לחוות דעת מהנדס ולכוחות הצלה.",
          "אם יש חשד ללכודים: דווחו לכוחות ההצלה ואל תיכנסו לערימה.",
        ],
      },
      {
        id: "railing",
        title: "מעקה מתכת עקום ורופף",
        level: "med",
        areas: [[70, 38, 30, 28]],
        danger:
          "מעקה שעבר עיוות ואיבד עיגון לא ישמש תמיכה, ועלול להתקפל או להתנתק כשנשענים עליו. נפילה מגובה עלולה לגרום לפציעה חמורה.",
        actions: [
          "אל תיסמכו ואל תיאחזו במעקה פגוע.",
          "הרחיקו אנשים מאזור המדרגות.",
          "סמנו שהמעקה אינו בטוח.",
          "דווחו לצוות התחזוקה.",
        ],
      },
      {
        id: "cracks",
        title: "סדקים בעמוד ובקיר",
        level: "high",
        areas: [
          [72, 24, 18, 9],
          [85, 82, 26, 26],
        ],
        danger:
          "סדקים עמוקים בעמוד נושא ובקיר מעידים על פגיעה מבנית. בהדהוד עלולים לקרוס חלקים נוספים, וסדק רחב אינו נראה תמיד מקרוב.",
        actions: [
          "התרחקו מהקיר ומהעמוד הסדוקים ואל תיכנסו לבניין.",
          "גדרו אזור ביטחון והרחיקו אנשים.",
          "כניסה רק באישור מהנדס מבנים או כוחות הצלה.",
          "דווחו על המיקום המדויק — פיקוד העורף (104).",
        ],
      },
      {
        id: "gravel",
        title: "שברי בטון ולבנים על המדרגות",
        level: "med",
        areas: [
          [32, 69, 52, 10],
          [50, 96, 70, 8],
        ],
        danger:
          "גושים קטנים ושברי לבנים מתגלגלים על המדרגות, גורמים להחלקה ולמעידה, והם מרמזים על נזק מתמשך מעל.",
        actions: [
          "אל תלכו על שברי הבטון והלבנים.",
          "פתחו וסמנו ציר חלופי לפינוי.",
          "אל תנקו לפני אישור שהאזור יציב.",
          "הציבו מכוון בצומת וסייעו לאנשים עם מוגבלות.",
        ],
      },
    ],
  },
 
];

/* =====================================================================
   לוגיקה
   ===================================================================== */
(() => {
  const $ = (s) => document.querySelector(s);
  const stage = $("#stage"),
    imgbox = $("#imgbox"),
    imgwrap = $("#imgwrap"),
    img = $("#scenImg");
  const spotsEl = $("#spots"),
    marksEl = $("#marks"),
    overlay = $("#overlay");
  const hintBtn = $("#hintBtn"),
    prevBtn = $("#prevBtn"),
    nextBtn = $("#nextBtn");

  const state = {
    idx: 0,
    timerOn: CONFIG.timerDefaultOn,
    countdownSeconds: 120, // זמן הספירה לאחור לכל תרחיש, בשניות (אפשר לדרוס בתרחיש עם timeLimitSeconds)
    modalOpen: false,
    started: false,
    hintTimeout: null,
    scen: SCENARIOS.map(() => ({
      found: new Set(),
      ms: 0,
      hints: 0,
      misses: 0,
      done: false,
      timedOut: false,
    })),
  };

  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const fmt = (ms) => {
    const t = Math.floor(ms / 1000);
    return (
      String(Math.floor(t / 60)).padStart(2, "0") +
      ":" +
      String(t % 60).padStart(2, "0")
    );
  };

  /* לוגו */
  if (CONFIG.logoSrc)
    $("#logoSlot").innerHTML =
      '<img src="' + esc(CONFIG.logoSrc) + '" alt="לוגו">';

  /* התאמת הבמה למסך (9:16) */
  function fitStage() {
    const s = Math.min(innerWidth / 1080, innerHeight / 1920);
    stage.style.setProperty("--s", s);
    fitImage();
  }
  function fitImage() {
    const ratio =
      img.naturalWidth && img.naturalHeight
        ? img.naturalWidth / img.naturalHeight
        : 2 / 3;
    const aw = imgwrap.clientWidth,
      ah = imgwrap.clientHeight;
    let w, h;
    if (aw / ah > ratio) {
      h = ah;
      w = h * ratio;
    } else {
      w = aw;
      h = w / ratio;
    }
    imgbox.style.width = Math.floor(w) + "px";
    imgbox.style.height = Math.floor(h) + "px";
  }
  addEventListener("resize", fitStage);
  img.addEventListener("load", () => {
    fitImage();
    img.style.opacity = 1;
  });

  /* הצגת תרחיש */
  function render() {
    const sc = SCENARIOS[state.idx];
    clearHint();
    img.style.opacity = 0;
    img.src = sc.image;
    spotsEl.innerHTML = "";
    sc.hazards.forEach((h) =>
      h.areas.forEach((a) => {
        const d = document.createElement("div");
        d.className = "spot";
        d.dataset.h = h.id;
        d.style.left = a[0] + "%";
        d.style.top = a[1] + "%";
        d.style.width = a[2] + "%";
        d.style.height = a[3] + "%";
        spotsEl.appendChild(d);
      }),
    );
    marksEl.innerHTML = "";
    updateUI();
  }

  function updateUI() {
    const sc = SCENARIOS[state.idx],
      st = state.scen[state.idx];
    const total = sc.hazards.length,
      n = st.found.size;
    spotsEl
      .querySelectorAll(".spot")
      .forEach((el) =>
        el.classList.toggle("found", st.found.has(el.dataset.h)),
      );
    $("#ptext").textContent = st.done
      ? "✓ כל " + total + " הסכנות נמצאו"
      : "נמצאו " + n + " מתוך " + total + " סכנות";
    $("#pfill").style.width = (n / total) * 100 + "%";
    $("#progress").classList.toggle("complete", st.done);
    $("#doneBanner").classList.toggle("show", st.done);
    $("#scenNum").textContent =
      "תרחיש " + (state.idx + 1) + " מתוך " + SCENARIOS.length;
    $("#scenName").textContent = sc.name;
    const last = state.idx === SCENARIOS.length - 1;
    $("#nextLabel").textContent = last ? "סיכום ותוצאות" : "תרחיש הבא";
    prevBtn.disabled = state.idx === 0;
    nextBtn.classList.toggle("attention", st.done);
    hintBtn.disabled = st.done;
    const hc = $("#hintCount");
    hc.style.display = st.hints ? "flex" : "none";
    hc.textContent = st.hints;
    renderTimer();
  }

  /* טיימר — ספירה לאחור. בתום הזמן מוצג סיכום של התרחיש */
  const limitMs = (sc) =>
    (sc.timeLimitSeconds || CONFIG.countdownSeconds) * 1000;
  function renderTimer() {
    const sc = SCENARIOS[state.idx],
      st = state.scen[state.idx];
    const box = $("#timerBox");
    box.classList.toggle("off", !state.timerOn);
    box.classList.toggle("done", st.done && state.timerOn);
    box.classList.toggle("over", st.timedOut && !st.done && state.timerOn);
    $("#timerVal").textContent = state.timerOn
      ? fmt(Math.max(0, limitMs(sc) - st.ms))
      : "--:--";
    $("#timerToggle").setAttribute("aria-checked", state.timerOn);
  }
  let lastTick = performance.now();
  setInterval(() => {
    const now = performance.now(),
      dt = now - lastTick;
    lastTick = now;
    const sc = SCENARIOS[state.idx],
      st = state.scen[state.idx];
    if (
      state.started &&
      state.timerOn &&
      !state.modalOpen &&
      !st.done &&
      !st.timedOut
    ) {
      st.ms += dt;
      if (st.ms >= limitMs(sc)) {
        st.ms = limitMs(sc);
        st.timedOut = true;
        renderTimer();
        openTimeUp();
        return;
      }
    }
    renderTimer();
  }, 200);

  $("#timerToggle").addEventListener("click", () => {
    state.timerOn = !state.timerOn;
    lastTick = performance.now();
    renderTimer();
  });

  /* זיהוי לחיצה גמיש: כל לחיצה על סכנה או קרוב אליה נחשבת נכונה */
  const HIT_TOLERANCE = 1.35; // 1 = בדיוק האזור שהוגדר. גדול יותר = סלחני יותר
  function hazardAt(x, y) {
    const sc = SCENARIOS[state.idx];
    let best = null,
      bestD = Infinity;
    sc.hazards.forEach((h) =>
      h.areas.forEach(([cx, cy, w, hh]) => {
        const dx = (x - cx) / (w / 2),
          dy = (y - cy) / (hh / 2);
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d <= HIT_TOLERANCE && d < bestD) {
          best = h;
          bestD = d;
        }
      }),
    );
    return best;
  }
  imgbox.addEventListener("click", (e) => {
    if (state.modalOpen) return;
    const r = imgbox.getBoundingClientRect();
    const k = r.width / imgbox.offsetWidth; // יחס הקטנה/הגדלה של הבמה
    const x =
      ((e.clientX - r.left - imgbox.clientLeft * k) /
        (imgbox.clientWidth * k)) *
      100;
    const y =
      ((e.clientY - r.top - imgbox.clientTop * k) / (imgbox.clientHeight * k)) *
      100;
    const hazard = hazardAt(x, y);
    if (hazard) onSpot(hazard.id);
    else miss(x, y);
  });

  function miss(x, y) {
    state.scen[state.idx].misses++;
    const m = document.createElement("div");
    m.className = "miss";
    m.style.left = x + "%";
    m.style.top = y + "%";
    marksEl.appendChild(m);
    setTimeout(() => m.remove(), 850);
  }

  function onSpot(hid) {
    const sc = SCENARIOS[state.idx],
      st = state.scen[state.idx];
    const hazard = sc.hazards.find((h) => h.id === hid);
    const isNew = !st.found.has(hid);
    if (isNew) {
      st.found.add(hid);
      clearHint();
      if (st.found.size === sc.hazards.length) st.done = true;
      updateUI();
    }
    openCard(hazard, isNew && st.done);
  }

  /* רמז */
  function clearHint() {
    clearTimeout(state.hintTimeout);
    spotsEl
      .querySelectorAll(".spot.hint")
      .forEach((el) => el.classList.remove("hint"));
  }
  hintBtn.addEventListener("click", () => {
    if (state.modalOpen) return;
    const sc = SCENARIOS[state.idx],
      st = state.scen[state.idx];
    const left = sc.hazards.filter((h) => !st.found.has(h.id));
    if (!left.length) return;
    clearHint();
    const pick = left[Math.floor(Math.random() * left.length)];
    st.hints++;
    spotsEl.querySelectorAll(".spot").forEach((el) => {
      if (el.dataset.h === pick.id) el.classList.add("hint");
    });
    state.hintTimeout = setTimeout(clearHint, CONFIG.hintDurationMs);
    updateUI();
  });

  /* חלונות */
  function openModal(html) {
    overlay.innerHTML = html;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    state.modalOpen = true;
  }
  function closeModal() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = "";
    state.modalOpen = false;
    lastTick = performance.now();
  }

  const ICON = {
    high: '<svg viewBox="0 0 64 64"><path d="M32 6L2 58h60L32 6z" fill="#e5322d"/><rect x="29" y="22" width="6" height="20" rx="3" fill="#fff"/><circle cx="32" cy="49" r="3.800" fill="#fff"/></svg>',
    med: '<svg viewBox="0 0 64 64"><path d="M32 6L2 58h60L32 6z" fill="#ffd60a"/><rect x="29" y="22" width="6" height="20" rx="3" fill="#111"/><circle cx="32" cy="49" r="3.800" fill="#111"/></svg>',
  };

  function openCard(h, completed) {
    openModal(
      '<div class="card ' +
        h.level +
        '" role="dialog" aria-modal="true">' +
        '<div class="card-head"><div class="cicon">' +
        ICON[h.level] +
        "</div><div>" +
        '<span class="chip ' +
        h.level +
        '">' +
        LEVELS[h.level].label +
        "</span>" +
        "<h2>" +
        esc(h.title) +
        "</h2></div></div>" +
        '<div class="sec"><h3>מה הסכנה?</h3><p>' +
        esc(h.danger) +
        "</p></div>" +
        '<div class="sec"><h3>מה עושים?</h3><ul>' +
        h.actions.map((a) => "<li>" + esc(a) + "</li>").join("") +
        "</ul></div>" +
        '<div class="src">בהתאם להנחיות פיקוד העורף</div>' +
        (completed
          ? '<div class="okline">✓ זיהיתם את כל הסכנות בתרחיש הזה!</div>'
          : "") +
        '<button id="cClose" class="navbtn primary" type="button"><span>המשך</span></button>' +
        "</div>",
    );
    $("#cClose").addEventListener("click", closeModal);
  }

  function openSummary() {
    let totalFound = 0,
      totalAll = 0;
    const rows = SCENARIOS.map((sc, i) => {
      const st = state.scen[i],
        n = st.found.size,
        t = sc.hazards.length;
      totalFound += n;
      totalAll += t;
      return (
        '<div class="srow"><span>' +
        esc(sc.name) +
        "</span>" +
        '<span class="' +
        (n === t ? "g" : "y") +
        '">' +
        n +
        " / " +
        t +
        "</span>" +
        "<span>" +
        (st.ms > 0 ? fmt(st.ms) : "—") +
        "</span>" +
        "<span>" +
        st.hints +
        "</span><span>" +
        st.misses +
        "</span></div>"
      );
    }).join("");
    const all = totalFound === totalAll;
    openModal(
      '<div class="card ' +
        (all ? "ok" : "med") +
        '" role="dialog" aria-modal="true">' +
        "<h2>סיכום ותוצאות</h2>" +
        '<div class="okline" style="' +
        (all ? "" : "color:var(--yellow)") +
        '">' +
        (all
          ? "✓ כל הכבוד! זיהיתם את כל הסכנות (" +
            totalFound +
            " מתוך " +
            totalAll +
            ")"
          : "זוהו " +
            totalFound +
            " מתוך " +
            totalAll +
            " סכנות — אפשר לחזור ולהשלים") +
        "</div>" +
        '<div style="display:flex;flex-direction:column;gap:10px">' +
        '<div class="srow hd"><span>תרחיש</span><span>סכנות</span><span>זמן</span><span>רמזים</span><span>לחיצות שגויות</span></div>' +
        rows +
        "</div>" +
        '<div class="emerg"><b>מספרי חירום:</b> מד"א 101 · כב"א 102 · משטרה 100 · חברת החשמל 103 · פיקוד העורף 104</div>' +
        '<div class="btnrow">' +
        '<button id="sBack" class="navbtn ghost" type="button"><span>חזרה לתרחישים</span></button>' +
        '<button id="sReset" class="navbtn primary" type="button"><span>התחלה מחדש</span></button>' +
        "</div>" +
        "</div>",
    );
    $("#sBack").addEventListener("click", closeModal);
    $("#sReset").addEventListener("click", () => {
      state.scen = SCENARIOS.map(() => ({
        found: new Set(),
        ms: 0,
        hints: 0,
        misses: 0,
        done: false,
        timedOut: false,
      }));
      state.idx = 0;
      state.started = false;
      $("#startScreen").classList.remove("hide");
      closeModal();
      render();
    });
  }
  /* סיכום תרחיש בתום הזמן */
  function openTimeUp() {
    const sc = SCENARIOS[state.idx],
      st = state.scen[state.idx];
    const missed = sc.hazards.filter((h) => !st.found.has(h.id));
    const last = state.idx === SCENARIOS.length - 1;
    clearHint();
    openModal(
      '<div class="card high" role="dialog" aria-modal="true">' +
        "<h2>נגמר הזמן!</h2>" +
        '<div class="okline" style="color:var(--yellow)">בתרחיש "' +
        esc(sc.name) +
        '" זוהו ' +
        st.found.size +
        " מתוך " +
        sc.hazards.length +
        " סכנות</div>" +
        '<div class="sec"><h3>סכנות שלא זוהו:</h3><ul class="bad">' +
        missed.map((h) => "<li>" + esc(h.title) + "</li>").join("") +
        "</ul></div>" +
        '<div class="btnrow">' +
        '<button id="tuStay" class="navbtn ghost" type="button"><span>המשך לחפש</span></button>' +
        '<button id="tuNext" class="navbtn primary" type="button"><span>' +
        (last ? "סיכום ותוצאות" : "תרחיש הבא") +
        "</span></button>" +
        "</div>" +
        "</div>",
    );
    $("#tuStay").addEventListener("click", closeModal);
    $("#tuNext").addEventListener("click", () => {
      closeModal();
      if (last) openSummary();
      else {
        state.idx++;
        lastTick = performance.now();
        render();
      }
    });
  }

  /* מסך התחלה — הטיימר מתחיל רק אחרי הלחיצה */
  $("#startNote").textContent =
    "לכל תרחיש מוקצב זמן של " +
    fmt(CONFIG.countdownSeconds * 1000) +
    " דקות. אפשר לכבות את הטיימר במתג שבמסך.";
  $("#startBtn").addEventListener("click", () => {
    state.started = true;
    lastTick = performance.now();
    $("#startScreen").classList.add("hide");
  });
  /* ניווט ידני בלבד — אין מעבר אוטומטי */
  prevBtn.addEventListener("click", () => {
    if (state.modalOpen || state.idx === 0) return;
    state.idx--;
    lastTick = performance.now();
    render();
  });
  nextBtn.addEventListener("click", () => {
    if (state.modalOpen) return;
    if (state.idx === SCENARIOS.length - 1) {
      openSummary();
      return;
    }
    state.idx++;
    lastTick = performance.now();
    render();
  });

  /* מניעת תפריט הקשר / זום בלחיצה כפולה */
  addEventListener("contextmenu", (e) => e.preventDefault());
  addEventListener("dblclick", (e) => e.preventDefault());

    /* מסך מלא */
  const fsBtn = $("#fsBtn"),
    fsRoot = document.documentElement;
  const isFs = () => document.fullscreenElement || document.webkitFullscreenElement;
  if (!(fsRoot.requestFullscreen || fsRoot.webkitRequestFullscreen)) fsBtn.style.display = "none";
  fsBtn.addEventListener("click", () => {
    if (isFs()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else (fsRoot.requestFullscreen || fsRoot.webkitRequestFullscreen).call(fsRoot);
  });
  const syncFs = () => fsBtn.classList.toggle("on", !!isFs());
  document.addEventListener("fullscreenchange", syncFs);
  document.addEventListener("webkitfullscreenchange", syncFs);

  /* מצב בדיקה: הוסיפו ?debug לכתובת כדי לראות את אזורי הלחיצה */
  if (location.search.includes("debug")) document.body.classList.add("debug");

  /* התאמת טקסט שורה-אחת לרוחב (גיבוי למקרה שהפונט עדיין לא נטען) */
  function autoFit() {
    document.querySelectorAll("[data-fit]").forEach((el) => {
      const max = +el.dataset.fit;
      if (!el.dataset.base)
        el.dataset.base = parseFloat(getComputedStyle(el).fontSize);
      let s = +el.dataset.base;
      el.style.display = "inline-block";
      el.style.whiteSpace = "nowrap";
      el.style.fontSize = s + "px";
      while (el.scrollWidth > max && s > 16) {
        s -= 2;
        el.style.fontSize = s + "px";
      }
    });
  }
  fitStage();
  render();
  autoFit();
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(() => {
      autoFit();
      fitImage();
    });
})();
