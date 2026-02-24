---
title: "Włączanie mozaiki"
---

## Włączanie mozaiki

**Utwórz siatkę mozaiki, aby połączyć wiele wyjść wyświetlania w jedną zunifikowaną powierzchnię.**

:::warning
Przed rozpoczęciem upewnij się, że wszystkie wyświetlacze obsługują wybrany tryb wyświetlania (rozdzielczość + częstotliwość odświeżania).
:::

1. Zaznacz wszystkie wyświetlacze i wybierz opcję *CREATE MOSAIC*. Jeśli podłączony jest tylko jeden wyświetlacz lub zaznaczony jest tylko jeden, opcja będzie wyszarzona.

![Opcja Create Mosaic](../media/wp64/synchronization_09.jpg)

2. W menu *Create Mosaic Grid* skonfiguruj siatkę zgodnie ze specyfikacją.

![Okno Create Mosaic Grid](../media/wp64/synchronization_10.jpg)
Przykład okna *Create Mosaic Grid*.

- Wybierz odpowiednią liczbę wierszy i kolumn.

  Dla konfiguracji 2x2 liczba kolumn i wierszy wynosi po 2. Dla 4 wyświetlaczy ustawionych poziomo (panorama) siatka składa się z 1 wiersza i 4 kolumn (1x4).

- Wybierz rozdzielczość (dla każdego wyświetlacza), podając szerokość i wysokość.

  Rozdzielczość jest podawana dla każdego uczestniczącego wyświetlacza, a nie dla całej mozaiki. Na przykład: aby uzyskać mozaikę 4K z 4 wyjść HD, należy wpisać 1920x1080 odpowiednio w polach Custom Width i Custom Height.

- Wybierz żądaną częstotliwość odświeżania.

:::info
Dla 59,94 Hz prawidłowe wartości to 60000 dla pola Numerator i 1001 dla pola Denominator.
:::

- Przeciągnij odpowiednie kanały na właściwe pozycje w panelu podglądu, aby utworzyć żądany układ.

![Układ siatki mozaiki](../media/wp64/synchronization_11.jpg)

- Kliknij Create Grid, aby zastosować zmiany.

:::info
Przed sfinalizowaniem siatki mozaiki upewnij się, że WATCHOUT nie renderuje obrazu na wyświetlaczach używanych do siatki. Wyłącz je wszystkie przed zatwierdzeniem zmian.
:::

- Jeśli wszystko zostało skonfigurowane poprawnie, komunikat potwierdzi pomyślne utworzenie siatki mozaiki.

![Mozaika utworzona](../media/wp64/synchronization_12.jpg)
