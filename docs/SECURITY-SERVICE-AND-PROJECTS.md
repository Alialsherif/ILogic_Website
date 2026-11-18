# كارت الأمان والتنقل بين الأعمال

استُبدل الكارت الرابع للهوية البصرية بخدمة «أمان المواقع والأنظمة»، بالعربية والإنجليزية. يشرح خطر حقن محتوى أو روابط غير لائقة وأثر ذلك على ثقة العميل، والفحص ومعالجة الثغرات والصلاحيات والتحديثات. لا يعد النص بمنع كل اختراق أو بضمان أمان مطلق.

رابط التفاصيل يحتفظ بالمسار الموجود ويستخدم `service=security`. لم تُبنَ صفحة تفاصيل جديدة؛ تبقى صفحة القالب الحالية حتى تنفيذ التفاصيل مع المالك.

## الصورة

- الأداة: built-in `image_gen`، بواسطة مهارة imagegen؛ لا استخدام لـCLI أو API مدفوع مستقل.
- الملف المستخدم: `public/images/identity-v2/service-security.webp`، 1200×800، نحو 25 KB.
- نسخة المصدر: `output/imagegen/security-service/security-source.png`.
- ملف الهوية السابق محفوظ دون تغيير.
- البرومبت النهائي:

```text
Use case: stylized-concept. Asset: premium ILogic website security service card illustration, landscape 3:2. A sophisticated editorial 3D still life explaining protection of a website from injected malicious content: a sculptural frosted glass browser window with simple blank content blocks, protected by a large elegant pearl ceramic shield with a small charcoal inset lock. Outside the clear shield boundary, a few tiny broken dark link fragments are deflected away, no red alarms. Materials: satin pearl white ceramic, translucent mint glass, brushed silver and pale lavender details, warm off-white plinth. Soft studio daylight, beautiful contact shadows, restrained composition, generous negative space, premium digital design agency aesthetic. Palette only off-white, very pale mint #e5f3f0, pale lavender #eeedf8, charcoal black. The shield and browser should be large and clear even in a narrow portrait crop, central 55 percent safe area. No people, no words, no lettering, no numbers, no brand names, no watermarks, no hacking code, no adult imagery, no neon, no dark cybersecurity cliché. Crisp high quality 3D render.
```

## عرض الأعمال

أزيلت قائمة أسماء المشاريع الطويلة واستُبدلت بسهمين دائريين وزر إيقاف/تشغيل صغير. كل المشاريع ونصوصها وروابطها وصورها وفيديوهاتها موجودة كما هي في HTML المسبق.

التبديل كل 6500ms، ويمكن تعديل `projectRotationDelay` في `src/components/home/useProjectRotation.js`. يعمل فقط أثناء ظهور القسم والتبويب، ويتوقف مع مرور الماوس أو وجود التركيز داخل القسم. الزر يوقفه صراحةً. تشغيل فيديو بإجراء من المستخدم يوقف التبديل إلى أن يعيد المستخدم تشغيله. تقليل الحركة يوقف التشغيل التلقائي افتراضيًا؛ السهمان يعملان يدويًا، وتنعكس اتجاهاتهما في العربية. الأسهم على لوحة المفاتيح تعمل أيضًا أثناء التركيز على أدوات التنقل.

الحركة انتقال opacity قصير، ولا توجد مكتبة إضافية أو مؤقت يعمل خارج القسم. يقيس العرض ارتفاع الكروت بعد جاهزية الخطوط وعند تغيير العرض أو اللغة، ويحجز أعلى ارتفاع لمنع حركة الأقسام التالية أثناء التبديل. لا يكرر المحتوى أو يترك الوسائط غير النشطة معروضة. توجد تسميات عربية وإنجليزية لأدوات التنقل وحالة مناسبة لقارئات الشاشة دون إعلان التغييرات التلقائية.

## التحقق

- ESLint للهوك والصفحة.
- اختبارات الرئيسية الثمانية، بما فيها SSR واكتمال الترجمات والبيانات الوصفية.
- بناء الإنتاج وتوليد HTML المسبق.
- فحص المتصفح عبر `node homepage-preview.local/audit.mjs security-projects-review`؛ التقرير والصور في `homepage-preview.local/security-projects-review/`.
