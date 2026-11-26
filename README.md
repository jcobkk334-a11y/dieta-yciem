# Odżywianie bez spiny — landing page

Statyczna responsywna strona sprzedażowa e-booka PDF. Bez frameworka i procesu build.

## Podgląd
Otwórz index.html albo uruchom python -m http.server 8000.

## Sprzedaż
W script.js wklej link do checkoutu Naffy/Easycart w CHECKOUT_URL. Skonfiguruj produkt, płatność i automatyczne dostarczanie PDF po zakupie. Uzupełnij cenę, dane sprzedawcy, regulamin i politykę prywatności w index.html.

Pełnego PDF nie umieszczaj w publicznym katalogu strony. Prześlij go do platformy sprzedażowej.

## Publikacja
Statyczny hosting Netlify/GitHub Pages. Katalog publikacji: / (root), build command pusty.

## Uwagi
Cena, link płatności, dane sprzedawcy i dokumenty prawne wymagają uzupełnienia. Brak fałszywego procesu zakupowego. Animacje respektują prefers-reduced-motion.