---
title: "Instalacja"
---

## Instalacja

**Instrukcje instalacji WATCHPAX 64, w tym opcje montażu wolnostojącego i w szafie rack oraz procedury włączania/wyłączania.**

### Informacje ogólne

* Sprzęt ten jest przeznaczony do użytku profesjonalnego, do instalacji w miejscach, w których normalnie przebywają wyłącznie osoby dorosłe. Przed użyciem sprawdź listę „Bezpieczeństwo przede wszystkim".
* WATCHPAX 64 musi być podłączony do prawidłowo uziemionego gniazdka ściennego (gniazdko z uziemieniem ochronnym w budynku).
* Numer seryjny znajduje się na spodzie urządzenia.

:::warning
Używaj wyłącznie kabla zasilającego dostarczonego z urządzeniem WATCHPAX 64, w przeciwnym razie Dataton AB nie może zagwarantować pełnej funkcjonalności.
:::

### Instalacja wolnostojąca

Ustaw urządzenie płasko, spodem do dołu. Zamontuj cztery samoprzylepne gumowe nóżki (w zestawie) w miejscach oznaczonych na spodzie urządzenia.

### Instalacja w szafie rack 19 cali

Urządzenie WATCHPAX 64 można zamontować w szafie rack 19 cali za pomocą opcjonalnego zestawu montażowego. Szczegółowe instrukcje montażu znajdują się w osobnej dokumentacji.

### Włączanie

Urządzenie WATCHPAX 64 włącza się poprzez podłączenie kabla zasilającego lub podłączenie kabla zasilającego i użycie włącznika/wyłącznika (patrz [Złącza](../01-introduction/08-connectors.md) w rozdziale Wprowadzenie). Funkcja Wake-on-LAN (WOL) może być również używana z innymi urządzeniami, które ją obsługują.

### Pierwsze uruchomienie

Przy pierwszym uruchomieniu WATCHPAX 64 (po dostawie lub po resecie) system zakończy instalację i kilkakrotnie się zrestartuje. Procedura ta trwa zazwyczaj około 5 minut.

![Pierwsze uruchomienie WATCHPAX 64](../media/wp64/installation_02.jpg)

:::warning
Nie przerywaj tej procedury.
:::

### Wyłączanie

Procedurę wyłączania należy zainicjować z poziomu oprogramowania WATCHOUT Producer.

Po zakończeniu sekwencji wyłączania wentylatory zatrzymają się i można odłączyć kabel zasilający.

Aby wyłączyć urządzenie z poziomu oprogramowania WATCHOUT 7 Producer, wykonaj następujące czynności: w oknie *Nodes* kliknij prawym przyciskiem myszy na urządzenie wyświetlające (w tym przypadku WATCHPAX 64) i wybierz opcję Shutdown. Więcej informacji znajdziesz w rozdziale 9.1: Node List w „Przewodniku użytkownika WATCHOUT 7".

![Wyłączanie WATCHOUT 7](../media/wp64/installation_03.jpg)

Urządzenie można również wyłączyć z poziomu [WATCHPAX Config](06-miscellaneous.md#watchpax-config), sieciowego interfejsu użytkownika.

:::info
Jeśli nie można wyłączyć urządzenia za pomocą oprogramowania, w ostateczności można wymusić wyłączenie przyciskiem zasilania. Należy pamiętać, że może to spowodować utratę danych i uszkodzenie systemu. Aby wymusić wyłączenie w ten sposób, naciśnij i przytrzymaj przycisk zasilania znajdujący się z przodu serwera multimedialnego (patrz [Złącza](../01-introduction/08-connectors.md) w rozdziale Wprowadzenie) przez co najmniej 5 sekund. Lampka zgaśnie, a zasilanie zostanie odcięte.
:::

:::warning
Nie odłączaj kabla zasilającego podczas wyłączania, ponieważ może to spowodować utratę danych i uszkodzenie systemu.
:::
