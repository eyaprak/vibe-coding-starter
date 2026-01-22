# UI Component Templates - Kullanım Talimatları

Dashboard için özel UI component'leri.

## 📦 İçerik

```
ui-component-templates/
├── PROMPT.md                # Bu dosya
├── stat-card.tsx            # İstatistik kartı
├── data-table.tsx           # Veri tablosu
├── empty-state.tsx          # Boş durum gösterimi
├── loading-spinner.tsx      # Yükleme animasyonu
└── error-alert.tsx          # Hata bildirimi
```

## 🚀 Kurulum

```bash
# Component klasörü oluştur
mkdir -p src/components/dashboard

# Component'leri kopyala
cp stat-card.tsx src/components/dashboard/stat-card.tsx
cp data-table.tsx src/components/dashboard/data-table.tsx
cp empty-state.tsx src/components/empty-state.tsx
cp loading-spinner.tsx src/components/loading-spinner.tsx
cp error-alert.tsx src/components/error-alert.tsx
```

## ✅ Component'ler

**StatCard:**
- Icon
- Title
- Value
- Trend (up/down)
- Description

**DataTable:**
- Columns
- Data
- Pagination
- Sorting
- Filtering
- Bulk actions

**EmptyState:**
- Icon
- Title
- Description
- Action button

**LoadingSpinner:**
- Spinner animation
- Full page ve inline variants

**ErrorAlert:**
- Hata mesajı
- Retry button
- Dismiss

## 🔗 İlişkili Template'ler

- Dashboard Page Templates
- Dashboard Layout Templates

@see templates/PROMPT.md
