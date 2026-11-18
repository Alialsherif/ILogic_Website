# صورة نظام الولاء داخل اللابتوب

استُبدلت الصورة التي تضع ماكينة القهوة والهاتف والرمز خارج الشاشة بصورة لابتوب واحد يعرض واجهة نظام الولاء داخل شاشته. الواجهة توضّح العضويات والمكافآت ومسار Scan → Order → Reward. الألوان من الهوية الحالية: الأبيض والفحمي والنعناعي واللافندر.

- الملف المستخدم: `public/images/identity-v2/loyalty-laptop-system.webp`، 1536×1024.
- المصدر: `output/imagegen/loyalty-laptop/source.png`.
- الصورة توضيحية مولّدة؛ سطر «تصوّر توضيحي للنظام» الموجود تحتها باقٍ، ولا تُعرض باعتبارها لقطة فعلية من برنامج عميل.
- الصورة السابقة بقيت دون تعديل، وربط الملف الجديد يتم من `scripts/prepare-home-assets.mjs` إلى manifest الأصول.
- نُفّذ التوليد بالأداة المدمجة `image_gen` وفق مهارة imagegen، ثم حُوّل الناتج إلى WebP محليًا.

## برومبت التوليد النهائي

```text
Use case: product-mockup. Create a premium photorealistic 3D portfolio image for a bespoke customer loyalty SOFTWARE SYSTEM. Landscape 3:2. ONE elegant silver laptop only, screen large and dominant, almost front-on with a slight 10 degree perspective, complete laptop screen and slim keyboard visible, filling 85% of frame. All conceptual content must be INSIDE the laptop screen. The screen shows a polished plausible software product interface: a calm white/off-white loyalty workspace with a narrow charcoal left sidebar, mint active navigation, a clear heading 'Loyalty', a generous customer-membership card preview with a QR tile and abstract reward stamps, an orderly activity list with small check icons, and three compact workflow modules along the bottom labelled exactly 'Scan', 'Order', 'Reward', linked with thin soft lavender lines. Show software functionality and hierarchy clearly, not floating abstract squares. NO dashboard metrics, no invented statistics, no numeric counts, no percentages, no prices, no scores, no dates, no customer names or testimonials. Use neutral nonhuman avatar icons only. Studio scene: warm off-white and very pale mint surface, a subtle lavender background curve, soft realistic daylight and contact shadow. Materials: brushed aluminum, crisp glass screen with minimal reflection, refined cream/mint/lavender UI and charcoal typography. No real brand names or logo, no people, NO coffee machine, NO smartphone, no bags, no cards or QR objects outside screen, no floating decorations in front of laptop, no security shield, no neon colors, no extra devices. The laptop's screen must read as a refined, finished loyalty management tool, not a diagram on a blank screen. No watermark. Match a luxurious white/black/mint/lavender digital agency visual identity. Everything important readable in a medium-sized portfolio card.
```

تعديل النص المصاحب: أصبح عنوان القصة في صفحة «من نحن» هو «خبرة بنيناها في مشاريع حقيقية»، مع تحديث المقابل الإنجليزي إلى «Experience built through real projects».
