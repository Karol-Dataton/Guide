---
title: "Dostęp do WATCHPAX Config"
---

## Dostęp do WATCHPAX Config

**Rozpocznij od znalezienia adresu IP urządzenia WATCHPAX 64.** Powinien on być widoczny na ekranie powitalnym WATCHOUT, ale jeśli jest niedostępny, adres IP można również znaleźć w oknie *Nodes* w oprogramowaniu Producer na komputerze produkcyjnym. Wyświetlona zostanie nazwa WATCHPAX z adresem IP poniżej.

![WATCHPAX Config — okno Nodes](../media/wp64/synchronization_01.jpg)

Otwórz przeglądarkę internetową i przejdź do adresu serwera z portem 3024. WATCHPAX 64 i komputer produkcyjny muszą znajdować się w tej samej sieci, aby uzyskać dostęp do WATCHPAX Config.

![WATCHPAX Config — przeglądarka](../media/wp64/synchronization_02.jpg)

Wyświetlony zostanie interfejs użytkownika z informacjami o wszystkich podłączonych wyjściach.

![WATCHPAX Config — interfejs użytkownika](../media/wp64/synchronization_03.jpg)

Wszystkie kanały powinny pokazywać podłączony wyświetlacz pod etykietą „Channel" oraz aktualną rozdzielczość i częstotliwość odświeżania.

![WATCHPAX Config — status kanału](../media/wp64/synchronization_04.jpg)

:::info
W przypadku korzystania z klastrów mozaiki z kilkoma urządzeniami WATCHPAX, każdy serwer musi być skonfigurowany osobno.
:::

:::warning
Funkcje synchronizacji sprzętowej będą działać tylko wtedy, gdy system zostanie skonfigurowany w odpowiedniej kolejności, jak poniżej.
1. Najpierw należy skonfigurować emulację EDID.
2. Następnie siatkę mozaiki.
3. Synchronizacja sprzętowa jest włączana na końcu.
:::
