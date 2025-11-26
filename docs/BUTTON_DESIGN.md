# Button Design - Recording Style

## نظرة عامة

تم تطبيق تصميم موحد على جميع الأزرار في المشروع يشبه إطار تصوير/تسجيل فيديو مع لمعة مستمرة.

## المميزات

- ✅ **L-shaped Brackets**: إطار في الزوايا الأربع يشبه viewfinder
- ✅ **Continuous Glow**: لمعة مستمرة تلمع باستمرار
- ✅ **Recording Dot**: دائرة حمراء تلمع (لأزرار التشغيل)
- ✅ **Shimmer Effect**: تأثير لمعة يتحرك عبر الزر
- ✅ **Pulse Glow**: لمعة نابضة مستمرة

## الاستخدام

### التصميم التلقائي

```tsx
import Button from '@/components/atoms/Button';

// التصميم يطبق تلقائياً على:
// - variant="recording"
// - variant="video"
// - أي زر يحتوي على "PLAY", "VIDEO", "تشغيل", "SHOWREEL"
<Button variant="recording" size="lg">
  PLAY SHOWREEL
</Button>
```

### التصميم اليدوي

```tsx
<Button
  variant="primary" // أو أي variant
  showBrackets={true}
  continuousGlow={true}
  showRecordingDot={true}
>
  Button Text
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'recording' \| 'video' \| ...` | `'primary'` | نوع الزر |
| `showBrackets` | `boolean` | `false` | إظهار L-shaped brackets |
| `continuousGlow` | `boolean` | `false` | لمعة مستمرة |
| `showRecordingDot` | `boolean` | `false` | دائرة حمراء |

## التصميم التلقائي

التصميم يطبق تلقائياً على:
- `variant="recording"`
- `variant="video"`
- أي زر يحتوي نص: "PLAY", "VIDEO", "تشغيل", "SHOWREEL"
- `showBrackets={true}`
- `continuousGlow={true}`

## Animations

### Shimmer
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### Pulse Glow
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
```

## الملفات المحدثة

- ✅ `components/atoms/Button.tsx` - المكون الرئيسي
- ✅ `app/globals.css` - Animations
- ✅ `components/blocks/HeroBlock.tsx`
- ✅ `components/blocks/ApproachSection.tsx`
- ✅ `components/pages/HomePageContent.tsx`
- ✅ `components/pages/PortfolioDetailContent.tsx`
- ✅ `components/ErrorBoundary.tsx`

## النتيجة

جميع الأزرار في المشروع الآن تستخدم التصميم الموحد:
- إطار L-shaped brackets في الزوايا
- لمعة مستمرة تلمع باستمرار
- دائرة حمراء (لأزرار التشغيل)
- تأثيرات بصرية احترافية

