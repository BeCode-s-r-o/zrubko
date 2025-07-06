# Preklady košíka a checkout procesu - Zrubko Project

## Prehľad zmien

Všetky anglické texty súvisiace s košíkom, checkout procesom a objednávkami boli nahradené slovenskými ekvivalentmi.

## Zmenené texty

### Produktové akcie
- `"Add to cart"` → `"Pridať do košíka"`
- `"Select variant"` → `"Vyberte variant"`
- `"Select Options"` → `"Vyberte možnosti"`
- `"Out of stock"` → `"Nie je na sklade"`

### Súčty košíka (Cart Totals)
- `"Subtotal (excl. shipping and taxes)"` → `"Medzisúčet (bez dopravy a daní)"`
- `"Discount"` → `"Zľava"`
- `"Shipping"` → `"Doprava"`
- `"Taxes"` → `"Dane"`
- `"Gift card"` → `"Darčekový poukaz"`
- `"Total"` → `"Celkom"`

### Prázdny košík
- `"Cart"` → `"Košík"`
- `"You don't have anything in your cart..."` → `"Nemáte nič vo svojom košíku..."`
- `"Explore products"` → `"Preskúmať produkty"`

### Prihlasovacie výzvy
- `"Already have an account?"` → `"Už máte účet?"`
- `"Sign in for a better experience."` → `"Prihláste sa pre lepší zážitok."`
- `"Sign in"` → `"Prihlásiť sa"`

### Súhrn objednávky
- `"Order Summary"` → `"Súhrn objednávky"`
- `"Subtotal"` → `"Medzisúčet"`
- `"Shipping"` → `"Doprava"`
- `"Taxes"` → `"Dane"`
- `"Total"` → `"Celkom"`

### Platobné detaily
- `"Payment"` → `"Platba"`
- `"Payment method"` → `"Spôsob platby"`
- `"Payment details"` → `"Detaily platby"`

### Doručovacie detaily
- `"Delivery"` → `"Doručenie"`
- `"Shipping Address"` → `"Dodacia adresa"`
- `"Contact"` → `"Kontakt"`
- `"Method"` → `"Spôsob"`

### Produktové taby
- `"Shipping & Returns"` → `"Doprava a vrátenie"`

## Zmenené súbory

1. **storefront/src/modules/products/components/product-actions/index.tsx**
   - Preložené akcie produktov (Add to cart, Select variant, Out of stock)

2. **storefront/src/modules/products/components/product-actions/mobile-actions.tsx**
   - Preložené mobilné akcie produktov

3. **storefront/src/modules/common/components/cart-totals/index.tsx**
   - Preložené súčty košíka

4. **storefront/src/modules/cart/components/empty-cart-message/index.tsx**
   - Preložená správa prázdneho košíka

5. **storefront/src/modules/cart/components/sign-in-prompt/index.tsx**
   - Preložené prihlasovacie výzvy

6. **storefront/src/modules/order/components/order-summary/index.tsx**
   - Preložený súhrn objednávky

7. **storefront/src/modules/order/components/payment-details/index.tsx**
   - Preložené platobné detaily

8. **storefront/src/modules/order/components/shipping-details/index.tsx**
   - Preložené doručovacie detaily

9. **storefront/src/modules/products/components/product-tabs/index.tsx**
   - Preložené produktové taby

## Výsledok

- Kompletný slovenský e-shop bez anglických textov v košíku a checkout procese
- Zachovaná plná funkcionalnost
- Lepší používateľský zážitok pre slovenských zákazníkov

## Spustenie

```bash
cd storefront
npm run dev
```

Aplikácia je teraz kompletne lokalizovaná do slovenčiny! 🇸🇰 