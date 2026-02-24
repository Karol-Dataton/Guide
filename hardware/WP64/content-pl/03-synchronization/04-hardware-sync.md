---
title: "Synchronizacja sprzętowa"
---

## Synchronizacja sprzętowa

**Konfiguracja synchronizacji sprzętowej między wieloma urządzeniami WATCHPAX 64 za pomocą karty NVIDIA Quadro Sync II.**

### Konfiguracja fizyczna

Przed skonfigurowaniem ustawień synchronizacji upewnij się, że serwery są prawidłowo ze sobą połączone.

* Używaj kabli Ethernet kategorii CAT6 lub lepszych.
* Diody LED na kartach Quadro Sync powinny być aktywne (pomarańczowy lub zielony kolor).
* Kable powinny być krótkie i zapewniać wysoką jakość sygnału.
* Nie twórz pętli sygnałowych. Jest to łańcuch liniowy.
* Do połączenia urządzeń kablem można użyć dowolnego z dwóch portów Ethernet na karcie.

Sygnał synchronizacji powinien być zorganizowany w następujący sposób, ze źródłem sygnału w środku klastra:

![Struktura sygnału synchronizacji](../media/wp64/synchronization_13.jpg)

W ten sposób odległość, którą sygnał musi pokonać, zostaje skrócona, co zapewnia bardziej stabilny sygnał.

### Konfiguracja ustawień synchronizacji

1. Użyj opcji *SETUP SYNC*, aby utworzyć ustawienia synchronizacji sprzętowej.

![Opcja Setup Sync](../media/wp64/synchronization_14.jpg)

:::info
Najpierw skonfiguruj maszynę, która zawiera *serwer czasu* (timing server). Tylko jedno wyjście na jednym serwerze może być źródłem synchronizacji — wszystkie pozostałe wyjścia należy skonfigurować jako *klienty*.
:::

![Okno konfiguracji synchronizacji sprzętowej](../media/wp64/synchronization_15.jpg)
Przykład okna konfiguracji synchronizacji sprzętowej.

2. Na serwerze, który będzie źródłem sygnału, wybierz wyświetlacz źródła synchronizacji. Na pozostałych serwerach pomiń ten krok.

3. Zaznacz wszystkie pozostałe wyświetlacze jako klienty.

4. Kliknij *Apply sync* i poczekaj na komunikat potwierdzający.

![Potwierdzenie synchronizacji](../media/wp64/synchronization_16.jpg)

Typowa konfiguracja dla 4 serwerów wyświetlających:

![Typowa konfiguracja 4 serwerów](../media/wp64/synchronization_17.jpg)

Bieżącą konfigurację synchronizacji można zobaczyć w sekcji Hardware Synchronization:

![Status synchronizacji sprzętowej](../media/wp64/synchronization_18.jpg)
